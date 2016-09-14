import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Question } from '../question/index';
import { Web3Service } from '../web3/index';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class QuestionsService {
    @Output() update = new EventEmitter();    // For when we need to force a refresh with ChangeDetectorRef
    private key = 'HDX)Uk7cBWAecbA8AaCS)A(('; // Our SE API key (move this out later)
    private questions: Question[] = [];       // List of question objects to display
    private start = 0;                        // Where to start our queries in our list
    private end;                              // Where to end our queries
    private sortType: string = 'Date';        // Type of sort to perform
    private numQuestions: number;             // Total questions
    private failed: number = 0;               // Number of failed questions
    private rate = 1;                         // USD per ETH rate

    constructor(private web3Service: Web3Service, private http: Http) { }

    loadQuestions(start: number, end: number): void {
        this.end = end;
        for (let i = start - 1; i >= end; i--) { // Fetching backwards to get the most recent questions
            this.fetchQuestion(i).then((question) => {
                if (question) {
                    this.pushQuestion(question);
                } else {
                    this.loadQuestions(this.end, this.end - 1);
                }
            });
        }
    }

    initialize(): void {
        this.getETHUSD().then((rate) => {
            this.rate = rate;
        });
        this.web3Service.getNumQuestions().then((numQuestions) => {
            this.numQuestions = numQuestions;
            console.log(numQuestions);
            let toFetch = (this.numQuestions <= 5) ? this.numQuestions : 5;
            toFetch = (typeof this.end !== 'undefined') ? this.end : this.numQuestions - toFetch; // Either fetch to the end or fetch what we said we would
            this.loadQuestions(this.numQuestions, toFetch);
        });
    }

    loadMore(): boolean {
        let toFetch = (this.end <= 5) ? this.end : 5; // Only want to fetch a max of 5 questions
        if (toFetch > 0) {
            this.loadQuestions(this.end, this.end - toFetch);
            return true;
        }
        return false; // Nothing left to fetch
    }

    totalBounty(sponsors: any[]): number {
        let total = 0;
        for (let i = 0; i < sponsors.length; i++) {
            total += sponsors[i].amount;
        }
        return total;
    }

    fetchQuestion(index: number): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
            this.web3Service.getQuestion(index).then((rawQuestion) => {
                rawQuestion = JSON.parse(JSON.stringify(rawQuestion));
                let id = rawQuestion[2];
                let site = rawQuestion[1];
                if (id !== 0 && site !== '') {
                    if (!this.getQuestionFromCache(id, site)) {
                        this.getQuestionFromApi(id, site).subscribe((data) => {
                            let exists = data.items.length > 0; // Decides if the question exists or was deleted after being submitted
                            if (exists) {
                                localStorage[id + '&&' + site] = JSON.stringify(data);
                                this.getSponsors(index, rawQuestion[0]).then((sponsors) => {
                                    let totalBounty = this.totalBounty(sponsors);
                                    let question = new Question(rawQuestion, data, sponsors, totalBounty, index);
                                    resolve(question);
                                });
                            }
                        });
                    }
                } else {
                    this.failed++;
                    resolve(false);
                }
            });
        });
        return p;
    }

    extractData(response: Response): any {
        let body = response.json();
        return body || {};
    }

    handleError(error: any): any {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg);
        return Observable.throw(errMsg);
    }

    getQuestionFromApi(id, site): Observable<any> {
        let url = 'https://api.stackexchange.com/2.2/questions/' + id + '?site=' + site + '&key=' + this.key + '&filter=withbody';
        let stored = localStorage[id + '&&' + site]; // id&&site here is just a format to search localStorage
        if (!stored) {
            return this.http.get(url)
                            .map(this.extractData)
                            .catch(this.handleError);
        } else {
            return Observable.of(stored).map(data => JSON.parse(data));
        }
    }

    getETHUSD(): Promise<any> {
        var p = new Promise<any>((resolve,reject) => {
            this.http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
                      .map(this.extractData)
                      .catch(this.handleError)
                      .subscribe((data: any) => {
                          resolve(data.USD);
                      });
        });

        return p;
    }

    getQuestionFromCache(id: string, site: string): Question {
        let question;
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].questionID === id && this.questions[i].site === site) {
                question = this.questions[i];
            }
        }

        return question;
    }

    getQuestionBySiteId(id: string, site: string): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
            this.web3Service.getQuestionAddr(id, site).then((addr) => {
                this.web3Service.getQuestionIndex(addr).then((index) => {
                    this.fetchQuestion(index).then((question) => {
                        resolve(question);
                    });
                });
            });
        });

        return p;
    }

    getSponsors(index: number, questionAddr: string): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
            this.web3Service.getMainAddr(questionAddr).then((mainAddr) => {
                this.web3Service.getSponsorList(index, mainAddr).then((sponsorList) => {
                    let sponsors = [];
                    sponsorList.forEach((sponsor) => { // forEach to ensure async doesn't break things
                        this.web3Service.getSponsorBalance(index, sponsor, mainAddr).then((amount) => {
                            sponsors.push({address: sponsor, amount: this.web3Service.weiToEth(amount)});
                            if (sponsors.length === sponsorList.length) {
                                resolve(sponsors);
                            }
                        });
                    });
                });
            });
        });

        return p;
    }

    pushQuestion(question: Question): void {
        this.questions.push(question);
        this.sortQuestions();
        this.update.emit(null);
    }

    addQuestion(url: string, amount: number): boolean {
        let site = url.match('://(.*).stackexchange')[1];
        let id = url.match('stackexchange.com/questions/(.*)/')[1];
        return this.web3Service.addQuestion(url, site, id, amount);
    }

    sortByDate(): void {
        this.questions.sort((a, b) => {
            return b.expiryDate - a.expiryDate;
        });
    }

    sortByBounty(): void {
        this.questions.sort((a, b) => {
            return b.totalBounty - a.totalBounty;
        });
    }

    sortQuestions(): void {
        if (this.sortType === 'Date') {
            this.sortByDate();
        } else if (this.sortType === 'Bounty') {
            this.sortByBounty();
        }
    }

    toggleSort(): void {
        if (this.sortType === 'Date') {
            this.sortType = 'Bounty';
        } else if (this.sortType === 'Bounty') {
            this.sortType = 'Date';
        }
        this.sortQuestions();
    }

    get visibleQuestions(): Question[] {
        return this.questions.slice(this.start, this.numQuestions - this.end + 1);
    }

    get isReady(): boolean {
        return (this.numQuestions - this.end) === this.questions.length + this.failed; // Have we loaded everything we said we would?
    }

    get sortingMethod(): string {
        let method;
        if (this.sortType === 'Date') {
            method = 'Bounty';
        } else if (this.sortType === 'Bounty') {
            method = 'Date';
        }
        return method;
    }
}
