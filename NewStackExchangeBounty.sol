import "dev.oraclize.it/api.sol";


contract StackExchangeBountyAddress {
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
    enum QueryType {newQuestion, getWinnerID, getWinnerAddress, isAnswerAccepted}

    struct Question {
        address[] sponsors;
        mapping (address => uint) sponsorsBalance;
        address contractAddress;
        address winnerAddress;
        uint winnerID;
        uint acceptedAnswerID;
        uint updateDelay;
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

    mapping(bytes32 => QueryInfo) queryInfo;
    mapping(bytes32 => Site) public sites;
    uint contractBalance;
    uint totalBounty;
    function StackExchangeBounty() {

        // **************** SET NETWORK *************************
        oraclize_setNetwork(networkID_consensys);
        // **************** SET NETWORK *************************

        // solo per debug
        owner = msg.sender;
    }


    function increaseBounty(uint _questionID, string _site) internal {
        if(msg.value == 0 || sites[_site].questions[_questionID].winnerID != 0) throw;
        sites[_site].questions[_questionID].sponsors[
            sites[_site].questions[_questionID].sponsors.length++
        ] = msg.sender;
        sites[_site].questions[_questionID].sponsorsBalance[msg.sender] += msg.value;
    }

    function handleQuestion(uint _questionID, string _site) {
        //Check if question exist, if it doesn't add it
        if(sites[_site].questions[_questionID] == 0) {
            queryOraclize(
                0,
                _questionID,
                _site,
                QueryType.newQuestion
            );
            sites[_site].questions[_questionID].updateDelay = 600;
        }
        increaseBounty(_questionID, _site);

    }


    function __callback(bytes32 queryID, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;
        uint memory parsedResult = parseInt(result);
        uint newUpdateDelay = 6000;
        _site =  queryInfo[queryID].site;
        _questionID =  queryInfo[queryID].questionID;

        if(sites[_site].questions[_questionID].queryType[queryID] == QueryType.newQuestion) {
            if(bytes(result).length == 0) {
                resolveContract(_questionID, _site);
            }
            else if (parsedResult  > 0) {
                sites[_site].questions[_questionID].contractAddress =
                    new StackExchangeBountyAddress(_questionID, _site);
                queryOraclize(
                    sites[_site].questions[_questionID].updateDelay,
                    _questionID,
                    _site,
                    QueryType.isAnswerAccepted
                );
            }

        }
        else if(sites[_site].questions[_questionID].queryType[queryID] == QueryType.isAnswerAccepted) {
            if(bytes(result).length != 0 && parsedResult  > 0 ) {
                sites[_site].questions[_questionID].acceptedAnswerID = parsedResult;
                resolveContract(_questionID, _site);
            }
        }
        else if(sites[_site].questions[_questionID].queryType[queryID] == QueryType.getWinnerID) {
            if(bytes(result).length == 0) {
                queryOraclize(
                    newUpdateDelay,
                    _questionID,
                    _site,
                    QueryType.getWinnerAddress
                );
            }
            else if (parsedResult  > 0) {
                sites[_site].questions[_questionID].winnerID = parsedResult;
                resolveContract(_questionID, _site);
            }

        }
        else if(sites[_site].questions[_questionID].queryType[queryID] == QueryType.getWinnerAddress) {
            if (bytes(result).length == 0 || bytes(result).length != 42) {
                queryOraclize(
                    newUpdateDelay,
                    _questionID,
                    _site,
                    QueryType.getWinnerAddress
                );
            }
            else if (bytes(result).length > 0 && bytes(result).length == 42) {
                sites[_site].questions[_questionID].winnerAddress = parseAddr(result);
                resolveContract(_questionID, _site);
            }
        }

    }

    function resolveContract(uint  _questionID, string _site) internal {
        if (sites[_site].questions[_questionID].expiryDate < now) throw;
        if (sites[_site].questions[_questionID].acceptedAnswerID != 0) {
            if (sites[_site].questions[_questionID].winnerID == 0) {
                queryOraclize(
                    0,
                    _questionID,
                    _site,
                    QueryType.getWinnerID
                );
            }
            if (sites[_site].questions[_questionID].winnerAddress == 0) {
                queryOraclize(
                    0,
                    _questionID,
                    _site,
                    QueryType.getWinnerAddress
                );
            }

            uint memory numSponsors = sites[_site].questions[_questionID].sponsors.length;
            uint paidFee = sites[_site].questions[_questionID].ownedFee / numSponsors;
            //Max number of sponsors 255
            for (uint i = 0; i <= numSponsors; i++) {
                    sites[_site].questions[_questionID].sponsorsBalance[
                        sites[_site].questions[_questionID].sponsors[i]
                    ] -= paidFee;
                    totalBounty +=
                    sites[_site].questions[_questionID].sponsorsBalance[
                        sites[_site].questions[_questionID].sponsors[i]
                    ];
            }

            sites[_site].questions[_questionID].winnerAddress.send(bountyAmount);

        }
    }


     function queryOraclize(uint _updateDelay, uint _questionID, string _site, QueryType _type) internal {

        contractBalance = this.balance;
        string memory URL;
        if (_queryType == QueryType.newQuestion) {
            URL = strConcat(
                "https://api.stackexchange.com/2.2/questions/",
                uIntToStr(_questionID),
                "?site=",
                _site
              );

            bytes32 queryID = oraclize_query(
                "URL",
                strConcat("json(",URL,").items.0.creation_date")
              );

        }
        else if (_queryType == QueryType.getWinnerID) {
            URL = strConcat(
                "https://api.stackexchange.com/2.2/answers/",
                uIntToStr(sites[_site].questions[_questionID].acceptedAnswerID),
                "?site=",
                _site
                );

            bytes32 queryID = oraclize_query(
                "URL",
                strConcat("json(",URL,").items.0.owner.user_id")
              );


        }
        else if (_queryType == QueryType.getWinnerAddress) {
            string memory URL = strConcat(
                "https://api.stackexchange.com/2.2/users/",
                uIntToStr(sites[_site].questions[_questionID].winnerID),
                "?site=",
                _site
                );

            bytes32 queryID = oraclize_query(
                _updateDelay,
                "URL",
                strConcat("json(",URL,").items.0.location")
              );

        }
        else if (_queryType == QueryType.isAnswerAccepted) {
            string memory URL = strConcat(
                "https://api.stackexchange.com/2.2/questions/", uIntToStr(_questionID),
                "?site=",
                _site
              );



            bytes32 queryID = oraclize_query(
                _updateDelay,
                "URL",
                strConcat("json(",URL,").items.0.accepted_answer_questionID")
              );

        }


        sites[_site].questions[_questionID].ownedFee += (contractBalance - this.balance);
        sites[_site].questions[_questionID].queryType[queryID] = _queryType;
        queryInfo[queryID].site = _site;
        queryInfo[queryID].questionID = _questionID;
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
