import "dev.oraclize.it/api.sol";


contract StackExchangeBountyAddress {
    address main;
    uint id_q;
    uint id_n;
    string site;

    function StackExchangeBountyAddress(uint _id_q,string _site, uint _id_n) {
        main = msg.sender;
        id_q = _id_q;
        site = _site;
        id_n = _id_n;
    }

    function() {
        if(msg.value==0 || id_q==0 || bytes(site).length==0 || main==0) throw;
        StackExchangeBounty c = StackExchangeBounty(main);
        c.depositQuestion.value(msg.value)(id_q,site);
    }

}


contract StackExchangeBounty is usingOraclize {
    
    // solo per debug
    address owner;
    
    
    struct question {
        address[] sponsors;
        mapping (address=>uint) sponsorsBalance;
        address contract_address;
        address owner_accepted_question;
        uint user_id_accepted_answer;
        uint id_q;
        string site;
        uint accepted_answer;
        uint delay;
        uint expiry;
        uint fee;
        mapping (bytes32=>uint) myidstatus;
    }

    //^^ myidstatus ^^
    // 1 == check only
    // 2 == user info
    // 3 == user location
    // 4 == check if the question exist
    
    mapping(uint => question) public questions;
    
    mapping (bytes32 => uint) my_id;

    uint id_n;

    uint contractBalance;

    function StackExchangeBounty() {
        
        // **************** SET NETWORK *************************
        oraclize_setNetwork(networkID_consensys);
        // **************** SET NETWORK *************************
        
        // solo per debug
        owner = msg.sender;
    }

 
    function addToBounty(uint _id, string _site, uint id_n) internal{
        if(_id==0 || bytes(_site).length==0) throw;
        if(msg.value == 0) throw;
        if((questions[id_n].id_q!=_id && sha3(questions[id_n].site)!=sha3(_site)) || questions[id_n].owner_accepted_question!=0) throw;

        address origin_addr = msg.sender;

        if(msg.sender==questions[id_n].contract_address){
            origin_addr = tx.origin;
        }

        // add user
        if(questions[id_n].sponsorsBalance[origin_addr]==0){
            questions[id_n].sponsors[questions[id_n].sponsors.length++] = origin_addr;
        }
        // add to bounty
        questions[id_n].sponsorsBalance[origin_addr] += msg.value;
        
    }
    
    function depositQuestion(uint _id, string _site){
        if(_id==0 || bytes(_site).length==0) throw;
        if(msg.value == 0) throw;
        for (uint i=1; i<=id_n; i++){
            if(questions[i].owner_accepted_question!=0 && questions[i].id_q ==_id && sha3(questions[i].site)==sha3(_site)) throw;
            if(questions[i].id_q==_id && sha3(questions[i].site)==sha3(_site)){
                addToBounty(_id,_site,i);
                return;
            }
        }

        id_n++;
        questions[id_n].id_q = _id;
        questions[id_n].site = _site;
                     
        // defaut da cambiare 
        questions[id_n].expiry = now+week;
        questions[id_n].delay = 600;
                        
        addToBounty(_id,_site,id_n);

        string memory url = strConcat("https://api.stackexchange.com/2.2/questions/",uint2str(_id),"?site=",_site);
        contractBalance = this.balance;
        bytes32 myid = oraclize_query("URL", strConcat("json(",url,").items.0.creation_date"),1000000);
        questions[id_n].fee += (contractBalance - this.balance);
        my_id[myid] = id_n;
        questions[id_n].myidstatus[myid] = 4;
    }
    
    function getSponsors(uint _id_n) constant returns (address[] s_list){
        return questions[_id_n].sponsors;
    }
    
    function getSponsorsBalance(uint _id_n, address _sponsor_addr) constant returns (uint s_balance){
        return questions[_id_n].sponsorsBalance[_sponsor_addr];
    }

    function __callback(bytes32 myid, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;

        uint id_n = my_id[myid];
        if(questions[id_n].myidstatus[myid]==4){
            if(bytes(result).length==0){
                // question id or site not valid (question deleted/moved, id or site wrong)

                if(questions[id_n].sponsors.length>1){
                    uint fee = (questions[id_n].fee/questions[id_n].sponsors.length);
                    for (uint i=0; i<id_n; i++){
                        questions[id_n].sponsors[i].send(questions[id_n].sponsorsBalance[questions[id_n].sponsors[i]]-fee);
                    }
                }
                else {
                    questions[id_n].sponsors[0].send(questions[id_n].sponsorsBalance[questions[id_n].sponsors[0]]-questions[id_n].fee);
                }
                return;
            } else if(parseInt(result)>0){
                questions[id_n].contract_address = new StackExchangeBountyAddress(questions[id_n].id_q,questions[id_n].site,id_n);
                check(questions[id_n].delay,questions[id_n].id_q,questions[id_n].site,id_n);
            }
        } else if(questions[id_n].myidstatus[myid]==1){
            if(bytes(result).length==0){
                // no accepted answer
                check(questions[id_n].delay,questions[id_n].id_q,questions[id_n].site,id_n);
            } else if(parseInt(result)>0){
                // accepted answer
                questions[id_n].accepted_answer = parseInt(result);
                sendBounty(questions[id_n].id_q,questions[id_n].site,id_n);
            }
        } else if(questions[id_n].myidstatus[myid]==2){
            if(bytes(result).length==0){
                sendBounty(questions[id_n].id_q,questions[id_n].site,id_n);
            } else if(parseInt(result)>0){
                questions[id_n].user_id_accepted_answer = parseInt(result);
                sendBounty(questions[id_n].id_q,questions[id_n].site,id_n);
            }
        } else if(questions[id_n].myidstatus[myid]==3){
            if(bytes(result).length==0){
                sendBounty(questions[id_n].id_q,questions[id_n].site,id_n);
            } else if(bytes(result).length>0){
                questions[id_n].owner_accepted_question = parseAddr(result);
                sendBounty(questions[id_n].id_q,questions[id_n].site,id_n);
            }            
        }
        delete questions[id_n].myidstatus[myid];
        delete my_id[myid];
    }
    
    function sendBounty(uint id, string site, uint id_n) internal {
        if(id==0 || bytes(site).length==0 || (sha3(questions[id_n].id_q)!=sha3(id) && sha3(questions[id_n].site)!=sha3(site)) ) throw;
        if(questions[id_n].accepted_answer==0) return;
        if(questions[id_n].expiry>now){
            
            if(questions[id_n].user_id_accepted_answer==0){
                contractBalance = this.balance;
                bytes32 myid = oraclize_query(questions[id_n].delay, "URL",strConcat("json(https://api.stackexchange.com/2.2/answers/",uint2str(questions[id_n].accepted_answer),"?site=",site,").items.0.owner.user_id"));
                questions[id_n].fee += (contractBalance - this.balance);
                my_id[myid] = id_n;
                questions[id_n].myidstatus[myid] = 2;
            }
            else if(questions[id_n].owner_accepted_question==0 && questions[id_n].user_id_accepted_answer>0){
                contractBalance = this.balance;
                myid = oraclize_query(questions[id_n].delay, "URL",strConcat("json(https://api.stackexchange.com/2.2/users/",uint2str(questions[id_n].user_id_accepted_answer),"?site=",site,").items.0.location"));
                questions[id_n].fee += (contractBalance - this.balance);
                my_id[myid] = id_n;
                questions[id_n].myidstatus[myid] = 3;
            }
            else if(questions[id_n].owner_accepted_question>0 && questions[id_n].user_id_accepted_answer>0){
                uint bounty_amount;
                for (uint z=0; z<questions[id_n].sponsors.length; z++){
                    bounty_amount += questions[id_n].sponsorsBalance[questions[id_n].sponsors[z]];
                }
                questions[id_n].owner_accepted_question.send(bounty_amount - questions[id_n].fee);
            }

        } else {
            // question expired
            address _sponsor;
            uint fee = (questions[id_n].fee/questions[id_n].sponsors.length);
            for (uint i=0; i<questions[id_n].sponsors.length; i++){
                _sponsor = questions[id_n].sponsors[i];
                _sponsor.send(questions[id_n].sponsorsBalance[_sponsor]-fee);
            }
        }
    }
    
    function check(uint delay, uint id, string site, uint id_n) internal{
        string memory url = strConcat("https://api.stackexchange.com/2.2/questions/",uint2str(id),"?site=",site);
        contractBalance = this.balance;
        bytes32 myid = oraclize_query(delay, "URL", strConcat("json(",url,").items.0.accepted_answer_id"));
        questions[id_n].fee += (contractBalance - this.balance);
        my_id[myid] = id_n;
        questions[id_n].myidstatus[myid] = 1;

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
