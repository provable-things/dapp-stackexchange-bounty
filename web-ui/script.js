//  Missing to do
// - Awereness for contract type
// - Check inputs

    var nodeList = {
        'Localhost': 'http://localhost:8545/',
        'Mainnet' : 'http://178.62.29.206:8081/',
        'Morden' : 'http://178.62.29.206:8082/',
        'Testnet161' : 'http://178.62.29.206:8083/',
    };

    var ABI = [{"constant":false,"inputs":[{"name":"queryID","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"questions","outputs":[{"name":"contractAddress","type":"address"},{"name":"site","type":"string"},{"name":"questionID","type":"uint256"},{"name":"winnerAddress","type":"address"},{"name":"winnerID","type":"uint256"},{"name":"acceptedAnswerID","type":"uint256"},{"name":"updateDelay","type":"uint256"},{"name":"expiryDate","type":"uint256"},{"name":"ownedFee","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_i","type":"uint256"},{"name":"_sponsorAddr","type":"address"}],"name":"getSponsorBalance","outputs":[{"name":"sponsorBalance","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_questionID","type":"uint256"},{"name":"_site","type":"string"}],"name":"handleQuestion","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_i","type":"uint256"}],"name":"increaseBounty","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"contractBalance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"_questionID","type":"uint256"},{"name":"_site","type":"string"}],"name":"getAddressOfQuestion","outputs":[{"name":"questionAddr","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"_i","type":"uint256"}],"name":"getSponsors","outputs":[{"name":"sponsorList","type":"address[]"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"questionAddr","type":"address"}],"name":"QuestionAdded","type":"event"},{"anonymous":false,"inputs":[],"name":"BountyIncreased","type":"event"},{"anonymous":false,"inputs":[],"name":"BountyPaid","type":"event"}];
    var nameregABI = [{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"name","outputs":[{"name":"o_name","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"content","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"addr","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"reserve","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"subRegistrar","outputs":[{"name":"o_subRegistrar","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_newOwner","type":"address"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_registrar","type":"address"}],"name":"setSubRegistrar","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"Registrar","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_a","type":"address"},{"name":"_primary","type":"bool"}],"name":"setAddress","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_content","type":"bytes32"}],"name":"setContent","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"disown","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"register","outputs":[{"name":"","type":"address"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"}],"name":"Changed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"},{"indexed":true,"name":"addr","type":"address"}],"name":"PrimaryChanged","type":"event"}];
    var oraclizeABI = [{"constant":false,"inputs":[{"name":"_code","type":"string"}],"name":"deleteCoupon","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_timestamp","type":"uint256"},{"name":"_datasource","type":"string"},{"name":"_arg","type":"string"}],"name":"query1","outputs":[{"name":"_id","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"_datasource","type":"string"},{"name":"_gaslimit","type":"uint256"}],"name":"getPrice","outputs":[{"name":"_dsprice","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_datasource","type":"string"},{"name":"_arg","type":"string"}],"name":"query1","outputs":[{"name":"_id","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"baseprice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_datasource","type":"string"}],"name":"getPrice","outputs":[{"name":"_dsprice","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_timestamp","type":"uint256"},{"name":"_datasource","type":"string"},{"name":"_arg","type":"string"},{"name":"_gaslimit","type":"uint256"}],"name":"query1","outputs":[{"name":"_id","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"_coupon","type":"string"}],"name":"useCoupon","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_code","type":"string"}],"name":"createCoupon","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_proofType","type":"bytes1"}],"name":"setProofType","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_timestamp","type":"uint256"},{"name":"_datasource","type":"string"},{"name":"_arg","type":"string"},{"name":"_gaslimit","type":"uint256"}],"name":"query1_withGasLimit","outputs":[{"name":"_id","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"_timestamp","type":"uint256"},{"name":"_datasource","type":"string"},{"name":"_arg1","type":"string"},{"name":"_arg2","type":"string"}],"name":"query2","outputs":[{"name":"_id","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"new_baseprice","type":"uint256"},{"name":"proofID","type":"bytes"}],"name":"setBasePrice","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_timestamp","type":"uint256"},{"name":"_datasource","type":"string"},{"name":"_arg1","type":"string"},{"name":"_arg2","type":"string"},{"name":"_gaslimit","type":"uint256"}],"name":"query2","outputs":[{"name":"_id","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"_datasource","type":"string"},{"name":"_arg","type":"string"}],"name":"query","outputs":[{"name":"_id","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"_timestamp","type":"uint256"},{"name":"_datasource","type":"string"},{"name":"_arg1","type":"string"},{"name":"_arg2","type":"string"},{"name":"_gaslimit","type":"uint256"}],"name":"query2_withGasLimit","outputs":[{"name":"_id","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"dsname","type":"string"},{"name":"multiplier","type":"uint256"}],"name":"addDSource","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_timestamp","type":"uint256"},{"name":"_datasource","type":"string"},{"name":"_arg","type":"string"}],"name":"query","outputs":[{"name":"_id","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"_timestamp","type":"uint256"},{"name":"_datasource","type":"string"},{"name":"_arg","type":"string"},{"name":"_gaslimit","type":"uint256"}],"name":"query","outputs":[{"name":"_id","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"dsname","type":"string"},{"name":"proofType","type":"bytes1"},{"name":"multiplier","type":"uint256"}],"name":"addDSource","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"newgasprice","type":"uint256"}],"name":"setGasPrice","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"cbAddress","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_timestamp","type":"uint256"},{"name":"_datasource","type":"string"},{"name":"_arg","type":"string"},{"name":"_gaslimit","type":"uint256"}],"name":"query_withGasLimit","outputs":[{"name":"_id","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"new_baseprice","type":"uint256"}],"name":"setBasePrice","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_datasource","type":"string"},{"name":"_arg1","type":"string"},{"name":"_arg2","type":"string"}],"name":"query2","outputs":[{"name":"_id","type":"bytes32"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"cid","type":"bytes32"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"datasource","type":"string"},{"indexed":false,"name":"arg","type":"string"},{"indexed":false,"name":"gaslimit","type":"uint256"},{"indexed":false,"name":"proofType","type":"bytes1"}],"name":"Log1","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"cid","type":"bytes32"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"datasource","type":"string"},{"indexed":false,"name":"arg1","type":"string"},{"indexed":false,"name":"arg2","type":"string"},{"indexed":false,"name":"gaslimit","type":"uint256"},{"indexed":false,"name":"proofType","type":"bytes1"}],"name":"Log2","type":"event"}];

    var nodeIP = '';
    var contractAddr = '';
    var hash = '';
    var list = '';
    var web3;
    var ended = false;
    var refundsponsors = '';
    var gasHandleQuestionMethod = 500000;
    var unlockedAccount = ''; // []
    var contractDefaultAddr = '0xd6b5a025565100ff6960087bd10139ff75a5bfa8';
    var defaultOraclizeAddr = '0x0ae06d5934fd75d214951eb96633fbd7f9262a7c';
    var questions = [];


    $( document ).ready(function() {

        Object.keys(nodeList).forEach(function(i) {
            list += '#'+i+',';
            $('#btgr').append(
                '<button type="button" class="btn btn-default btn-sm" id="'+i+'">'+i+'</button>'
            );
            $('#'+ i).on('click', function () {
                    $('#nodeIP').val(nodeList[i]);
            });
        });

        $('#btgr').show();
        $('#connected, #notconnected').hide();
        $('#contractAddr').val(contractDefaultAddr);
        connectToNode(handleConnection);

        setTimeout( function() {
            $('' + list.slice(0, -1) + '').on('click', function() {
                $('#nodeIP').val(nodeList[$(this).text()]);
            });
        }, 500);
    });

    $('#submitNodeIP').on('click', function() {
        connectToNode(handleConnection);
    });

    $('#submitContractAddr').on('click', function() {
        if (web3.isConnected())
            connected();
    });

    $('#newQuestionSubmit').on('click', function() {
        $('#StackExchangeURL').attr('disabled','');
        $('#newQuestionSubmit').attr('disabled','');

        if (web3.isConnected()){
            var questionURL = $('input[id = StackExchangeURL]').val().trim();
            var questionSite = questionURL.match("://(.*).stackexchange")[1];
            var questionID = questionURL.match("stackexchange.com/questions/(.*)/")[1];
            var bountyAmount = $('input[id = BountyAmount]').val();

            $('#newQuestionResult').html(
                '<br>Site: <b>' + questionSite + '</b>.stackexchange.com<br>\
                Question ID: <b>' + questionID + '</b>'
            );

            if (questionURL == '' ||
                questionSite.indexOf('/') !== -1
            ) {
                alert('Please enter a valid URL');
            }
            else if (bountyAmount < 0.01 || bountyAmount > 5) {
                alert('Please enter a valid amount. It should be more than 10 mEther and less than 5 Ether');
            } else {
                addQuestion(questionID, questionSite, bountyAmount).then( function(result) {
                    console.log("addQuestionOK", result);
                }).catch(function(error) {
                    $('#loading_dep').hide();
                    console.log("addQuestionError", error);
                })

                var contractInstance = web3.eth.contract(ABI).at(contractDefaultAddr);
                var eventQAdded = contractInstance.QuestionAdded( function(error, result) {
                        if (!error) {
                            $('#loading_dep').hide();
                            $('#newQuestionResult').append(
                                '<br>Question deposited at:<br>\
                                <a href="#' + result.args.questionAddr + '" onclick="clickHash();"> \
                                ' + result.args.questionAddr +
                                '</a>'
                            );
                            questionsList();
                        }
                        else {
                            console.log('error QAdded');
                        }
                });
            }

        } else {
            alert('Please connect to a local node before.');
        }
    });

    $('#newQuestionClose').on('click', function () {
        $('#newQuestionResult').empty();
        $('#StackExchangeURL').val('');
    });

    function getQuestionAddr(questionID, questionSite) {
        return new Promise( function (resolve, reject) {
            var questionContractAddr =
                web3.eth.contract(ABI).at(contractDefaultAddr).getAddressOfQuestion(
                        questionID,
                        questionSite,
                        function (error, result) {
                            if(!error)
                                resolve(result);
                            else
                                reject(error);
                        }
                );
        })
    }

    function addQuestion(questionID, questionSite, bountyAmount) {
        return new Promise( function (resolve, reject) {
            $('#loading_dep').show();
            $('#loading_dep').addClass('animated fadeIn');
            var txHash =
                web3.eth.contract(ABI).at(contractDefaultAddr).handleQuestion(
                    questionID,
                    questionSite,
                    {
                        from: unlockedAccount,
                        value: web3.toWei(bountyAmount, 'ether'),
                        gas: gasHandleQuestionMethod
                    },
                    function (error, result) {
                        if (!error)
                            resolve(result);
                        else
                            reject(error);
                    }
                );
        })
    }

    function handleConnection(connect) {
        if (connect){
            connected();
        } else {
            $('#connected').hide();
            $('#nonconnected').show();
            reset();
        }
    }

    function connectToNode(handleConnection) {
            if (typeof mist !== 'undefined') {
                web3 = new Web3(Web3.currentProvider);
                handleConnection(true);
            }
            else {
                nodeIP = $('#nodeIP').val();
                web3 = new Web3(new Web3.providers.HttpProvider(nodeIP));

                if (web3.isConnected()) {
                    handleConnection(true);
                }
                else {
                    handleConnection(false);
                }
            }
    }


    function connected() {
        $('#connected').show();

        try {
            var availableAccounts = web3.eth.accounts;
            $.each(availableAccounts,function(index, account) {
                web3.eth.sendTransaction({from: account, to: account, value: 0, gas: 0, gasPrice: 0 },
                    function(err, res) {
                        if (err == 'Error: Gas price too low for acceptance') {
                            unlockedAccount = account;
                            $('#addNewQuestionBtn').removeAttr('disabled');
                            $('#addNewQuestionBtn').removeAttr('title');
                        }
                });
            });
        }
        catch(error) {
            $('#addNewQuestionBtn').attr('disabled','');
            $('#addNewQuestionBtn').attr('title','Please connect to your local unlocked node before');
        }


        if (isAddress(window.location.hash.substr(1))) {
            contractAddr = window.location.hash.substr(1);
            $('#contractAddr').val(contractAddr);
            $('#contractAddrInput').val(contractAddr);
            $('#bback').html(
                '<a href = "index.html" \
                    style = "border-bottom: 1px dotted #2196F3; \
                    text-decoration: none;" > \
                    <span class = "glyphicon glyphicon-chevron-left" aria-hidden = "true"> \
                    </span> Questions List \
                </a>'
            )
            $('#sponsorQuestionBtn').show();
            $('#sponsorQuestionBtn').removeAttr('disabled');
            questionDetails(contractAddr);
        }
        else {
            $('#content_title').show();
            $('#loadingQuestion').hide();
            $('#content_title').addClass('animated fadeIn');
            $('#addNewQuestionBtn').show();
            $('#contractAddr').val(contractDefaultAddr);
            contractAddr = contractDefaultAddr;
            questionsList();
        }


    }


    function selectOAR() {
        var addressOARs = [
            "0x1d11e5eae3112dbd44f99266872ff1d07c77dce8",
            "0x0ae06d5934fd75d214951eb96633fbd7f9262a7c",
            "0x20e12a1f859b3feae5fb2a0a32c18f5a65555bbf"
        ];

        for (var i = 0; i < addressOARs.length; i++) {
          var abiOAR = [{"constant":false,"inputs":[],"name":"getAddress","outputs":[{"name":"oaddr","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"addr","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"newaddr","type":"address"}],"name":"setAddr","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}];
          var OAR = web3.eth.contract(abiOAR).at(addressOARs[i]).getAddress.call();
          if (isAddress(OAR))
            return OAR;
        }

        return 0;
    }

    function questionsList() {

        $('#questionList').empty();
        var numberOfQuestions = web3.toDecimal(web3.eth.getStorageAt(contractAddr, 3));
        var contractBalance = web3.toDecimal(web3.eth.getStorageAt(contractAddr, 4));
        var OAR = selectOAR();
        var oraclize = web3.eth.contract(oraclizeABI).at(OAR);
        var baseprice = web3.toBigNumber(web3.eth.getStorageAt(OAR, 4)).toNumber();

        $('#content_title').hide();
        for (var i = 0; i <= numberOfQuestions; i++) {

            questions[i] = [];
            questions[i] = JSON.parse(JSON.stringify(web3.eth.contract(ABI).at(contractAddr).questions(i)));
            var contractAddress = questions[i][0];
            var site = questions[i][1];
            var questionID = questions[i][2];
            var winnerAddress = questions[i][3];
            var winnerID = questions[i][4];
            var acceptedAnswerID = questions[i][5];
            var updateDelay = questions[i][6];
            var expiryDate = parseInt(questions[i][7]);
            var ownedFee = questions[i][8];

            var questionExist;
            var questionTitle;

            $.ajax({
                url:
                    "https://api.stackexchange.com/2.2/questions/" + questionID + "?site=" + site,
                type: "GET",
                crossDomain: true,
                dataType: "json",
                success: function (resp) {
                    if (resp['error_id'] == 400) {
                        return;
                    }
                    questionExist = true;
                    questionTitle = resp['items'][0]['title'];
                },
                async: false,
                error: function (xhr, status) {
                    questionExist = false;
                    return;
                }
            });

            var nowUnix = new Date().getTime()/1000;

            if (winnerAddress == '0x0000000000000000000000000000000000000000' &&
                nowUnix < expiryDate
            ) {
                var text = 'Expiry Date:'
                var info = new Date(expiryDate*1000).toLocaleDateString();

            }
            else if (winnerAddress != '0x0000000000000000000000000000000000000000') {
                var text = 'Status:'
                var info = 'Completed';
            }
            else if (winnerAddress =='0x0000000000000000000000000000000000000000' &&
                    nowUnix > expiryDate
            ) {
                var text = 'Status:'
                var info = 'Expired';
            }

            var totalBounty = 0;

            var sponsorList = web3.eth.contract(ABI).at(contractAddr).getSponsors(i);
            for (var j = 0; j < sponsorList.length; j++) {
                totalBounty +=
                    web3.toDecimal(web3.eth.contract(ABI).at(contractAddr).getSponsorBalance(
                        i,
                        sponsorList[j])
                    );
            }

            if (questionExist) {
                var priceETH =  parseFloat(web3.fromWei(totalBounty, 'ether')).toFixed(2);
                var priceUSD = parseFloat(totalBounty/(1000*baseprice)).toFixed(2);
                priceETH = (priceETH <= 0 || priceETH > 1e3) ? '< 0.01':'~ ' + priceETH;
                priceUSD = (priceUSD <= 0 || priceUSD > 1e4) ? '< 0.01':'~ ' + priceUSD;
                $('#questionList').append(
                    '<div class="panel panel-default" id = "questionList_n'+i+'"> <div class="panel-body"> <div class="row"> <div class="col-md-1"> <div class="iwrap"> <div class="iconsite"> <img src="http://cdn.sstatic.net/Sites/'+ site +'/img/favicon.ico" alt="stackexchange icon"/> <span class="siteb" title="'+site+'.stackexchange.com">'+ site +'</span> </div> </div> </div> <div class="col-md-9 center"> <span class="extra">'+ questionTitle +'</span> </div> <div class="col-md-2"> <a href="#'+ contractAddress.trim()+'" onclick="clickHash();"> <span class="seemore">SEE MORE</span> <span class="glyphicon glyphicon-play playedit"></span> </a> </div> </div><div class="col-md-8 col-md-offset-2">\
                        <div id = "totalBounty_'+i+'" class="col-md-6" style = "display:none" >\
                            <span class="rounded">Total Bounty:</span>\
                            <span title ="'+ priceUSD +' $"> '+ priceETH +' Ξ </span>\
                        </div>\
                        <div class="col-md-6">\
                            <span class="rounded" >'+text+'</span>\
                            <span>'+info+'</span>\
                        </div>\
                    </div> </div> </div> </div>'
                );
            }

            if(info != 'Expired' && info != 'Completed')
                $('#totalBounty_'+i+'').show();

        }
    }

    function questionDetails(contractAddr) {
            var OAR = selectOAR();
            var oraclize = web3.eth.contract(oraclizeABI).at(OAR);
            var baseprice = web3.toBigNumber(web3.eth.getStorageAt(OAR, 4)).toNumber();
            $('#content_title').hide();
            var nowUnix = new Date().getTime()/1000;
            var i = web3.toDecimal(web3.eth.getStorageAt(contractAddr, 3));
            var mainAddr = web3.eth.getStorageAt(contractAddr, 0).replace('0x000000000000000000000000','');

            questions[i] = [];
            questions[i] = JSON.parse(JSON.stringify(web3.eth.contract(ABI).at(mainAddr).questions(i)));

            var site = questions[i][1];
            var questionID = questions[i][2];
            var winnerAddress = questions[i][3];
            var winnerID = questions[i][4];
            var acceptedAnswerID = questions[i][5];
            var expiryDate = parseInt(questions[i][7]);
            var ownedFee = questions[i][8];
            var info = new Date(expiryDate*1000).toLocaleString();

            var question_owner;
            var question_owner_link;
            var question_owner_profile_image;
            var question_link;
            var question_title;
            var question_body;

            $.ajax({
                url: 'https://api.stackexchange.com/2.2/questions/'+ questionID +'?site='+ site +'&filter=withbody',
                type: "GET",
                crossDomain: true,
                dataType: "json",
                success: function (resp) {
                    if (resp['error_id'] == 400) {
                        return;
                    }
                    question_owner = resp['items'][0]['owner']['display_name'];
                    question_owner_profile_image = resp['items'][0]['owner']['profile_image'];
                    question_owner_link = resp['items'][0]['owner']['link'];
                    question_link = resp['items'][0]['link'];
                    question_title = resp['items'][0]['title'];
                    question_body = resp['items'][0]['body'].replace("\n",'');

                },
                async: false,
                error: function (xhr, status) {
                    return;
                }
            });

            $('#q_title').html(question_title);
            $('#q_owner').html('<span class="text-muted">Asked by</span>  <a href="'+question_owner_link+'" target="_blank"><img src="'+question_owner_profile_image+'" alt="profile image" width="20px" height="20px"/> '+question_owner+'</a>');
            $('#wmd-input-customsuffix').html(question_body);
            $('#place_h').html(question_body);
            //
            var uniqueEditorSuffix = '-customsuffix';
            var converter1 = Markdown.getSanitizingConverter();
            var editor1 = new Markdown.Editor(converter1, uniqueEditorSuffix);
            var mjpd1 = new MJPD();  // create a new MJPD for each editor on the page
            mjpd1.Editing.prepareWmdForMathJax(editor1, uniqueEditorSuffix, [["$", "$"]]);
            editor1.run();

            $('#lasthr').after('<a href="'+question_link+'" target="_blank"><div class="box_all_ans center"><span style="vertical-align: -webkit-baseline-middle;">See all the answers <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></span> </div></a>')

            $('#question_show').show();

            $('#siteinfo').html('<b>'+ site +'</b>.stackexchange.com');
            $('#imgfav').attr('src','http://cdn.sstatic.net/Sites/'+ site +'/img/favicon.ico');

            if (winnerAddress == '0x0000000000000000000000000000000000000000'
                && nowUnix < expiryDate
            ) {
                $('#start').show();
                $('#start').append(
                    '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>\
                    This smart contract is still <u>active</u> and it will be resolved on the\
                    <span class="expdateinfo" class="b">'+info+'</span>.\
                    If at this time there is no accepted answer, the sponsors will be refunded.\
                ');
                $('#expiry-date').html(''+info+'');
                $('#start').addClass('animated fadeInUp');
                $('#sponsorQuestionBtn').removeAttr('disabled');
            }
            else if (winnerAddress !='0x0000000000000000000000000000000000000000') {
                $('#sponsorQuestionBtn').attr('disabled','');
                $('#sponsorQuestionBtn').attr('title','The status of this smart contract is completed, you cannot sponsor this question anymore');

                var url_api = 'https://api.stackexchange.com/2.2/users/' + winnerID + '?site=' + site;
                var user_link;

                $.ajax({
                    url: url_api,
                    type: "GET",
                    crossDomain: true,
                    dataType: "json",
                    success: function (resp) {
                        if(resp['error_id']==400){
                            return;
                        }
                        user_link = '<a href="'+resp['items'][0]['link']+'" target="_blank">@'+resp['items'][0]['display_name']+"</a>";
                    },
                    async: false,
                    error: function (xhr, status) {
                        return;
                    }
                });

                $('#expdateinfo').append(''+info+'');
                $('#answer_acc').html('one accepted answer');
                $('#resultcontr').html("was");
                $('#resultsuccess').html("all the sponsors funds were sent to the user with the accepted answer");
                $('#first_panel').after('<div class="panel panel-primary"> <div class="panel-heading"> <h3 class="panel-title">User accepted answer address</h3> </div> <div class="panel panel-default"> <div class="panel-body"> <a href="https://test.ether.camp/account/'+winnerAddress+'" target="_blank" title="'+winnerAddress+'">'+winnerAddress.slice(0, -34)+'...</a> ( '+user_link+' )</div> </div> </div>');
                $('#panel-expiry-date').hide();
                $('#end').show();
                $('#end').addClass('animated fadeInUp');
            }
            else if (
                    winnerAddress == '0x0000000000000000000000000000000000000000' &&
                    nowUnix > expiryDate
                ){

                $('#answer_acc').html('no accepted answer');
                $('#resultcontr').html("wasn't");
                $('#resultsuccess').html("the sponsors have received a refund of their balance");
                $('#end').show();
                $('#end').addClass('animated fadeInUp');
            }

            var totalBounty = 0;
            var sponsorList = JSON.parse(JSON.stringify(web3.eth.contract(ABI).at(mainAddr).getSponsors(i)));
            var sponsorsBalanceList = [];

            for (var j = 0; j < sponsorList.length; j++) {
                sponsorsBalanceList[j] =
                    web3.toDecimal(web3.eth.contract(ABI).at(mainAddr).getSponsorBalance(
                        i,
                        sponsorList[j])
                    );
                totalBounty +=
                    web3.toDecimal(web3.eth.contract(ABI).at(mainAddr).getSponsorBalance(
                        i,
                        sponsorList[j]
                    ));
            }
            var priceETH =  parseFloat(web3.fromWei(totalBounty, 'ether')).toFixed(2);
            var priceUSD = parseFloat(totalBounty/(1000*baseprice)).toFixed(2);
            priceETH = (priceETH <= 0 || priceETH > 1e3) ? '< 0.01':'~ ' + priceETH;
            priceUSD = (priceUSD <= 0 || priceUSD > 1e4) ? '< 0.01':'~ ' + priceUSD;


            $('#tot_b').html('<span title="'+priceUSD+'$"> '+ priceETH +' Ξ </span>');

            for (var k = 0; k < sponsorList.length; k++ ) {
                var priceETH = parseFloat(web3.fromWei(sponsorsBalanceList[k], 'ether')).toFixed(2);
                var priceUSD = parseFloat(sponsorsBalanceList[k]/(1000*baseprice)).toFixed(2);
                priceETH = (priceETH <= 0 || priceETH > 1e3) ? '< 0.01':'~ ' + priceETH;
                priceUSD = (priceUSD <= 0 || priceUSD > 1e4) ? '< 0.01':'~ ' + priceUSD;
                $('#tab > tbody').append(
                    '<tr> <th scope="row">' + k +'</th> <td>'  + sponsorList[k] +
                    '</td> <td title="' + priceUSD+ ' $">'+ priceETH + ' Ξ </td></tr>'
                );
            }


            $('#loadingQuestion').hide(),
            $('#content').show();
            $('#content > .col-md-3 > .panel').each(function(){
                $(this).addClass('animated fadeIn');
            });
        }

    $(function() {
        function reposition() {
            var modal = $(this),
            dialog = modal.find('.modal-dialog');
            modal.css('display', 'block');

            // Dividing by two centers the modal exactly, but dividing by three
            // or four works better for larger screens.
            dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
        }
        // Reposition when a modal is shown
        $('.modal').on('show.bs.modal', reposition);
        // Reposition when the window is resized
        $(window).on('resize', function() {
            $('.modal:visible').each(reposition);
        });
    });


    function isAddress(str) {
        if (str.length == 42 && str.substr(0,2) == '0x') {
            return true
        }   else {
            return false
        }
    }
    function clickHash(){
        window.setTimeout(function(){ location.reload(); },80);
    }

    setTimeout(function(){
        var m = 1;
        $('#questionsList> .panel').each(function(indx, val) {
            $(this).show();
            $(this).addClass('animated fadeInUp');
            m += 1;
        });
    }, 1000);




    function reset() {
        $('questionList').empty();
        $('#addNewQuestionBtn').attr('disabled','');
        $('#addNewQuestionBtn').attr('title','Please connect to your local unlocked node before');
        $('#vthres').html('');
        $('#vexp').html('');
        $('#vowner').html('');
        $('#contractAddrInput').val('');
        $('#initiald').removeClass('animated FadeOut');
        $('#loadingif').css('display','none');
        $('#tab > tbody').html('');
        $('#vthresinfo, #vthresinfo1').html('');
        $('#expdateinfo, #expdateinfo1').html('');
        $('#content').hide();
        $('#initiald').show();
    }
