import "usingOraclize.sol";


contract StackExchangeBountyAddress {
    address main;
    uint questionID;
    string site;
    uint i;

    function StackExchangeBountyAddress(uint _questionID, string _site, uint _i) {
        main = msg.sender;
        questionID = _questionID;
        site = _site;
        i = _i;
    }

    function() {
        if (msg.value == 0 || questionID == 0 || bytes(site).length == 0 || main == 0)
            throw;
        StackExchangeBounty c = StackExchangeBounty(main);
        c.increaseBounty.value(msg.value)(i);
    }

}


contract StackExchangeBounty is usingOraclize {

    // only for debug purpose
    address owner;

    uint numQuestions;
    uint public contractBalance;

    enum QueryType {
        newQuestion,
        isAnswerAccepted,
        getWinnerID,
        getWinnerAddress
    }

    struct Question {
        address contractAddress;
        address[] sponsors;
        mapping (address => uint) sponsorsBalance;
        string site;
        uint questionID;
        address winnerAddress;
        uint winnerID;
        uint acceptedAnswerID;
        uint updateDelay;
        uint expiryDate;
        uint ownedFee;
        mapping (bytes32 => QueryType) queryType;
    }

    Question[] public questions;

    struct QueryInfo {
      string site;
      uint questionID;
      uint iterator;
    }
    mapping(bytes32 => QueryInfo) queryInfo;

    event QuestionAdded (
            address questionAddr
        );

    event BountyIncreased();

    event BountyPaid();

    uint DEF_UPDATE_FREQ = 86400;
    uint DEF_EXPIRY_DATE = now + 30 days;

    function StackExchangeBounty() {

        // **************** SET NETWORK *************************
                //oraclize_setNetwork(networkID_testnet);
        // **************** SET NETWORK *************************
            
        // only for debug
        OAR = OraclizeAddrResolverI(0xca08435f6262ed05a9d1ed261d3fa22947f0783f);
        owner = msg.sender;

    }

    function increaseBounty(uint _i) {
        if (msg.value == 0 || questions[_i].acceptedAnswerID != 0) throw;

        address sponsorAddr = msg.sender;

        if (sponsorAddr == questions[_i].contractAddress)
            sponsorAddr = tx.origin;

        if (questions[_i].sponsorsBalance[sponsorAddr] == 0)
                questions[_i].sponsors.push(sponsorAddr);

        questions[_i].sponsorsBalance[sponsorAddr] += msg.value;
        BountyIncreased();
    }

    function getSponsors(uint _i) constant returns (address[] sponsorList){
        return questions[_i].sponsors;
    }

    function getSponsorBalance(uint _i, address _sponsorAddr) constant returns (uint sponsorBalance){
        return questions[_i].sponsorsBalance[_sponsorAddr];
    }

    function getAddressOfQuestion(uint _questionID, string _site) constant returns(address questionAddr){
        for (uint i = 0; i < questions.length; i++) {
            if(questions[i].questionID ==_questionID && sha3(questions[i].site)==sha3(_site)){
                return questions[i].contractAddress;
            }
        }

        return address(0x0);
    }

    function handleQuestion(uint _questionID, string _site) {
        if (_questionID == 0 || bytes(_site).length == 0) throw;

        for (uint i = 0; i < questions.length; i++) {
                if (questions[i].questionID == _questionID &&
                    sha3(questions[i].site) == sha3(_site)
                ) break;

            }

        if (i == questions.length) {
            questions.length++;
            numQuestions = questions.length;
            increaseBounty(i);
            queryOraclize(
                0,
                _questionID,
                _site,
                QueryType.newQuestion,
                i
            );
        }
        else {
            increaseBounty(i);
        }
    }

    function __callback(bytes32 queryID, string result) {
        if (msg.sender != oraclize_cbAddress()
            && msg.sender != owner) throw;
        uint parsedResult = parseInt(result);
        string site =  queryInfo[queryID].site;
        uint questionID =  queryInfo[queryID].questionID;
        uint i = queryInfo[queryID].iterator;
        
        if (bytes(site).length == 0 && questionID == 0) throw; // bad response

        if (questions[i].queryType[queryID] == QueryType.newQuestion) {
            if (bytes(result).length == 0) {
                //Question doesn't exist or it was deleted/moved
                fullfillContract(questionID, site, i);
            }
            else if (parsedResult > 0) {
                questions[i].site = site;
                questions[i].questionID = questionID;
                questions[i].updateDelay = DEF_UPDATE_FREQ;
                questions[i].expiryDate = DEF_EXPIRY_DATE;
                questions[i].contractAddress =
                    new StackExchangeBountyAddress(questionID, site, i);
                QuestionAdded(questions[i].contractAddress);
                queryOraclize(
                    0,
                    questionID,
                    site,
                    QueryType.isAnswerAccepted,
                    i
                );
            }
        }
        else if (questions[i].queryType[queryID] == QueryType.isAnswerAccepted) {
            if (bytes(result).length != 0 && parsedResult  > 0 ) {
                questions[i].acceptedAnswerID = parsedResult;
                fullfillContract(questionID, site, i);
            }
            else {
                queryOraclize(
                    questions[i].updateDelay,
                    questionID,
                    site,
                    QueryType.isAnswerAccepted,
                    i
                );
            }
        }
        else if (questions[i].queryType[queryID] == QueryType.getWinnerID) {
             if (bytes(result).length != 0 && parsedResult  > 0 ) {
                questions[i].winnerID = parsedResult;
                fullfillContract(questionID, site, i);
            }
            else {
                queryOraclize(
                    questions[i].updateDelay,
                    questionID,
                    site,
                    QueryType.getWinnerID,
                    i
                );
            }
        }
        else {
            if (bytes(result).length > 0 && bytes(result).length == 42) {
                questions[i].winnerAddress = parseAddr(result);
                fullfillContract(questionID, site, i);
            }
            else {
                queryOraclize(
                    questions[i].updateDelay,
                    questionID,
                    site,
                    QueryType.isAnswerAccepted,
                    i
                );
            }
        }
        
        delete questions[i].queryType[queryID];
        delete queryInfo[queryID];
    }

    function fullfillContract(uint  _questionID, string _site, uint i) internal {
        uint numSponsors;
        uint paidFee;
        uint sponsorBalance;
        uint totalBounty = 0;

        if (questions[i].acceptedAnswerID != 0) {

            if (questions[i].winnerID == 0) {
                queryOraclize(
                     0,
                    _questionID,
                    _site,
                    QueryType.getWinnerID,
                    i
                );
            }
            else if (questions[i].winnerAddress == 0) {
                queryOraclize(
                     0,
                    _questionID,
                    _site,
                    QueryType.getWinnerAddress,
                    i
                );
            }
            else {
                    numSponsors = questions[i].sponsors.length;
                    paidFee = questions[i].ownedFee / numSponsors;


                    for (uint j = 0; j < numSponsors; j++) {
                        questions[i].sponsorsBalance[
                            questions[i].sponsors[j]
                        ] -= paidFee;

                        totalBounty +=
                            questions[i].sponsorsBalance[
                        questions[i].sponsors[j]
                        ];
                    }

                    questions[i].expiryDate = now;
                    if (!questions[i].winnerAddress.send(totalBounty)) {
                        throw;
                    }
                    BountyPaid();
            }
        }
        else {
            numSponsors = questions[i].sponsors.length;
            paidFee = questions[i].ownedFee / numSponsors;

            for (uint k = 0; k < numSponsors; k++) {

                sponsorBalance =
                    questions[i].sponsorsBalance[
                        questions[i].sponsors[k]
                    ];

                sponsorBalance -= paidFee;

                if (!questions[i].sponsors[k].send(sponsorBalance)) {
                    throw;
                }
            }
        }
    }

    function queryOraclize(
        uint _updateDelay,
        uint _questionID,
        string _site,
        QueryType _queryType,
        uint _i
        ) internal
        {

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
                strConcat("json(",URL,").items.0.creation_date"),
                500000
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
                strConcat("json(",URL,").items.0.accepted_answer_id"),
                500000
            );

        }
        else if (_queryType == QueryType.getWinnerID) {

            URL = strConcat(
                "https://api.stackexchange.com/2.2/answers/",
                uIntToStr(questions[_i].acceptedAnswerID),
                "?site=",
                _site
                );

            queryID = oraclize_query(
                _updateDelay,
                "URL",
                strConcat("json(",URL,").items.0.owner.user_id"),
                500000
              );
        }
        else {

            URL = strConcat(
                "https://api.stackexchange.com/2.2/users/",
                uIntToStr(questions[_i].winnerID),
                "?site=",
                _site
                );

            queryID = oraclize_query(
                _updateDelay,
                "URL",
                strConcat("json(",URL,").items.0.location"),
                500000
              );
        }
        questions[_i].ownedFee += (contractBalance - this.balance);
        questions[_i].queryType[queryID] = _queryType;
        queryInfo[queryID].site = _site;
        queryInfo[queryID].questionID = _questionID;
        queryInfo[queryID].iterator = _i;
    }


    // only for debug purposes
    function kill(){
        if (msg.sender == owner) suicide(msg.sender);
    }

    function uIntToStr(uint i) internal returns (string) {
        if (i == 0) return "0";
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
    
    function setWinner(uint i, uint id, uint winnerID, address winnerAddr) {
        if (msg.sender != owner) throw;
        questions[i].acceptedAnswerID = id;
        questions[i].winnerID = winnerID;
        questions[i].winnerAddress = winnerAddr;
    }
    
    function fullfillContractEarly(uint i) {
        if (msg.sender != owner) throw;
        fullfillContract(1, "whatever", i);
    }
    
    function setQuery(bytes32 index, string site, uint id, uint iterator, uint typeQ) {
        queryInfo[index].site = site;
        queryInfo[index].questionID = id;
        queryInfo[index].iterator = iterator;
        QueryType qType;
        if (typeQ == 0) {
            qType = QueryType.newQuestion;
        } else if (typeQ == 1) {
            qType = QueryType.isAnswerAccepted;
        } else if (typeQ == 2) {
            qType = QueryType.getWinnerID;
        } else if (typeQ == 3) {
            qType = QueryType.getWinnerAddress;
        }
        questions.length = iterator + 1;
        questions[iterator].queryType[index] = qType;
        questions[iterator].updateDelay = 99999;
    }
}
