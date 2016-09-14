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
var http_1 = require('@angular/http');
var index_1 = require('../question/index');
var index_2 = require('../web3/index');
var Rx_1 = require('rxjs/Rx');
var QuestionsService = (function () {
    function QuestionsService(web3Service, http) {
        this.web3Service = web3Service;
        this.http = http;
        this.update = new core_1.EventEmitter();
        this.key = 'HDX)Uk7cBWAecbA8AaCS)A((';
        this.questions = [];
        this.start = 0;
        this.sortType = 'Date';
        this.failed = 0;
        this.rate = 1;
    }
    QuestionsService.prototype.loadQuestions = function (start, end) {
        var _this = this;
        this.end = end;
        for (var i = start - 1; i >= end; i--) {
            this.fetchQuestion(i).then(function (question) {
                if (question) {
                    _this.pushQuestion(question);
                }
                else {
                    _this.loadQuestions(_this.end, _this.end - 1);
                }
            });
        }
    };
    QuestionsService.prototype.initialize = function () {
        var _this = this;
        this.getETHUSD().then(function (rate) {
            _this.rate = rate;
        });
        this.web3Service.getNumQuestions().then(function (numQuestions) {
            _this.numQuestions = numQuestions;
            console.log(numQuestions);
            var toFetch = (_this.numQuestions <= 5) ? _this.numQuestions : 5;
            toFetch = (typeof _this.end !== 'undefined') ? _this.end : _this.numQuestions - toFetch;
            _this.loadQuestions(_this.numQuestions, toFetch);
        });
    };
    QuestionsService.prototype.loadMore = function () {
        var toFetch = (this.end <= 5) ? this.end : 5;
        if (toFetch > 0) {
            this.loadQuestions(this.end, this.end - toFetch);
            return true;
        }
        return false;
    };
    QuestionsService.prototype.totalBounty = function (sponsors) {
        var total = 0;
        for (var i = 0; i < sponsors.length; i++) {
            total += sponsors[i].amount;
        }
        return total;
    };
    QuestionsService.prototype.fetchQuestion = function (index) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this.web3Service.getQuestion(index).then(function (rawQuestion) {
                rawQuestion = JSON.parse(JSON.stringify(rawQuestion));
                var id = rawQuestion[2];
                var site = rawQuestion[1];
                if (id !== 0 && site !== '') {
                    if (!_this.getQuestionFromCache(id, site)) {
                        _this.getQuestionFromApi(id, site).subscribe(function (data) {
                            var exists = data.items.length > 0;
                            if (exists) {
                                localStorage[id + '&&' + site] = JSON.stringify(data);
                                _this.getSponsors(index, rawQuestion[0]).then(function (sponsors) {
                                    var totalBounty = _this.totalBounty(sponsors);
                                    var question = new index_1.Question(rawQuestion, data, sponsors, totalBounty, index);
                                    resolve(question);
                                });
                            }
                        });
                    }
                }
                else {
                    _this.failed++;
                    resolve(false);
                }
            });
        });
        return p;
    };
    QuestionsService.prototype.extractData = function (response) {
        var body = response.json();
        return body || {};
    };
    QuestionsService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    QuestionsService.prototype.getQuestionFromApi = function (id, site) {
        var url = 'https://api.stackexchange.com/2.2/questions/' + id + '?site=' + site + '&key=' + this.key + '&filter=withbody';
        var stored = localStorage[id + '&&' + site];
        if (!stored) {
            return this.http.get(url)
                .map(this.extractData)
                .catch(this.handleError);
        }
        else {
            return Rx_1.Observable.of(stored).map(function (data) { return JSON.parse(data); });
        }
    };
    QuestionsService.prototype.getETHUSD = function () {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this.http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
                .map(_this.extractData)
                .catch(_this.handleError)
                .subscribe(function (data) {
                resolve(data.USD);
            });
        });
        return p;
    };
    QuestionsService.prototype.getQuestionFromCache = function (id, site) {
        var question;
        for (var i = 0; i < this.questions.length; i++) {
            if (this.questions[i].questionID === id && this.questions[i].site === site) {
                question = this.questions[i];
            }
        }
        return question;
    };
    QuestionsService.prototype.getQuestionBySiteId = function (id, site) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this.web3Service.getQuestionAddr(id, site).then(function (addr) {
                _this.web3Service.getQuestionIndex(addr).then(function (index) {
                    _this.fetchQuestion(index).then(function (question) {
                        resolve(question);
                    });
                });
            });
        });
        return p;
    };
    QuestionsService.prototype.getSponsors = function (index, questionAddr) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            _this.web3Service.getMainAddr(questionAddr).then(function (mainAddr) {
                _this.web3Service.getSponsorList(index, mainAddr).then(function (sponsorList) {
                    var sponsors = [];
                    sponsorList.forEach(function (sponsor) {
                        _this.web3Service.getSponsorBalance(index, sponsor, mainAddr).then(function (amount) {
                            sponsors.push({ address: sponsor, amount: _this.web3Service.weiToEth(amount) });
                            if (sponsors.length === sponsorList.length) {
                                resolve(sponsors);
                            }
                        });
                    });
                });
            });
        });
        return p;
    };
    QuestionsService.prototype.pushQuestion = function (question) {
        this.questions.push(question);
        this.sortQuestions();
        this.update.emit(null);
    };
    QuestionsService.prototype.addQuestion = function (url, amount) {
        var site = url.match('://(.*).stackexchange')[1];
        var id = url.match('stackexchange.com/questions/(.*)/')[1];
        return this.web3Service.addQuestion(url, site, id, amount);
    };
    QuestionsService.prototype.sortByDate = function () {
        this.questions.sort(function (a, b) {
            return b.expiryDate - a.expiryDate;
        });
    };
    QuestionsService.prototype.sortByBounty = function () {
        this.questions.sort(function (a, b) {
            return b.totalBounty - a.totalBounty;
        });
    };
    QuestionsService.prototype.sortQuestions = function () {
        if (this.sortType === 'Date') {
            this.sortByDate();
        }
        else if (this.sortType === 'Bounty') {
            this.sortByBounty();
        }
    };
    QuestionsService.prototype.toggleSort = function () {
        if (this.sortType === 'Date') {
            this.sortType = 'Bounty';
        }
        else if (this.sortType === 'Bounty') {
            this.sortType = 'Date';
        }
        this.sortQuestions();
    };
    Object.defineProperty(QuestionsService.prototype, "visibleQuestions", {
        get: function () {
            return this.questions.slice(this.start, this.numQuestions - this.end + 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionsService.prototype, "isReady", {
        get: function () {
            return (this.numQuestions - this.end) === this.questions.length + this.failed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionsService.prototype, "sortingMethod", {
        get: function () {
            var method;
            if (this.sortType === 'Date') {
                method = 'Bounty';
            }
            else if (this.sortType === 'Bounty') {
                method = 'Date';
            }
            return method;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], QuestionsService.prototype, "update", void 0);
    QuestionsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_2.Web3Service, http_1.Http])
    ], QuestionsService);
    return QuestionsService;
}());
exports.QuestionsService = QuestionsService;
