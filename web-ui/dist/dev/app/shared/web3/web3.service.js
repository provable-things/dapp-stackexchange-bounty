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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvd2ViMy93ZWIzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFpRCxlQUFlLENBQUMsQ0FBQTtBQUdqRTtJQUFBO1FBQ2MsV0FBTSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzlCLGlCQUFZLEdBQVcsNENBQTRDLENBQUM7UUFDcEUsa0JBQWEsR0FBVyx3QkFBd0IsQ0FBQztRQUVqRCxrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBS3hCLFFBQUcsR0FBSSxDQUFDLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLGVBQWUsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLEVBQUMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLG1CQUFtQixFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxpQkFBaUIsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxFQUFDLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsc0JBQXNCLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsRUFBQyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxFQUFDLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLE1BQU0sRUFBQyxP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SUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO2FBQ0QsVUFBZ0IsWUFBb0I7WUFDaEMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztZQUNyQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVFELHNCQUFJLG9DQUFXO2FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBQ0QsVUFBZ0IsTUFBYztZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixDQUFDOzs7T0FIQTtJQUtELHNCQUFJLDZCQUFJO2FBQVI7WUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUNBQWM7YUFBbEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQTdQRDtRQUFDLGFBQU0sRUFBRTs7K0NBQUE7SUFGYjtRQUFDLGlCQUFVLEVBQUU7O21CQUFBO0lBZ1FiLGtCQUFDO0FBQUQsQ0EvUEEsQUErUEMsSUFBQTtBQS9QWSxtQkFBVyxjQStQdkIsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL3dlYjMvd2ViMy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYjNTZXJ2aWNlIHtcbiAgICBAT3V0cHV0KCkgdXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHByaXZhdGUgY29udHJhY3RBZGRyOiBzdHJpbmcgPSAnMHhjZWJlOWFhM2I0MWEwYjEyZDI4ZWJjYjc5MzFmZmYwZTAyNDQxNjViJzsgLy8gQ3VycmVudCBhZGRyZXNzIGlmIHRoZSB1c2VyIHNlbGVjdHMgYSBjdXN0b21cbiAgICBwcml2YXRlIGRlZmF1bHROb2RlSVA6IHN0cmluZyA9ICdodHRwczovL2V0aDMuYXVndXIubmV0JzsgICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgbm9kZVxuICAgIHByaXZhdGUgbm9kZUlQOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudCBub2RlSVBcbiAgICBwcml2YXRlIG5vZGVDb25uZWN0ZWQ6IGJvb2xlYW4gPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlJ3ZlIGVzdGFibGlzaGVkIGEgY29ubmVjdGlvbiB5ZXRcbiAgICBwcml2YXRlIGFkZGluZzogYm9vbGVhbiA9IGZhbHNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlJ3JlIGFkZGluZyBhIHF1ZXN0aW9uXG4gICAgcHJpdmF0ZSB3ZWIzSW5zdGFuY2U6IGFueTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDdXJyZW50IGluc3RhbmNlIG9mIHdlYjNcbiAgICBwcml2YXRlIHVubG9ja2VkQWNjb3VudDogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEN1cnJlbnQgdW5sb2NrZWQgYWNjb3VudFxuXG4gICAgLy8gQXBwbGljYXRpb24gQmluYXJ5IEludGVyZmFjZSBzbyB3ZSBjYW4gdXNlIHRoZSBxdWVzdGlvbiBjb250cmFjdFxuICAgIHByaXZhdGUgQUJJICA9IFt7J2NvbnN0YW50JzpmYWxzZSwnaW5wdXRzJzpbeyduYW1lJzoncXVlcnlJRCcsJ3R5cGUnOidieXRlczMyJ30seyduYW1lJzoncmVzdWx0JywndHlwZSc6J3N0cmluZyd9XSwnbmFtZSc6J19fY2FsbGJhY2snLCdvdXRwdXRzJzpbXSwndHlwZSc6J2Z1bmN0aW9uJ30seydjb25zdGFudCc6dHJ1ZSwnaW5wdXRzJzpbeyduYW1lJzonJywndHlwZSc6J3VpbnQyNTYnfV0sJ25hbWUnOidxdWVzdGlvbnMnLCdvdXRwdXRzJzpbeyduYW1lJzonY29udHJhY3RBZGRyZXNzJywndHlwZSc6J2FkZHJlc3MnfSx7J25hbWUnOidzaXRlJywndHlwZSc6J3N0cmluZyd9LHsnbmFtZSc6J3F1ZXN0aW9uSUQnLCd0eXBlJzondWludDI1Nid9LHsnbmFtZSc6J3dpbm5lckFkZHJlc3MnLCd0eXBlJzonYWRkcmVzcyd9LHsnbmFtZSc6J3dpbm5lcklEJywndHlwZSc6J3VpbnQyNTYnfSx7J25hbWUnOidhY2NlcHRlZEFuc3dlcklEJywndHlwZSc6J3VpbnQyNTYnfSx7J25hbWUnOid1cGRhdGVEZWxheScsJ3R5cGUnOid1aW50MjU2J30seyduYW1lJzonZXhwaXJ5RGF0ZScsJ3R5cGUnOid1aW50MjU2J30seyduYW1lJzonb3duZWRGZWUnLCd0eXBlJzondWludDI1Nid9XSwndHlwZSc6J2Z1bmN0aW9uJ30seydjb25zdGFudCc6ZmFsc2UsJ2lucHV0cyc6W10sJ25hbWUnOidraWxsJywnb3V0cHV0cyc6W10sJ3R5cGUnOidmdW5jdGlvbid9LHsnY29uc3RhbnQnOnRydWUsJ2lucHV0cyc6W3snbmFtZSc6J19pJywndHlwZSc6J3VpbnQyNTYnfSx7J25hbWUnOidfc3BvbnNvckFkZHInLCd0eXBlJzonYWRkcmVzcyd9XSwnbmFtZSc6J2dldFNwb25zb3JCYWxhbmNlJywnb3V0cHV0cyc6W3snbmFtZSc6J3Nwb25zb3JCYWxhbmNlJywndHlwZSc6J3VpbnQyNTYnfV0sJ3R5cGUnOidmdW5jdGlvbid9LHsnY29uc3RhbnQnOmZhbHNlLCdpbnB1dHMnOlt7J25hbWUnOidfcXVlc3Rpb25JRCcsJ3R5cGUnOid1aW50MjU2J30seyduYW1lJzonX3NpdGUnLCd0eXBlJzonc3RyaW5nJ31dLCduYW1lJzonaGFuZGxlUXVlc3Rpb24nLCdvdXRwdXRzJzpbXSwndHlwZSc6J2Z1bmN0aW9uJ30seydjb25zdGFudCc6ZmFsc2UsJ2lucHV0cyc6W3snbmFtZSc6J19pJywndHlwZSc6J3VpbnQyNTYnfV0sJ25hbWUnOidpbmNyZWFzZUJvdW50eScsJ291dHB1dHMnOltdLCd0eXBlJzonZnVuY3Rpb24nfSx7J2NvbnN0YW50Jzp0cnVlLCdpbnB1dHMnOltdLCduYW1lJzonY29udHJhY3RCYWxhbmNlJywnb3V0cHV0cyc6W3snbmFtZSc6JycsJ3R5cGUnOid1aW50MjU2J31dLCd0eXBlJzonZnVuY3Rpb24nfSx7J2NvbnN0YW50Jzp0cnVlLCdpbnB1dHMnOlt7J25hbWUnOidfcXVlc3Rpb25JRCcsJ3R5cGUnOid1aW50MjU2J30seyduYW1lJzonX3NpdGUnLCd0eXBlJzonc3RyaW5nJ31dLCduYW1lJzonZ2V0QWRkcmVzc09mUXVlc3Rpb24nLCdvdXRwdXRzJzpbeyduYW1lJzoncXVlc3Rpb25BZGRyJywndHlwZSc6J2FkZHJlc3MnfV0sJ3R5cGUnOidmdW5jdGlvbid9LHsnY29uc3RhbnQnOnRydWUsJ2lucHV0cyc6W3snbmFtZSc6J19pJywndHlwZSc6J3VpbnQyNTYnfV0sJ25hbWUnOidnZXRTcG9uc29ycycsJ291dHB1dHMnOlt7J25hbWUnOidzcG9uc29yTGlzdCcsJ3R5cGUnOidhZGRyZXNzW10nfV0sJ3R5cGUnOidmdW5jdGlvbid9LHsnaW5wdXRzJzpbXSwndHlwZSc6J2NvbnN0cnVjdG9yJ30seydhbm9ueW1vdXMnOmZhbHNlLCdpbnB1dHMnOlt7J2luZGV4ZWQnOmZhbHNlLCduYW1lJzoncXVlc3Rpb25BZGRyJywndHlwZSc6J2FkZHJlc3MnfV0sJ25hbWUnOidRdWVzdGlvbkFkZGVkJywndHlwZSc6J2V2ZW50J30seydhbm9ueW1vdXMnOmZhbHNlLCdpbnB1dHMnOltdLCduYW1lJzonQm91bnR5SW5jcmVhc2VkJywndHlwZSc6J2V2ZW50J30seydhbm9ueW1vdXMnOmZhbHNlLCdpbnB1dHMnOltdLCduYW1lJzonQm91bnR5UGFpZCcsJ3R5cGUnOidldmVudCd9XTtcblxuICAgIGludGlhbGl6ZVdlYjMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubm9kZUlQID0gbG9jYWxTdG9yYWdlWydub2RlSVAnXSB8fCB0aGlzLmRlZmF1bHROb2RlSVA7XG4gICAgICAgIHRoaXMuY29ubmVjdFRvTm9kZSgpOyAvLyBDb25uZWN0IHRvIHdoYXRldmVyJ3MgYXZhaWxhYmxlXG4gICAgfVxuXG4gICAgLy8gQ29udHJhY3QgZ2V0IGZ1bmN0aW9ucyAqTVVTVCogYmUgYXN5bmMgdG8gYWNjb21vZGF0ZSBNZXRhTWFza1xuICAgIGdldE51bVF1ZXN0aW9ucygpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53ZWIzLmV0aC5nZXRTdG9yYWdlQXQoJzB4Y2ViZTlhYTNiNDFhMGIxMmQyOGViY2I3OTMxZmZmMGUwMjQ0MTY1YicsIDMsIChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy53ZWIzLnRvRGVjaW1hbChyZXN1bHQpKTtcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy53ZWIzLnRvRGVjaW1hbChyZXN1bHQpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICBnZXRRdWVzdGlvbihpbmRleDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMud2ViMy5ldGguY29udHJhY3QodGhpcy5BQkkpLmF0KHRoaXMuY29udHJhY3RBZGRyKS5xdWVzdGlvbnMoaW5kZXgsIChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgZ2V0UXVlc3Rpb25JbmRleChxdWVzdGlvbkFkZHI6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLndlYjMudG9EZWNpbWFsKHRoaXMud2ViMy5ldGguZ2V0U3RvcmFnZUF0KHF1ZXN0aW9uQWRkciwgMywgKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgZ2V0UXVlc3Rpb25BZGRyKGlkOiBzdHJpbmcsIHNpdGU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLndlYjMuZXRoLmNvbnRyYWN0KHRoaXMuQUJJKS5hdCh0aGlzLmNvbnRyYWN0QWRkcikuZ2V0QWRkcmVzc09mUXVlc3Rpb24oaWQsIHNpdGUsIChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgZ2V0U3BvbnNvckxpc3QoaW5kZXg6IG51bWJlciwgY29udHJhY3RBZGRyOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53ZWIzLmV0aC5jb250cmFjdCh0aGlzLkFCSSkuYXQoY29udHJhY3RBZGRyKS5nZXRTcG9uc29ycyhpbmRleCwgKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXN1bHQpKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgZ2V0U3BvbnNvckJhbGFuY2UoaW5kZXg6IG51bWJlciwgc3BvbnNvcjogc3RyaW5nLCBjb250cmFjdEFkZHI6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLndlYjMuZXRoLmNvbnRyYWN0KHRoaXMuQUJJKS5hdChjb250cmFjdEFkZHIpLmdldFNwb25zb3JCYWxhbmNlKGluZGV4LCBzcG9uc29yLCAoZXJyb3IsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLndlYjMudG9EZWNpbWFsKHJlc3VsdCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIGdldE1haW5BZGRyKHF1ZXN0aW9uQWRkcjogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMud2ViMy5ldGguZ2V0U3RvcmFnZUF0KHF1ZXN0aW9uQWRkciwgMCwgKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnJlcGxhY2UoJzB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJywnJykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICB3ZWlUb0V0aCh3ZWk6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHRoaXMud2ViMy5mcm9tV2VpKHdlaSwgJ2V0aGVyJykpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZCgpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubm9kZUlQICE9PSAnTWV0YU1hc2snKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWIzLmV0aC5zZW5kVHJhbnNhY3Rpb24oe2Zyb206IHRoaXMud2ViMy5ldGguYWNjb3VudHNbMF0sIHRvOiB0aGlzLndlYjMuZXRoLmFjY291bnRzWzBdLCB2YWx1ZTogMCwgZ2FzOiAwLCBnYXNQcmljZTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyLCByZXMpID0+IHs7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLnRvU3RyaW5nKCkgIT09ICdFcnJvcjogYWNjb3VudCBpcyBsb2NrZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bmxvY2tlZEFjY291bnQgPSB0aGlzLndlYjMuZXRoLmFjY291bnRzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlLmVtaXQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB0byBhY2NvdW50OiAnICsgdGhpcy51bmxvY2tlZEFjY291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogQ291bGQgbm90IGZpbmQgYW4gdW5sb2NrZWQgYWNjb3VudCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bmxvY2tlZEFjY291bnQgPSB0aGlzLndlYjMuZXRoLmFjY291bnRzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gYWNjb3VudDogJyArIHRoaXMudW5sb2NrZWRBY2NvdW50KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbm5lY3Rpb24oY29ubmVjdDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoY29ubmVjdCkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZUlQID0gdGhpcy5kZWZhdWx0Tm9kZUlQO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9Ob2RlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlQ29ubmVjdGVkID0gY29ubmVjdDtcbiAgICB9XG5cbiAgICBjb25uZWN0VG9Ob2RlKCk6IHZvaWQgeyAvLyBEb24ndCB1bmxvY2sgdW50aWwgeW91IHNlbmQgYSB0cmFuc2FjdGlvblxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvd1snd2ViMyddICE9PSAndW5kZWZpbmVkJyAmJiAoIWxvY2FsU3RvcmFnZVsnbm9kZUlQJ10gfHwgdGhpcy5ub2RlSVAgPT09ICdNZXRhTWFzaycpKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VbJ25vZGVJUCddID0gdGhpcy5ub2RlSVA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVXNpbmcgaW5qZWN0ZWQgd2ViMycpO1xuICAgICAgICAgICAgdGhpcy53ZWIzID0gbmV3IHRoaXMuV2ViMyh3aW5kb3dbJ3dlYjMnXS5jdXJyZW50UHJvdmlkZXIpO1xuICAgICAgICAgICAgdGhpcy5ub2RlSVAgPSAnTWV0YU1hc2snO1xuICAgICAgICAgICAgdGhpcy5ub2RlQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudW5sb2NrZWRBY2NvdW50ID0gJ01ldGFNYXNrJztcbiAgICAgICAgICAgIHRoaXMudXBkYXRlLmVtaXQobnVsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VbJ25vZGVJUCddID0gdGhpcy5ub2RlSVA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVXNpbmcgSFRUUCBub2RlJyk7XG4gICAgICAgICAgICB0aGlzLnVubG9ja2VkQWNjb3VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMud2ViMyA9IG5ldyB0aGlzLldlYjMobmV3IHRoaXMuV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyKHRoaXMubm9kZUlQKSk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNvbm5lY3Rpb24odGhpcy53ZWIzLmlzQ29ubmVjdGVkKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkUXVlc3Rpb24odXJsOiBzdHJpbmcsIHNpdGU6IHN0cmluZywgaWQ6IHN0cmluZywgYW1vdW50OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHVybCAhPT0gJycgJiYgc2l0ZS5pbmRleE9mKCcvJykgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RlZCgpLnRoZW4oKGNvbm5lY3RlZCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViMy5ldGguY29udHJhY3QodGhpcy5BQkkpLmF0KHRoaXMuY29udHJhY3RBZGRyKS5oYW5kbGVRdWVzdGlvbihpZCwgc2l0ZSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogdGhpcy51bmxvY2tlZEFjY291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy53ZWIzLnRvV2VpKGFtb3VudCwgJ2V0aGVyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBnYXM6IDUwMDAwMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUuZW1pdChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRpbmcnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIEdlbmVyYWxseSB3aWxsIGJlIGFkZGVkIGFmdGVyIDI1IHNlY29uZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRyYWN0SW5zdGFuY2UgPSB0aGlzLndlYjMuZXRoLmNvbnRyYWN0KHRoaXMuQUJJKS5hdCh0aGlzLmNvbnRyYWN0QWRkcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUuZW1pdChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJhY3RJbnN0YW5jZS5RdWVzdGlvbkFkZGVkKChlcnJvciwgcmVzdWx0USkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXJyb3IgJiYgeiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHogKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUXVlc3Rpb24gYWRkZWQgYXQ6ICcgKyAgcmVzdWx0US5hcmdzLnF1ZXN0aW9uQWRkcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogUXVlc3Rpb24gbm90IGFkZGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwyNTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBpc0Nvbm5lY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZUNvbm5lY3RlZDtcbiAgICB9XG5cbiAgICBnZXQgd2ViMygpOiBhbnkge1xuICAgICAgICBpZiAoIXRoaXMud2ViM0luc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmludGlhbGl6ZVdlYjMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy53ZWIzSW5zdGFuY2U7XG4gICAgfVxuICAgIHNldCB3ZWIzKHdlYjM6IGFueSkge1xuICAgICAgICB0aGlzLndlYjNJbnN0YW5jZSA9IHdlYjM7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRBY2MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5sb2NrZWRBY2NvdW50O1xuICAgIH1cbiAgICBnZXQgY3VycmVudEFkZHIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJhY3RBZGRyO1xuICAgIH1cbiAgICBzZXQgY3VycmVudEFkZHIoY29udHJhY3RBZGRyOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGNvbnRyYWN0QWRkci5sZW5ndGggPT09IDQyIHx8IGNvbnRyYWN0QWRkci5sZW5ndGggPT09IDQwKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyYWN0QWRkciA9IGNvbnRyYWN0QWRkcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIGFkZHJlc3MgdXNlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBjdXJyZW50Tm9kZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlSVA7XG4gICAgfVxuICAgIHNldCBjdXJyZW50Tm9kZShub2RlSVA6IHN0cmluZykge1xuICAgICAgICB0aGlzLm5vZGVJUCA9IG5vZGVJUDtcbiAgICB9XG5cbiAgICBnZXQgV2ViMygpOiBhbnkge1xuICAgICAgICByZXR1cm4gd2luZG93WydXZWIzJ107XG4gICAgfVxuXG4gICAgZ2V0IGFkZGluZ1F1ZXN0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRpbmc7XG4gICAgfVxufVxuIl19
