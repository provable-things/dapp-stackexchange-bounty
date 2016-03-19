import "oraclizeAPI.sol";


contract StackExchangeBountyAddress is abstract {
    address main;
    uint questionID;
    string site;

    function StackExchangeBountyAddress(uint _questionID, string _site) {
        main = msg.sender;
        questionID = _questionID;
        site = _site;
    }

    function() {
        if (msg.value == 0 || questionID == 0 || bytes(site).length == 0 || main == 0)
            throw;
        StackExchangeBounty c = StackExchangeBounty(main);
        c.handleQuestion.value(msg.value)(questionID, site);
    }

}


contract StackExchangeBounty is usingOraclize {

    // solo per debug
    address owner;

    enum QueryType {
        newQuestion,
        isAnswerAccepted,
        getWinnerID,
        getWinnerAddress
    }

    struct Question {
        address[] sponsors;
        mapping (address => uint) sponsorsBalance;
        address contractAddress;
        address winnerAddress;
        uint winnerID;
        bool exist;
        uint acceptedAnswerID;
        uint updateDelay;
        uint creationDate;
        uint expiryDate;
        uint ownedFee;
        mapping (bytes32 => QueryType) queryType;
    }

    struct Site {
            mapping(uint => Question) questions;
    }

    struct QueryInfo {
      string site;
      uint questionID;
    }
    mapping(string => Site) sites;
    mapping(bytes32 => QueryInfo) queryInfo;

    uint DEF_UPDATE_FREQ = 100;
    uint DEF_EXPIRY_DATE = now + 30 days;
    uint contractBalance;

    function StackExchangeBounty() {

        // **************** SET NETWORK *************************
        oraclize_setNetwork(networkID_consensys);
        // **************** SET NETWORK *************************

        // solo per debug
        owner = msg.sender;

    }

    function handleQuestion(uint _questionID, string _site) {

        if (sites[_site].questions[_questionID].exist == false) {
            queryOraclize(
                0,
                _questionID,
                _site,
                QueryType.newQuestion
              );
        }
        if (msg.value != 0) {
            if (sites[_site].questions[_questionID].sponsorsBalance[msg.sender] == 0)
                sites[_site].questions[_questionID].sponsors.push(msg.sender);

            sites[_site].questions[_questionID].sponsorsBalance[msg.sender] += msg.value;
        }
    }

    function __callback(bytes32 queryID, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;
        uint parsedResult = parseInt(result);
        string _site =  queryInfo[queryID].site;
        uint _questionID =  queryInfo[queryID].questionID;

        if (sites[_site].questions[_questionID].queryType[queryID] == QueryType.newQuestion) {
            if (bytes(result).length == 0) {
                //Question doesn't exist or it was deleted/moved
                resolveContract(_questionID, _site);
            }
            else if (parsedResult  > 0) {
                sites[_site].questions[_questionID].exist = true;
                sites[_site].questions[_questionID].creationDate = parsedResult;
                sites[_site].questions[_questionID].updateDelay = DEF_UPDATE_FREQ;
                sites[_site].questions[_questionID].expiryDate = DEF_EXPIRY_DATE;
                sites[_site].questions[_questionID].contractAddress =
                    new StackExchangeBountyAddress(_questionID, _site);
                 queryOraclize(
                    0,
                    _questionID,
                    _site,
                    QueryType.isAnswerAccepted
                );
            }

        }
        else if (sites[_site].questions[_questionID].queryType[queryID] == QueryType.isAnswerAccepted) {

            if (bytes(result).length != 0 && parsedResult  > 0 ) {
                sites[_site].questions[_questionID].acceptedAnswerID = parsedResult;
                resolveContract(_questionID, _site);
            }
            else {
                queryOraclize(
                    sites[_site].questions[_questionID].updateDelay,
                    _questionID,
                    _site,
                    QueryType.isAnswerAccepted
                );
            }
        }
        else if (sites[_site].questions[_questionID].queryType[queryID] == QueryType.getWinnerID) {

             if (bytes(result).length != 0 && parsedResult  > 0 ) {
                sites[_site].questions[_questionID].winnerID = parsedResult;
                resolveContract(_questionID, _site);
            }
            else {
                queryOraclize(
                    sites[_site].questions[_questionID].updateDelay,
                    _questionID,
                    _site,
                    QueryType.getWinnerID
                );
            }
        }
        else {
            if (bytes(result).length > 0 && bytes(result).length == 42) {
                sites[_site].questions[_questionID].winnerAddress = parseAddr(result);
                resolveContract(_questionID, _site);
            }
            else {
                queryOraclize(
                    sites[_site].questions[_questionID].updateDelay,
                    _questionID,
                    _site,
                    QueryType.isAnswerAccepted
                );
            }
        }

    }

    function resolveContract(uint  _questionID, string _site) internal {
        uint numSponsors;
        uint paidFee;
        uint sponsorBalance;
        uint totalBounty;

        if (sites[_site].questions[_questionID].acceptedAnswerID != 0 &&
            sites[_site].questions[_questionID].expiryDate > now) {

            if (sites[_site].questions[_questionID].winnerID == 0) {
                queryOraclize(
                     0,
                    _questionID,
                    _site,
                    QueryType.getWinnerID
                );
            }
            else if (sites[_site].questions[_questionID].winnerAddress == 0) {
                queryOraclize(
                     0,
                    _questionID,
                    _site,
                    QueryType.getWinnerAddress
                );
            }
            else {
                    numSponsors = sites[_site].questions[_questionID].sponsors.length;
                    paidFee = sites[_site].questions[_questionID].ownedFee / numSponsors;

                    for (uint i = 0; i < numSponsors; i++) {
                        sites[_site].questions[_questionID].sponsorsBalance[
                            sites[_site].questions[_questionID].sponsors[i]
                        ] -= paidFee;

                        totalBounty +=
                            sites[_site].questions[_questionID].sponsorsBalance[
                        sites[_site].questions[_questionID].sponsors[i]
                        ];
                    }


                    sites[_site].questions[_questionID].winnerAddress.send(totalBounty);
            }
        }
        else {
                numSponsors = sites[_site].questions[_questionID].sponsors.length;
                paidFee = sites[_site].questions[_questionID].ownedFee / numSponsors;

                for (uint j = 0; j < numSponsors; j++) {

                    sponsorBalance =
                        sites[_site].questions[_questionID].sponsorsBalance[
                            sites[_site].questions[_questionID].sponsors[j]
                        ];

                    sponsorBalance -= paidFee;

                    sites[_site].questions[_questionID].sponsors[j].send(sponsorBalance);
                }
        }
    }

    function queryOraclize(
        uint _updateDelay,
        uint _questionID,
        string _site,
        QueryType _queryType
        )
        internal {


        contractBalance = this.balance;
        string memory URL;
        bytes32 queryID;
        if (_queryType == QueryType.newQuestion) {

            URL = strConcat(
                "https://api.stackexchange.com/2.2/questions/",
                uIntToStr(_questionID),
                "?site=",
                _site
              );

            queryID = oraclize_query(
                "URL",
                strConcat("json(",URL,").items.0.creation_date")
                );

        }
        else if (_queryType == QueryType.isAnswerAccepted) {

            URL = strConcat(
                "https://api.stackexchange.com/2.2/questions/",
                uIntToStr(_questionID),
                "?site=",
                _site
              );


            queryID = oraclize_query(
                _updateDelay,
                "URL",
                strConcat("json(",URL,").items.0.accepted_answer_id")
            );

        }
        else if (_queryType == QueryType.getWinnerID) {

            URL = strConcat(
                "https://api.stackexchange.com/2.2/answers/",
                uIntToStr(sites[_site].questions[_questionID].acceptedAnswerID),
                "?site=",
                _site
                );

            queryID = oraclize_query(
                _updateDelay,
                "URL",
                strConcat("json(",URL,").items.0.owner.user_id")
              );
        }
        else {

            URL = strConcat(
                "https://api.stackexchange.com/2.2/users/",
                uIntToStr(sites[_site].questions[_questionID].winnerID),
                "?site=",
                _site
                );

            queryID = oraclize_query(
                _updateDelay,
                "URL",
                strConcat("json(",URL,").items.0.location")
              );
        }

        sites[_site].questions[_questionID].ownedFee += (contractBalance - this.balance);
        sites[_site].questions[_questionID].queryType[queryID] = _queryType;
        queryInfo[queryID].site = _site;
        queryInfo[queryID].questionID = _questionID;
    }

    function setExpiryDate(uint _questionID, string _site, uint _expiryDate) {
        if (sites[_site].questions[_questionID].exist == true && _expiryDate > now) {
            sites[_site].questions[_questionID].expiryDate = _expiryDate;
        }

    }

    // debug
    function kill(){
        if (msg.sender == owner) suicide(msg.sender);
    }

    function uIntToStr(uint i) returns (string){
        uint j = i;
        uint len;
        while (j != 0){
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (i != 0){
            bstr[k--] = byte(48 + i % 10);
            i /= 10;
        }
        return string(bstr);
    }

}
