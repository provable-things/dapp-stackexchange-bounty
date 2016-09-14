"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Web3Service = (function () {
    function Web3Service() {
        this.update = new core_1.EventEmitter();
        this.contractAddr = '0xcebe9aa3b41a0b12d28ebcb7931fff0e0244165b';
        this.defaultNodeIP = 'https://eth3.augur.net';
        this.nodeConnected = true;
        this.adding = false;
        this.ABI = [{ 'constant': false, 'inputs': [{ 'name': 'queryID', 'type': 'bytes32' }, { 'name': 'result', 'type': 'string' }], 'name': '__callback', 'outputs': [], 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': '', 'type': 'uint256' }], 'name': 'questions', 'outputs': [{ 'name': 'contractAddress', 'type': 'address' }, { 'name': 'site', 'type': 'string' }, { 'name': 'questionID', 'type': 'uint256' }, { 'name': 'winnerAddress', 'type': 'address' }, { 'name': 'winnerID', 'type': 'uint256' }, { 'name': 'acceptedAnswerID', 'type': 'uint256' }, { 'name': 'updateDelay', 'type': 'uint256' }, { 'name': 'expiryDate', 'type': 'uint256' }, { 'name': 'ownedFee', 'type': 'uint256' }], 'type': 'function' }, { 'constant': false, 'inputs': [], 'name': 'kill', 'outputs': [], 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': '_i', 'type': 'uint256' }, { 'name': '_sponsorAddr', 'type': 'address' }], 'name': 'getSponsorBalance', 'outputs': [{ 'name': 'sponsorBalance', 'type': 'uint256' }], 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': '_questionID', 'type': 'uint256' }, { 'name': '_site', 'type': 'string' }], 'name': 'handleQuestion', 'outputs': [], 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': '_i', 'type': 'uint256' }], 'name': 'increaseBounty', 'outputs': [], 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'contractBalance', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': '_questionID', 'type': 'uint256' }, { 'name': '_site', 'type': 'string' }], 'name': 'getAddressOfQuestion', 'outputs': [{ 'name': 'questionAddr', 'type': 'address' }], 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': '_i', 'type': 'uint256' }], 'name': 'getSponsors', 'outputs': [{ 'name': 'sponsorList', 'type': 'address[]' }], 'type': 'function' }, { 'inputs': [], 'type': 'constructor' }, { 'anonymous': false, 'inputs': [{ 'indexed': false, 'name': 'questionAddr', 'type': 'address' }], 'name': 'QuestionAdded', 'type': 'event' }, { 'anonymous': false, 'inputs': [], 'name': 'BountyIncreased', 'type': 'event' }, { 'anonymous': false, 'inputs': [], 'name': 'BountyPaid', 'type': 'event' }];
    }
    Web3Service.prototype.intializeWeb3 = function () {
        this.nodeIP = localStorage['nodeIP'] || this.defaultNodeIP;
        this.connectToNode();
    };
    Web3Service.prototype.getNumQuestions = function () {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this.web3.eth.getStorageAt('0xcebe9aa3b41a0b12d28ebcb7931fff0e0244165b', 3, function (error, result) {
                console.log(_this.web3.toDecimal(result));
                if (!error) {
                    resolve(_this.web3.toDecimal(result));
                }
                else {
                    reject(error);
                }
            });
        });
        return p;
    };
    Web3Service.prototype.getQuestion = function (index) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this.web3.eth.contract(_this.ABI).at(_this.contractAddr).questions(index, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                }
            });
        });
        return p;
    };
    Web3Service.prototype.getQuestionIndex = function (questionAddr) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this.web3.toDecimal(_this.web3.eth.getStorageAt(questionAddr, 3, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                }
            }));
        });
        return p;
    };
    Web3Service.prototype.getQuestionAddr = function (id, site) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this.web3.eth.contract(_this.ABI).at(_this.contractAddr).getAddressOfQuestion(id, site, function (error, result) {
                if (!error) {
                    resolve(result);
                }
                else {
                    reject(error);
                }
            });
        });
        return p;
    };
    Web3Service.prototype.getSponsorList = function (index, contractAddr) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this.web3.eth.contract(_this.ABI).at(contractAddr).getSponsors(index, function (error, result) {
                if (!error) {
                    resolve(JSON.parse(JSON.stringify(result)));
                }
                else {
                    reject(error);
                }
            });
        });
        return p;
    };
    Web3Service.prototype.getSponsorBalance = function (index, sponsor, contractAddr) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this.web3.eth.contract(_this.ABI).at(contractAddr).getSponsorBalance(index, sponsor, function (error, result) {
                if (!error) {
                    resolve(_this.web3.toDecimal(result));
                }
                else {
                    reject(error);
                }
            });
        });
        return p;
    };
    Web3Service.prototype.getMainAddr = function (questionAddr) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this.web3.eth.getStorageAt(questionAddr, 0, function (error, result) {
                if (!error) {
                    resolve(result.replace('0x000000000000000000000000', ''));
                }
                else {
                    console.error(error);
                }
            });
        });
        return p;
    };
    Web3Service.prototype.weiToEth = function (wei) {
        return parseFloat(this.web3.fromWei(wei, 'ether'));
    };
    Web3Service.prototype.connected = function () {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            if (_this.nodeIP !== 'MetaMask') {
                _this.web3.eth.sendTransaction({ from: _this.web3.eth.accounts[0], to: _this.web3.eth.accounts[0], value: 0, gas: 0, gasPrice: 0 }, function (err, res) {
                    ;
                    if (err.toString() !== 'Error: account is locked') {
                        _this.unlockedAccount = _this.web3.eth.accounts[0];
                        _this.update.emit(null);
                        console.log('Connected to account: ' + _this.unlockedAccount);
                        resolve(true);
                    }
                    else {
                        console.log('Error: Could not find an unlocked account');
                        resolve(false);
                    }
                });
            }
            else {
                _this.unlockedAccount = _this.web3.eth.accounts[0];
                console.log('Connected to account: ' + _this.unlockedAccount);
                resolve(false);
            }
        });
        return p;
    };
    Web3Service.prototype.handleConnection = function (connect) {
        if (connect) {
            this.connected();
        }
        else {
            this.nodeIP = this.defaultNodeIP;
            this.connectToNode();
        }
        this.nodeConnected = connect;
    };
    Web3Service.prototype.connectToNode = function () {
        if (typeof window['web3'] !== 'undefined' && (!localStorage['nodeIP'] || this.nodeIP === 'MetaMask')) {
            localStorage['nodeIP'] = this.nodeIP;
            console.log('Using injected web3');
            this.web3 = new this.Web3(window['web3'].currentProvider);
            this.nodeIP = 'MetaMask';
            this.nodeConnected = true;
            this.unlockedAccount = 'MetaMask';
            this.update.emit(null);
        }
        else {
            localStorage['nodeIP'] = this.nodeIP;
            console.log('Using HTTP node');
            this.unlockedAccount = undefined;
            this.web3 = new this.Web3(new this.Web3.providers.HttpProvider(this.nodeIP));
            this.handleConnection(this.web3.isConnected());
        }
    };
    Web3Service.prototype.addQuestion = function (url, site, id, amount) {
        var _this = this;
        if (url !== '' && site.indexOf('/') === -1) {
            this.connected().then(function (connected) {
                _this.web3.eth.contract(_this.ABI).at(_this.contractAddr).handleQuestion(id, site, {
                    from: _this.unlockedAccount,
                    value: _this.web3.toWei(amount, 'ether'),
                    gas: 500000
                }, function (error, result) {
                    _this.adding = true;
                    _this.update.emit(null);
                    if (error) {
                        console.log(error);
                    }
                    console.log('adding', result);
                    setTimeout(function () {
                        var contractInstance = _this.web3.eth.contract(_this.ABI).at(_this.contractAddr);
                        var z = 0;
                        _this.adding = false;
                        _this.update.emit(null);
                        contractInstance.QuestionAdded(function (error, resultQ) {
                            console.log(result);
                            if (!error && z === 0) {
                                z += 1;
                                console.log('Question added at: ' + resultQ.args.questionAddr);
                            }
                            else {
                                console.log('Error: Question not added');
                            }
                        });
                    }, 25000);
                });
                return true;
            });
        }
        return false;
    };
    Object.defineProperty(Web3Service.prototype, "isConnected", {
        get: function () {
            return this.nodeConnected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web3Service.prototype, "web3", {
        get: function () {
            if (!this.web3Instance) {
                this.intializeWeb3();
            }
            return this.web3Instance;
        },
        set: function (web3) {
            this.web3Instance = web3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web3Service.prototype, "currentAcc", {
        get: function () {
            return this.unlockedAccount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web3Service.prototype, "currentAddr", {
        get: function () {
            return this.contractAddr;
        },
        set: function (contractAddr) {
            if (contractAddr.length === 42 || contractAddr.length === 40) {
                this.contractAddr = contractAddr;
            }
            else {
                console.log('Invalid address used');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web3Service.prototype, "currentNode", {
        get: function () {
            return this.nodeIP;
        },
        set: function (nodeIP) {
            this.nodeIP = nodeIP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web3Service.prototype, "Web3", {
        get: function () {
            return window['Web3'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web3Service.prototype, "addingQuestion", {
        get: function () {
            return this.adding;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Web3Service.prototype, "update", void 0);
    Web3Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Web3Service);
    return Web3Service;
}());
exports.Web3Service = Web3Service;
