import "dev.oraclize.it/api.sol";


contract StackExchangeBountyAddress {
    address main;
    uint questionID;
    uint i;
    string site;

    function StackExchangeBountyAddress(uint _questionID, string _site) {
        main = msg.sender;
        questionID = _questionID;
        site = _site;
        i = _i;
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
    enum QueryType {Check, Info, Location, Exist}

    struct question {
        address[] public sponsors;
        mapping (address => uint) public sponsorsBalance;
        address contractAddress;
        address winnerAddress;
        uint winnerID;
        uint acceptedAnswerID;
        uint updateDelay;
        uint expiryDate;
        uint ownedFee;
        mapping (byte32 => QueryType) queryType;
    }

    struct site {
            mapping(uint => question) public questions;
    }

    struct QueryInfo {
      string site;
      uint questionID;
    }

    mapping(byte32 => QueryInfo) queryInfo;
    mapping(byte32 => site) public sites;
    uint contractBalance;

    function StackExchangeBounty() {

        // **************** SET NETWORK *************************
        oraclize_setNetwork(networkID_consensys);
        // **************** SET NETWORK *************************

        // solo per debug
        owner = msg.sender;
    }


    function increaseBounty(uint _questionID, string _site, uint i) internal {


    }

    function handleQuestion(uint _questionID, string _site) {

    }


    function __callback(bytes32 queryID, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;
        _site =  LastQueryInfos[queryID].site;
        _questionID =  LastQueryInfos[queryID].questionID;

        if(sites[_site].questions[_questionID].queryType[queryID] == QueryType.Exist) {

        }
        else if(sites[_site].questions[_questionID].queryType[queryID] == QueryType.Check) {

        }
        else if(sites[_site].questions[_questionID].queryType[queryID] == QueryType.Info) {

        }
        else if(sites[_site].questions[_questionID].queryType[queryID] == QueryType.Location) {

        }

    }

    function sendBounty(uint  _questionID, string _site) internal {

    }


    function queryOraclize(uint _updateDelay, uint _questionID, string _site) internal {
        string memory URL = strConcat(
            "https://api.stackexchange.com/2.2/questions/", uint2str(_questionID),
            "?site=",
            _site
          );
        contractBalance = this.balance;
        bytes32 queryID = oraclize_query(
            _updateDelay,
            URL,
            strConcat("json(",URL,").items.0.accepted_answer_questionID")
          );
        sites[_site].questions[_questionID].ownedFee += (contractBalance - this.balance);
        sites[_site].questions[_questionID].queryType[queryID] = QueryType.Check;
        queryInfo[queryID].site = _site;
        queryInfo[queryID].questionID = _questionID;
    }


    // debug
    function kill(){
        if (msg.sender == owner) suicide(msg.sender);
    }

    function uint2str(uint i) returns (string){
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
