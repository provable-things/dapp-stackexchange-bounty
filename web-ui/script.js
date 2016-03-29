//  Missing to do
// - Delete queryID info from storage in smart contract
// - Fix add questions, maybe with event on contract

    var nodeList = {
        'Localhost': 'http://localhost:8545/',
        'Mainnet' : 'http://178.62.29.206:8081/',
        'Morden' : 'http://178.62.29.206:8082/',
        'Testnet161' : 'http://178.62.29.206:8083/',
    };

    var ABI = [{"constant":false,"inputs":[{"name":"queryID","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"questions","outputs":[{"name":"contractAddress","type":"address"},{"name":"site","type":"string"},{"name":"questionID","type":"uint256"},{"name":"winnerAddress","type":"address"},{"name":"winnerID","type":"uint256"},{"name":"acceptedAnswerID","type":"uint256"},{"name":"updateDelay","type":"uint256"},{"name":"expiryDate","type":"uint256"},{"name":"ownedFee","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_i","type":"uint256"},{"name":"_sponsorAddr","type":"address"}],"name":"getSponsorBalance","outputs":[{"name":"sponsorBalance","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_questionID","type":"uint256"},{"name":"_site","type":"string"}],"name":"handleQuestion","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_i","type":"uint256"}],"name":"increaseBounty","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"contractBalance","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"_questionID","type":"uint256"},{"name":"_site","type":"string"}],"name":"getAddressOfQuestion","outputs":[{"name":"questionAddr","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"_i","type":"uint256"}],"name":"getSponsors","outputs":[{"name":"sponsorList","type":"address[]"}],"type":"function"},{"inputs":[],"type":"constructor"}];
    var nameregABI = [{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"name","outputs":[{"name":"o_name","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"content","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"addr","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"reserve","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"subRegistrar","outputs":[{"name":"o_subRegistrar","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_newOwner","type":"address"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_registrar","type":"address"}],"name":"setSubRegistrar","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"Registrar","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_a","type":"address"},{"name":"_primary","type":"bool"}],"name":"setAddress","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_content","type":"bytes32"}],"name":"setContent","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"disown","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"register","outputs":[{"name":"","type":"address"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"}],"name":"Changed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"},{"indexed":true,"name":"addr","type":"address"}],"name":"PrimaryChanged","type":"event"}];

    var nodeIP = '';
    var contractAddr = '';
    var hash = '';
    var list = '';
    var web3;
    var ended = false;
    var refundsponsors = '';
    var gasAmountDeploy = 3000000;
    var gasHandleQuestionMethod = 500000;
    var unlockedAccount = ''; // []
    var contractDefaultAddr = '0xd1e06e1738ab2debe52db3b27bf93cb28aa56f01';
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

        connecting();

        if (window.location.hash != '') {
            hash = window.location.hash.substr(1);
            $('#bback').html(
                '<a href = "http://dapps.oraclize.it/stackexchange/" \
                    style = "border-bottom: 1px dotted #2196F3; \
                    text-decoration: none;" > \
                    <span class = "glyphicon glyphicon-chevron-left" aria-hidden = "true"> \
                    </span> Questions List \
                </a>'
            );

            $('#contractAddr').val(hash);
            $('#contractAddrInput').val(hash);
            $('#submitContractAddr').click();
            $('#addNewQuestionBtn').show();
        }
        else {
            $('#content_title').show();
            $('#loadingQuestion').hide();
            $('#content_title').addClass('animated fadeIn');
            $('#contractAddr').val(contractDefaultAddr);
            renderAddNewQuestionBtn();
        }

        setTimeout( function() {
            $('' + list.slice(0, -1) + '').on('click', function() {
                $('#nodeIP').val(nodeList[$(this).text()]);
            });
        }, 500);
    });

    $('#submitNodeIP').on('click', connecting);
    $('#submitContractAddr').on('click', renderAddNewQuestionBtn);
    $('#newQuestionSubmit').on('click', function() {
        $('#StackExchangeURL').attr('disabled','');
        $('#newQuestionSubmit').attr('disabled','');

        if (web3.isConnected()){
            var questionURL = $('input[id = StackExchangeURL]').val().trim();
            var questionSite = questionURL.match("://(.*).stackexchange")[1];
            var questionID = questionURL.match("stackexchange.com/questions/(.*)/")[1];
            console.log('questionID', questionID)
            $('#newQuestionResult').html(
                '<br>Site: <b>' + questionSite + '</b>.stackexchange.com<br>\
                Question ID: <b>' + questionID + '</b>'
            );

            if (questionURL == '' ||
                questionSite.indexOf('/') !== -1
            ) {
                alert('Please enter a valid URL');
            } else {
                addQuestion(questionID, questionSite).then( function(result) {
                    console.log("addQuestionOK", result);
                    getQuestionAddr(questionID, questionSite).then( function(questionContractAddr) {
                        $('#newQuestionResult').append(
                            '<br>Question deposited<br>\
                            <a href="#'+questionContractAddr+'" onclick="clickHash();"> \
                            '+questionContractAddr+
                            '</a>'
                        );
                        $('#loading_dep').hide();
                    }).catch( function(error) {
                        $('#loading_dep').hide();
                        console.log("getQuestionAddrError", error);
                    })

                }).catch(function(error) {
                    $('#loading_dep').hide();
                    console.log("addQuestionError", error);
                })

            }

        } else {
            alert('Please connect to a local node before.');
        }
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

    function addQuestion(questionID, questionSite) {
        return new Promise( function (resolve, reject) {
            $('#loading_dep').show();
            $('#loading_dep').addClass('animated fadeIn');
            var txHash =
                web3.eth.contract(ABI).at(contractDefaultAddr).handleQuestion(
                    questionID,
                    questionSite,
                    {
                        from: unlockedAccount,
                        value: web3.toWei(0.1, 'ether'),
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

    function renderAddNewQuestionBtn() {

        $('#loadingif').css('display','inline-block');

        if (web3.isConnected()) {
            contractAddr = $('#contractAddr').val().trim();

            if (unlockedAccount.length > 0) {
                $('#addNewQuestionBtn').removeAttr('disabled');
                $('#addNewQuestionBtn').removeAttr('title');
                $('#addNewQuestionBtn').removeAttr('style');
                renderQuestions();
            }

        }
        else {
            alert('Please, connect to geth node before');
        }
    }

    function renderQuestions() {
        //Pos 0 Oraclize Address
        //Pos 2 Owner Address
        //Pos 3 Number of Questions
        //Pos 4 ContractBalance
        $('#questionList').empty();
        var onContractOraclizeAddr = web3.eth.getStorageAt(contractAddr, 0).replace('000000000000000000000000','');
        var numberOfQuestions = web3.toDecimal(web3.eth.getStorageAt(contractAddr, 3));
        var contractBalance = web3.toDecimal(web3.eth.getStorageAt(contractAddr, 4));
        //var OAR_addr = "0x1d11e5eae3112dbd44f99266872ff1d07c77dce8";
        // TEST
        var OAR_addr = "0x20e12a1f859b3feae5fb2a0a32c18f5a65555bbf";
        var OAR = web3.eth.contract([ { "constant": false, "inputs": [], "name": "getAddress", "outputs": [ { "name": "oaddr", "type": "address" } ], "type": "function" }]).at(OAR_addr).getAddress.call();
        var oraclize = web3.eth.contract([{ "constant": true, "inputs": [], "name": "baseprice", "outputs": [ { "name": "", "type": "uint256" } ], "type": "function" }]).at(OAR);

        for (var i = 0; i <= numberOfQuestions; i++) {

            questions[i] = [];
            questions[i] = JSON.parse(JSON.stringify(web3.eth.contract(ABI).at(contractAddr).questions(i)));
            console.log(questions[i]);
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
                    console.log(resp['items'][0]['title']);
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
                var text = 'Expiry date:'
                var info = new Date(expiryDate*1000).toLocaleString();

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
            console.log(sponsorList)
            for (var j = 0; j < sponsorList.length; j++) {
                totalBounty +=
                    web3.toDecimal(web3.eth.contract(ABI).at(contractAddr).getSponsorBalance(
                        i,
                        sponsorList[j])
                    );
            }

            if (questionExist) {
                var priceETH =  web3.fromWei(totalBounty, 'ether');
                priceETH = (priceETH <= 0 || priceETH > 1e20) ? '< 0.01':'~ ' + priceETH;
                console.log(priceETH);
                $('#questionList').append(
                    '<div class="panel panel-default" id = "questionList_n'+i+'"> <div class="panel-body"> <div class="row"> <div class="col-md-1"> <div class="iwrap"> <div class="iconsite"> <img src="http://cdn.sstatic.net/'+ site +'/img/favicon.ico" alt="stackexchange icon"/> <span class="siteb" title="'+site+'.stackexchange.com">'+ site +'</span> </div> </div> </div> <div class="col-md-9 center"> <span class="extra">'+ questionTitle +'</span> </div> <div class="col-md-2"> <a href="#'+ contractAddress.trim()+'" onclick="clickHash();"> <span class="seemore">SEE MORE</span> <span class="glyphicon glyphicon-play playedit"></span> </a> </div> </div> <div class="col-md-8 col-md-offset-2"> <div class="col-md-6"> <span class="rounded">Total Bounty:</span> <span> '+ priceETH +' Ξ </span> </div> <div class="col-md-6"> <span class="rounded">'+text+'</span> <span>'+info+'</span> </div> </div> </div> </div> </div>'
                );
            }



        }
    }

    function connecting() {
        connectToNode().then( function() {
                Web3isSet = true;
                $('#connected').show();
                var availableAccounts = web3.eth.accounts;
                $.each(availableAccounts,function(index, account) {
                    web3.eth.sendTransaction({from: account, to: account, value: 0, gas: 0, gasPrice: 0 },
                        function(err, res) {
                            if (err == 'Error: Gas price too low for acceptance') {
                                unlockedAccount = account;
                                $('#unlocked').show();
                                renderQuestions();
                            }
                            else {
                                $('#locked').show();
                            }

                    });
                });
        }).catch( function() {
            reset();
            Web3isSet = false;
            $('#unlocked').hide();
            $('#locked').hide();
            $('#connected').hide();
            $('#notconnected').show();
        })
    }

    function connectToNode() {
        return new Promise( function (resolve, reject) {
            if (typeof mist !== 'undefined') {
                web3 = new Web3(web3.currentProvider);
                resolve();
            }
            else {
                nodeIP = $('#nodeIP').val();
                $('#connected, #notconnected').hide();
                web3 = new Web3(new Web3.providers.HttpProvider(nodeIP));

                if (web3.isConnected() != false) {
                    Web3isSet = true;
                    resolve();
                }
                else
                    reject();
            }
        })
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


    function clickHash(){
        window.setTimeout(function(){ location.reload(); },80);
    }

    jQuery(document).ready(function($) {
        $('#place_h').markdownEditor({
            preview: true,
            onPreview: function (content, callback) {
                callback( $('#wmd-preview-customsuffix').html(marked(content)) );
            }
        });
    });

    function reset(){
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
