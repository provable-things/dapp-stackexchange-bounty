
var nodeList = {
    'Localhost': 'http://localhost:8545/',
    'Mainnet' : 'http://178.62.29.206:8081/',
    'Morden' : 'http://178.62.29.206:8082/',
    'Testnet161' : 'http://178.62.29.206:8083/',
};

var ABI = [{"constant":false,"inputs":[{"name":"queryID","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_i","type":"uint256"},{"name":"_sponsorAddr","type":"address"}],"name":"getSponsorBalance","outputs":[{"name":"sponsorBalance","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_questionID","type":"uint256"},{"name":"_site","type":"string"}],"name":"handleQuestion","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_i","type":"uint256"}],"name":"increaseBounty","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_questionID","type":"uint256"},{"name":"_site","type":"string"}],"name":"getAddressQuestion","outputs":[{"name":"questionAddr","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"_i","type":"uint256"}],"name":"getSponsors","outputs":[{"name":"sponsorList","type":"address[]"}],"type":"function"},{"inputs":[],"type":"constructor"}];
var nameregABI = [{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"name","outputs":[{"name":"o_name","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"content","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"addr","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"reserve","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"subRegistrar","outputs":[{"name":"o_subRegistrar","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_newOwner","type":"address"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_registrar","type":"address"}],"name":"setSubRegistrar","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"Registrar","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_a","type":"address"},{"name":"_primary","type":"bool"}],"name":"setAddress","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_content","type":"bytes32"}],"name":"setContent","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"disown","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"register","outputs":[{"name":"","type":"address"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"}],"name":"Changed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"},{"indexed":true,"name":"addr","type":"address"}],"name":"PrimaryChanged","type":"event"}];

var Web3isSet = false;
var gethIP = '';
var contractAddr = '';
var hash = '';
var list = '';
var web3;
var ended = false;
var ownerusername = '';
var refundsponsors = '';
var gasAmountDeploy = 3000000;
var gasHandleQuestionMethod = 500000;
var unlockedAccounts = ''; // []
var mistObj = false;
var contractDefaultAddr = '0x2f143bb3ef7782192a5cdcd56e3aeb400ff79b9d';

if (typeof mist !== 'undefined') {

    mistObj = true;

    /* --- REMOVE ATTR NON FUNZIONA (FIX solo per debug!) --- */
    removeattrdismist();
    /* --- ------------------------ --- */

    $('#gethIP').val('MIST BROWSER');
    web3 = new Web3(web3.currentProvider);
    var availableAccounts = web3.eth.accounts;
    //document.write(JSON.stringify(available_accounts));
    /*
    $.each(available_accounts,function(index,val){
    var gastotneeded = gasamountsetvideo+gasAmountDeploy;
    if(web3.eth.getBalance(val).toNumber()>=gastotneeded && val.length==42){
    unlocked_accounts.push(val);
}
});
*/
    unlockedAccounts = web3.eth.accounts[0];
    gethConnect();
}
else {
    gethConnect();
}

$( document ).ready(function() {
    Object.keys(nodeList).forEach(function(i) {
        list += '#'+i+',';
        $('#btgr').append(
            '<button type="button" class="btn btn-default btn-sm" id="'+i+'">'+i+'</button>'
        );
    });

    if (window.location.hash != '') {
        hash = window.location.hash.substr(1);
        $('#bback').html(
            '<a href = "http://dapps.oraclize.it/stackexchange/" \
                style = "border-bottom: 1px dotted #2196F3; \
                text-decoration: none;" > \
                <span class = "glyphicon glyphicon-chevron-left" aria-hidden = "true"> \
                </span> Questions list \
            </a>'
        );

        $('#contractAddr').val(hash);
        $('#contractAddrInput').val(hash);
        $('#submitContractAddr').click();
        $('#addNewQuestionDiv').show();
    }
    else {
        $('#content_title').show();
        $('#load_q').hide();
        $('#content_title').addClass('animated fadeIn');
        $('#contractAddr').val(contractDefaultAddr);
        $('#submitContractAddr').click();
        //$('#buttoncollapseid').click();
    }

    setTimeout( function() {
        $('' + list.slice(0, -1) + '').on('click', function() {
            $('#gethIP').val(nodeList[$(this).text()]);
        });
    }, 500);
});

$('#submitgethIP').on('click', function() {
    gethConnect();
});

$('#newQuestionSubmit').on('click', function() {
    $('#StackExchURL').attr('disabled','');
    $('#newQuestionSubmit').attr('disabled','');

    if (Web3isSet == true || mistObj== true) {
        var questionURL = $('input[id = StackExchURL]').val().trim();
        var questionSite = questionURL.match("://(.*).stackexchange")[1];
        var questionID = questionURL.match("stackexchange.com/questions/(.*)/")[1];

        $('#newQuestionResult').html(
            '<br>Site: <b>' + questionSite + '</b>.stackexchange.com<br>\
            Question ID: <b>' + questionID + '</b>'
        );

        if (questionURL == '' ||
            questionSite.indexOf('/') !== -1 ||
            questionID.indexOf('/') !== -g
        ) {
            alert('Please enter a valid URL');
        } else {
            var handleQuestionTx =
                web3.eth.contract(ABI).at(contractDefaultAddr).handleQuestion(
                    questionID,
                    questionSite,
                    {
                        from: unlocked_accounts,
                        value: 100000000000000000,
                        gas: gasHandleQuestionMethod
                    }
                );

                $('#loading_dep').show();
                $('#loading_dep').addClass('animated fadeIn');

                setTimeout( function() {
                    var questionContractAddr =
                        web3.eth.contract(ABI).at(contractDefaultAddr).getAddressQuestion(
                            questionID,
                            questionSite
                        );

                    console.log(questionContractAddr);

                    if (questionContractAddr != '0x0000000000000000000000000000000000000000') {

                        $('#newQuestionResult').append(
                            '<br>Question deposited<br>\
                            <a href="#'+questionContractAddr+'" onclick="clickHash();"> \
                            '+questionContractAddr+
                            '</a>'
                        );

                        $('#loading_dep').hide();
                    } else {

                        setTimeout( function() {
                            var questionContractAddr =
                                web3.eth.contract(ABI).at(contractDefaultAddr).getAddressQuestion(
                                    questionID,
                                    questionSite
                                );

                            console.log(questionContractAddr);

                            if (questionContractAddr != '0x0000000000000000000000000000000000000000') {

                                $('#newQuestionResult').append(
                                    '<br>Question deposited<br>\
                                    <a href="#'+questionContractAddr+'" onclick="clickHash();"> \
                                    '+questionContractAddr+
                                    '</a>'
                                );

                                $('#loading_dep').hide();
                                i=100000;
                            }

                        }, 60000);
                    }

                    $('#StackExchURL').removeAttr('disabled');
                    $('#newQuestionSubmit').removeAttr('disabled');
                },9000);
        }

    } else {
        alert('Please connect to a local geth node before.');
    }
});

//var defaultOraclizeAddr = '0x1d11e5eae3112dbd44f99266872ff1d07c77dce8';
// TEST
var defaultOraclizeAddr = '0x0ae06d5934fd75d214951eb96633fbd7f9262a7c';
var questions = [];

$('#submitContractAddr').on('click', function(e) {

    $('#loadingif').css('display','inline-block');
    e.preventDefault();

    if (Web3isSet == true) {
        contractAddr = $('#contractAddr').val().trim();

        if (hash != contractAddr) {
            //window.location.hash = contractAddr;
        }

        if (hash == '') {
            $('#addNewQuestion').removeAttr('style');
        }

        var onContractOraclizeAddr = web3.eth.getStorageAt(contractAddr, 0).replace('000000000000000000000000','');
        var numberOfQuestions = web3.eth.getStorageAt(contractAddr, 1);
        var contractBalance = web3.toDecimal(web3.eth.getStorageAt(contractAddr, 2));
        //var vowner = web3.eth.getStorageAt(contractAddr, 4).replace('0x000000000000000000000000','');
        //var vviews1 = web3.toDecimal(web3.eth.getStorageAt(contractAddr, 2));

        //var OAR_addr = "0x1d11e5eae3112dbd44f99266872ff1d07c77dce8";
        // TEST
        var OAR_addr = "0x20e12a1f859b3feae5fb2a0a32c18f5a65555bbf";
        var OAR = web3.eth.contract([ { "constant": false, "inputs": [], "name": "getAddress", "outputs": [ { "name": "oaddr", "type": "address" } ], "type": "function" }]).at(OAR_addr).getAddress.call();
        var oraclize = web3.eth.contract([{ "constant": true, "inputs": [], "name": "baseprice", "outputs": [ { "name": "", "type": "uint256" } ], "type": "function" }]).at(OAR);
        var oraclizeBasePrice= oraclize.baseprice().toNumber();

        if ( web3.toAscii(web3.eth.getStorageAt(contractAddr, 3)) == "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000") {

            for (var i = 1; i <= numberOfQuestions; i++) {
                // N - 1
                // 1 = contract address generated
                // 2 = owner accepted question (address)
                // 3 = User id accepted question
                // 4 = ID of the question (site.stackexchange.com/ID/)
                // 5 = site of the question
                // 6 = ID of the accepted answer
                // 7 = delay between oraclize queries (in seconds)
                // 8 = expiry date
                // 9 = current fee

                questions[i] = [];
                questions[i] = JSON.parse(JSON.stringify(web3.eth.contract(ABI).at(contractAddr).questions(i)));

                var nowUnix = new Date().getTime()/1000;

                if (questions[i][1]=='0x0000000000000000000000000000000000000000' &&
                    nowUnix < parseInt(questions[i][7])
                ) {
                    var date = new Date(questions[i][7]*1000);
                    var hours = date.getHours();
                    var minutes = "0" + date.getMinutes();

                    var month = "0"+(date.getMonth()+1);
                    var day = date.getDate();
                    var year = "0"+date.getYear();

                    var formattedTime = hours + ':' + minutes.substr(-2) + ' ' + day + '/' + month + '/'+ year.substr(-2);
                    var exp_text = 'Expiry date:'
                    var exp = formattedTime;
                }
                else if(questions[i][1]!='0x0000000000000000000000000000000000000000') {
                    var exp_text = 'Status:'
                    var exp = 'Completed';
                }
                else if(questions[i][1]=='0x0000000000000000000000000000000000000000' &&
                        nowUnix < parseInt(questions[i][7])
                ) {
                    var exp_text = 'Status:'
                    var exp = 'Expired';
                }

                var title_question = '';
                var totalBounty = 0;

                var sponsorList = web3.eth.contract(ABI).at(contractAddr).getSponsors(i);

                for(var j = 0; j < sponsorList.length; j++) {
                    totalBounty +=
                        web3.toDecimal(web3.eth.contract(ABI).at(contractAddr).getSponsorsBalance(
                            i,
                            sponsorList[j])
                        );
                }

                var question_ok = true;

                $.ajax({
                    url:
                        "https://api.stackexchange.com/2.2/questions/" + questions[i][3] + "?site=" + questions[i][4],
                    type: "GET",
                    crossDomain: true,
                    dataType: "json",
                    success: function (resp) {
                        if (resp['error_id'] == 400) {
                            question_ok = false;
                            return;
                        }
                        title_question = resp['items'][0]['title'];
                        console.log(resp['items'][0]['title']);
                    },
                    async: false,
                    error: function (xhr, status) {
                        question_ok = false;
                        return;
                    }
                });

                if (question_ok) {

                    var priceUSD = parseFloat((totalBounty/(oraclizeBasePrice*1000))).toFixed(2);
                    var priceETH = parseFloat((totalBounty/1000000000000000000)).toFixed(2);
                    priceETH = (priceETH <= 0) ? '< 0.01':'~ ' + priceETH;
                    priceUSD = (priceUSD <= 0) ? '< 0.01':'~ ' + priceUSD;

                    var questionHTML = '<div class="panel panel-default" id="question_list_n_'+i+'" style="display:none;"> <div class="panel-body"> <div class="row"> <div class="col-md-1"><div class="iwrap"><div class="iconsite"><img src="http://cdn.sstatic.net/'+questions[i][4]+'/img/favicon.ico" alt="stackexchange icon"/><span class="siteb" title="'+questions[i][4]+'.stackexchange.com">'+questions[i][4]+'</span></div></div> </div> <div class="col-md-9 center"> <span class="extra">'+title_question+'</span> </div> <div class="col-md-2"> <a href="#'+questions[i][0].trim()+'" onclick="clickHash();"> <span class="seemore">SEE MORE</span> <span class="glyphicon glyphicon-play playedit"></span> </a> </div> </div> <div class="row" style="margin-top:5px;"> <div class="col-md-8 col-md-offset-2"> <div class="col-md-6"> <span class="rounded">Total Bounty:</span> <span title="'+priceETH+' ETHER">'+priceUSD+' $</span> </div> <div class="col-md-6"> <span class="rounded">'+exp_text+'</span> <span>'+exp+'</span> </div> </div> </div> </div> </div>';
                    $('#questionList').append(questionHTML);
                }

            }
        } else {
            console.log(onContractOraclizeAddr);

            if (onContractOraclizeAddr != defaultOraclizeAddr && contractBalance > 0) {
                $('#buttoncollapseid').click();
                alert('Contract ID not found or is not a stackexchange contract');
                return;
            }

            var i = web3.toDecimal(web3.eth.getStorageAt(contractAddr, 2));
            var site = web3.toAscii(web3.eth.getStorageAt(contractAddr, 3));
            var id_q = web3.toDecimal(web3.eth.getStorageAt(contractAddr, 1));
            var main_addr = web3.eth.getStorageAt(contractAddr, 0).replace('0x000000000000000000000000','');

            questions[i] = [];
            questions[i] = JSON.parse(JSON.stringify(web3.eth.contract(ABI).at(main_addr).questions(i)));

            var nowUnix = new Date().getTime()/1000;
            var date = new Date(questions[i][7]*1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();

            var month = "0"+(date.getMonth()+1);
            var day = date.getDate();
            var year = "0"+date.getYear();

            var formattedTime = hours + ':' + minutes.substr(-2) + ' ' + day +'/'+month+'/'+year.substr(-2);
            var exp = formattedTime;
            $('.expdateinfo').html(exp);
            $('#expdateinfo').html('<span style="font-size:1.4em;">'+exp+'</span>');

            var question_owner;
            var question_owner_link;
            var question_owner_profile_image;
            var question_link;
            var question_title;
            var question_body;

            $.ajax({
                url: 'https://api.stackexchange.com/2.1/questions/'+questions[i][3]+'?site='+questions[i][4]+'&filter=withbody',
                type: "GET",
                crossDomain: true,
                dataType: "json",
                success: function (resp) {
                    if(resp['error_id']==400){
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
            var uniqueEditorSuffix = '-customsuffix';
            var converter1 = Markdown.getSanitizingConverter();
            var editor1 = new Markdown.Editor(converter1, uniqueEditorSuffix);
            var mjpd1 = new MJPD();  // create a new MJPD for each editor on the page
            mjpd1.Editing.prepareWmdForMathJax(editor1, uniqueEditorSuffix, [["$", "$"]]);
            editor1.run();

            $('#lasthr').after('<a href="'+question_link+'" target="_blank"><div class="box_all_ans center"><span style="vertical-align: -webkit-baseline-middle;">See all the answers <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></span> </div></a>')

            $('#question_show').show();

            $('#siteinfo').html('<b>'+questions[i][4]+'</b>.stackexchange.com');
            $('#imgfav').attr('src','http://cdn.sstatic.net/'+questions[i][4]+'/img/favicon.ico');

            if(questions[i][1]=='0x0000000000000000000000000000000000000000' && nowUnix<parseInt(questions[i][7])){
                $('#start').show();
                $('#start').addClass('animated fadeInUp');
                $('#sponsorq').removeAttr('disabled');
            }
            else if(questions[i][1]!='0x0000000000000000000000000000000000000000'){
                $('#sponsorq').attr('title','The status of this smart contract is completed, you cannot sponsor this question anymore');
                var url_api = 'https://api.stackexchange.com/2.2/users/'+questions[i][2]+'?site='+questions[i][4];

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

                $('#answer_acc').html('One accepted answer');
                $('#resultcontr').html("was");
                $('#resultsuccess').html("all the sponsors funds were sent to the user with the accepted answer");
                $('#first_panel').after('<div class="panel panel-primary"> <div class="panel-heading"> <h3 class="panel-title">User accepted answer address</h3> </div> <div class="panel panel-default"> <div class="panel-body"> <a href="https://test.ether.camp/account/'+questions[i][1]+'" target="_blank" title="'+questions[i][1]+'">'+questions[i][1].slice(0, -34)+'...</a> ( '+user_link+' )</div> </div> </div>');
                $('#end').show();
                $('#end').addClass('animated fadeInUp');
            }
            else if (
                    questions[i][1] == '0x0000000000000000000000000000000000000000' &&
                    nowUnix < parseInt(questions[i][7])
                ){

                $('#answer_acc').html('no accepeted answer');
                $('#resultcontr').html("wasn't");
                $('#resultsuccess').html("the sponsors have received a refund of their balance");
                $('#end').show();
                $('#end').addClass('animated fadeInUp');
            }

            var totalBounty = 0;
            var sponsorList = web3.eth.contract(ABI).at(main_addr).getSponsors(i);
            var sponsorsBalanceList = [];

            for(var j = 0; j <= sponsorList.length; j++){
                sponsorsBalanceList[j] =
                    web3.toDecimal(web3.eth.contract(ABI).at(main_addr).getSponsorsBalance(
                        i,
                        sponsorList[j])
                    );
                totalBounty +=
                    web3.toDecimal(web3.eth.contract(ABI).at(main_addr).getSponsorBalance(
                        i,
                        sponsorList[j]
                    ));
            }

            var priceUSD = parseFloat((totalBounty/(base_price_oraclize*1000))).toFixed(2);
            var priceETH = parseFloat((totalBounty/1000000000000000000)).toFixed(2);

            priceETH = (priceETH <= 0) ? '0.01':'~ ' + priceETH;
            priceUSD = (priceUSD <= 0) ? '< <span style="font-size:1.7em;">0.01</span>':'~ \
                <span style="font-size:1.7em;">' + priceUSD + '</span>';

            $('#tot_b').html('<span title="'+priceETH+' ETHER">'+priceUSD+' $</span>');

            for (var k = 0; k <= sponsorList.length; k++ ) {
                var priceUSD = parseFloat((sponsorsBalanceList[k]/(base_price_oraclize*1000))).toFixed(2);
                var priceETH = parseFloat((sponsorsBalanceList[k]/1000000000000000000)).toFixed(2);
                priceETH = (priceETH <= 0) ? '0.01':'~ ' + priceETH;
                priceUSD = (priceUSD <= 0) ? '< 0.01':'~ ' + priceUSD;
                $('#tab > tbody').append(
                    '<tr> <th scope="row">' + k +'</th> <td>'  + sponsorList[k].replace('0x','') +
                    '</td> <td title="' + priceETH + ' ETHER">'+ priceUSD +' $</td></tr>'
                );
            }


            //var namereg_addr = "0x33990122638b9132ca29c723bdf037f1a891a70c";
            // TEST
            var nameregAddr = "0xb22238d201a1d5813866933eb69b30692e14f9e0";
            try {
                var GlobalRegistrar = web3.eth.contract(nameregABI).at(nameregAddr);
                ownerusername = web3.toAscii(GlobalRegistrar.name(owner));
                //ownerusername = web3.eth.contract([{ "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "nameOf", "outputs": [ { "name": "name", "type": "string" } ], "type": "function" }]).at(namereg_addr).nameOf(owner);
            } catch (e) {
                ownerusername = "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000";
            };
            $('#load_q').hide(),
            $('#content').show();
            $('#content > .col-md-3 > .panel').each(function(){
                $(this).addClass('animated fadeIn');
            });
        }
    }
    else {
        alert('Please, connect to geth node before');
    }

});


setTimeout(function(){
    var m = 1;
    $('#questionList> .panel').each(function(indx, val) {

        $(this).show();
        $(this).addClass('animated fadeInUp');

        m += 1;
    });

}, 1000);

function gethConnect(){
    gethIP = $('#gethIP').val();
    $('#connected, #notconnected').hide();
    if (gethIP != 'MIST BROWSER') {
        web3 = new Web3(new Web3.providers.HttpProvider(gethIP));
    }

    if (web3.isConnected() != false) {
        Web3isSet = true;
        $('#connected').show();
        var availableAccounts = web3.eth.accounts;

        if(mistObj == false) {
            unlockedAccounts = ''; // []

            $.each(availableAccounts,function(index,val){
                web3.eth.sendTransaction({from: val, to: val, value: 0, gas: 0, gasPrice: 0 },
                    function(err, res) {
                        if( err == 'Error: Gas price too low for acceptance') {
                            // unlocked
                            /*
                            var gastotneeded = gasamountsetvideo+gasAmountDeploy;
                            if(web3.eth.getBalance(val).toNumber()>=gastotneeded){
                            unlocked_accounts.push(val);
                        }
                        */
                        unlockedAccounts = web3.eth.accounts[0];
                    }
                });


            });
        }

        setTimeout( function () {

            if (unlockedAccounts.length > 0) {
                $('#addNewQuestion').removeAttr('disabled');
                $('#addNewQuestion').removeAttr('title');
            }
            else {
                if (mistObj == false) {
                    $('#addNewQuestion').attr('disabled','');
                    $('#addNewQuestion').attr('title','Please connect to your local unlocked node before');
                }
            }
        }, 200);


    }
    else {
        reset();
        Web3isSet = false;
        $('#notconnected').show();
    }


}

function removeattrdismist(){
    $('#addNewQuestion').removeAttr('disabled');
    $('#addNewQuestion').removeAttr('title');
}

function onmouseoverdepldisabled(x) {
    if( x == 1) {
        $('#arrowifdisabled').html('<img src="arrow.png" alt="arrow" style="margin-top:-50px;">');
        $('#arrowifdisabled').addClass('animated fadeIn');
    }
    else {
        //$('#arrowifdisabled').addClass('animated fadeOut');
        $('#arrowifdisabled').html('');
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    $('#addNewQuestion').attr('disabled','');
    $('#addNewQuestion').attr('title','Please connect to your local unlocked node before');
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
