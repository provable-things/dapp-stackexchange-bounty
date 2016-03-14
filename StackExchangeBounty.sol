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
    // Statuses:
    //  - exist or not
    //  - answered or not
    //  - answer accepted or not
    // - winnerHasAddress or not

    enum status {answered, not_answered};

    struct question {
        address[] public sponsors;
        mapping (address=>uint) public sponsorsBalance;
        address contractAddress;
        address winnerAddress;
        uint winnerID;
        uint acceptedAnswer;
        bool isAnswerAccepted;
        uint updateDelay;
        uint expiryDate;
        uint ownedFee;
        mapping (bytes32 => status) private qStatus;
    }

    struct site {
            mapping (uint => question) public questions;
    }


    event acceptedAnswer(uint _ID);


    mapping(byte32 => site) public sites;

    mapping (bytes32 => uint) queryID;

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
        if (_ID == 0 || bytes(_site).length == 0 || msg.value == 0) throw;
        if ((questions[i].questionID != _ID && sha3(questions[i].site) != sha3(_site)) || questions[i].ownerAcceptedQuestion != 0)
            throw;

        address originAddress = msg.sender;

        if(msg.sender == questions[i].contractAddress){
            originAddress = tx.origin;
        }

        // Add new sponsor
        if(questions[i].sponsorsBalance[originAddress] == 0)
            questions[i].sponsors[questions[i].sponsors.length++] = originAddress;
        // Increase bounty
        questions[i].sponsorsBalance[originAddress] += msg.value;

    }

    function handleQuestion(uint _ID, string _site) {
        if(_ID == 0 || bytes(_site).length == 0 || msg.value == 0) throw;
        // If site exist
        if (sites[_sites].questions[_ID] != 0) {
            for (uint i = 0; i <= sites[_sites].questions.length; i++) {
                if(questions[i].ownerAcceptedQuestion!=0 && questions[i].questionID ==_ID && sha3(questions[i].site) == sha3(_site) || questions[i].expiry < now) throw;
                if( sites[_site].questions[qID] == _ID && sha3(questions[i].site) == sha3(_site)) {
                increaseBounty(_ID, _site, i);
                return;
            }
        }
        else {
            // defaut da cambiare
            sites[_sites].questions[_ID].expiry = now + week;
            sites[_sites].questions[_ID].delay = DEFAULT_DELAY;

            increaseBounty(_ID,_site, i);

            string memory URL = strConcat("https://api.stackexchange.com/2.2/questions/",uint2str(_ID),"?site=",_site);
            contractBalance = this.balance;
            bytes32 date = oraclize_query("URL", strConcat("json(", URL,").items.0.creation_date"),1000000);
            sites[_sites].questions[_ID].fee += (contractBalance - this.balance);
        }
    }

     function getAddressQuestion(uint _questionID, string _site) constant returns (address qAddr){
        for (uint i = 1; i <= questions.length; i++){
            if(questions[i].questionID == _questionID && sha3(questions[i].site)==sha3(_site)){
                return questions[i].contractAddress;
            }
        }
    }

    function __callback(bytes32 queryID, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;

        uint i = queryID[queryID];
        if(questions[i].queryIDStatus[queryID]==4) {
            if(bytes(result).length==0){
                // question id or site not valid (question deleted/moved, id or site wrong)
                //Return balances minus fees to all sponsors
            else if(parseInt(result)>0){
                //If the site exists
                //
                questions[i].contractAddress = new StackExchangeBountyAddress(questions[i].questionID,questions[i].site,i);
                check(questions[i].delay,questions[i].questionID,questions[i].site,i);
            }
        } else if(questions[i].queryIDStatus[queryID]==1){
            if(bytes(result).length==0){
                //There are no accepted answer
            } else if(parseInt(result)>0){
                // There is an accepted answer, resolve contract by sending bounty
            }
        } else if(questions[i].queryIDStatus[queryID]==2){
            if(bytes(result).length==0){
                sendBounty(questions[i].questionID,questions[i].site,i);
            } else if(parseInt(result)>0){
                questions[i].userIDAcceptedAnswer = parseInt(result);
                sendBounty(questions[i].questionID,questions[i].site,i);
            }
        } else if(questions[i].queryIDStatus[queryID]==3){
            if(bytes(result).length==0 || bytes(result).length!=42){
                sendBounty(questions[i].questionID,questions[i].site,i);
            } else if(bytes(result).length>0 && bytes(result).length==42){
                questions[i].ownerAcceptedQuestion = parseAddr(result);
                sendBounty(questions[i].questionID,questions[i].site,i);
            }
        }
        // delete unneeded answer
    }

    function sendBounty(uint id, string site, uint i) internal {
        if(id==0 || bytes(site).length==0 || (sha3(questions[i].questionID)!=sha3(id) && sha3(questions[i].site)!=sha3(site)) ) throw;
        if(questions[i].acceptedAnswer==0) return;
        if(questions[i].expiry>now){

            if(questions[i].userIDAcceptedAnswer==0){
                contractBalance = this.balance;
                bytes32 queryID = oraclize_query(questions[i].delay, "URL",strConcat("json(https://api.stackexchange.com/2.2/answers/",uint2str(questions[i].acceptedAnswer),"?site=",site,").items.0.owner.user_ID"));
                questions[i].fee += (contractBalance - this.balance);
                queryID[queryID] = i;
                questions[i].queryIDStatus[queryID] = 2;
                //
            }
            else if (questions[i].ownerAcceptedQuestion==0 && questions[i].userIDAcceptedAnswer>0){
                contractBalance = this.balance;
                result = oraclize_query(questions[i].delay, "URL",strConcat("json(https://api.stackexchange.com/2.2/users/",uint2str(questions[i].userIDAcceptedAnswer),"?site=",site,").items.0.location"));
                questions[i].fee += (contractBalance - this.balance);
                queryID[queryID] = i;
                questions[_ID].status = {};
                //
            }
            else if(questions[i].ownerAcceptedQuestion>0 && questions[i].userIDAcceptedAnswer>0){
                uint bounty_amount;
                for (uint z=0; z<questions[i].sponsors.length; z++){
                    bounty_amount += questions[i].sponsorsBalance[questions[i].sponsors[z]];
                }
                questions[i].ownerAcceptedQuestion.send(bounty_amount - questions[i].fee);
            }

        }
        else {
            // All else fails, question is resolved
            address _sponsor;
            uint fee = (questions[i].fee/questions[i].sponsors.length);
            for (uint i=0; i<questions[i].sponsors.length; i++){
                _sponsor = questions[i].sponsors[i];
                _sponsor.send(questions[i].sponsorsBalance[_sponsor]-fee);
            }
        }
    }

    function queryOraclize(uint delay, uint id, string site, uint i) internal {
        string memory url = strConcat("https://api.stackexchange.com/2.2/questions/",uint2str(id),"?site=",site);
        contractBalance = this.balance;
        bytes32 queryID = oraclize_query(delay, "URL", strConcat("json(",url,").items.0.accepted_answer_id"));
        questions[i].fee += (contractBalance - this.balance);
        qNumber[result] = i;
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
