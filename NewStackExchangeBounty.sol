import "dev.oraclize.it/api.sol";


contract StackExchangeBountyAddress {
    address main;
    uint questionID;
    uint i;
    string site;

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
        c.handleQuestion.value(msg.value)(questionID, site);
    }

}


contract StackExchangeBounty is usingOraclize {

    // solo per debug
    address owner;

    struct question {
        address[] public sponsors;
        mapping (address=>uint) public sponsorsBalance;
        address contractAddress;
        address ownerAcceptedQuestion;
        uint questionID;
        uint acceptedAnswerID;
        bool isAnswerAccepted;
        uint delay;
        uint expiry;
        uint paidFee;
    }

    struct site {
            mapping(uint => question) public questions;
    }


    event acceptedAnswer(uint _ID);


    mapping(byte32 => site) public sites;
    uint i;
    uint contractBalance;

    function StackExchangeBounty() {

        // **************** SET NETWORK *************************
        oraclize_setNetwork(networkID_consensys);
        // **************** SET NETWORK *************************

        // solo per debug
        owner = msg.sender;
    }


    function increaseBounty(uint _ID, string _site, uint i) internal {


    }

    function handleQuestion(uint _ID, string _site) {

        if
    }


    function __callback(bytes32 myID, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;


    }

    function cashOut(uint id, string site, uint i) internal {

    }

    function queryOraclize(uint delay, uint id, string site, uint i) internal {
        string memory url = strConcat("https://api.stackexchange.com/2.2/questions/",uint2str(id),"?site=",site);
        contractBalance = this.balance;
        bytes32 myID = oraclize_query(delay, "URL", strConcat("json(",url,").items.0.accepted_answer_id"));
        questions[i].fee += (contractBalance - this.balance);
        myID[myID] = i;
        questions[i].isAnswerAccepted = true;

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
