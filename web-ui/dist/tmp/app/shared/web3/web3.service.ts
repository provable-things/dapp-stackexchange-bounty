import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class Web3Service {
    @Output() update = new EventEmitter();
    private contractAddr: string = '0xcebe9aa3b41a0b12d28ebcb7931fff0e0244165b'; // Current address if the user selects a custom
    private defaultNodeIP: string = 'https://eth3.augur.net';                    // Default node
    private nodeIP: string;                                                      // Current nodeIP
    private nodeConnected: boolean = true;                                       // If we've established a connection yet
    private adding: boolean = false;                                             // If we're adding a question
    private web3Instance: any;                                                   // Current instance of web3
    private unlockedAccount: string;                                             // Current unlocked account

    // Application Binary Interface so we can use the question contract
    private ABI  = [{'constant':false,'inputs':[{'name':'queryID','type':'bytes32'},{'name':'result','type':'string'}],'name':'__callback','outputs':[],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'uint256'}],'name':'questions','outputs':[{'name':'contractAddress','type':'address'},{'name':'site','type':'string'},{'name':'questionID','type':'uint256'},{'name':'winnerAddress','type':'address'},{'name':'winnerID','type':'uint256'},{'name':'acceptedAnswerID','type':'uint256'},{'name':'updateDelay','type':'uint256'},{'name':'expiryDate','type':'uint256'},{'name':'ownedFee','type':'uint256'}],'type':'function'},{'constant':false,'inputs':[],'name':'kill','outputs':[],'type':'function'},{'constant':true,'inputs':[{'name':'_i','type':'uint256'},{'name':'_sponsorAddr','type':'address'}],'name':'getSponsorBalance','outputs':[{'name':'sponsorBalance','type':'uint256'}],'type':'function'},{'constant':false,'inputs':[{'name':'_questionID','type':'uint256'},{'name':'_site','type':'string'}],'name':'handleQuestion','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_i','type':'uint256'}],'name':'increaseBounty','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'contractBalance','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[{'name':'_questionID','type':'uint256'},{'name':'_site','type':'string'}],'name':'getAddressOfQuestion','outputs':[{'name':'questionAddr','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'_i','type':'uint256'}],'name':'getSponsors','outputs':[{'name':'sponsorList','type':'address[]'}],'type':'function'},{'inputs':[],'type':'constructor'},{'anonymous':false,'inputs':[{'indexed':false,'name':'questionAddr','type':'address'}],'name':'QuestionAdded','type':'event'},{'anonymous':false,'inputs':[],'name':'BountyIncreased','type':'event'},{'anonymous':false,'inputs':[],'name':'BountyPaid','type':'event'}];

    intializeWeb3(): void {
        this.nodeIP = localStorage['nodeIP'] || this.defaultNodeIP;
        this.connectToNode(); // Connect to whatever's available
    }

    // Contract get functions *MUST* be async to accomodate MetaMask
    getNumQuestions(): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
            this.web3.eth.getStorageAt('0xcebe9aa3b41a0b12d28ebcb7931fff0e0244165b', 3, (error, result) => {
                console.log(this.web3.toDecimal(result));
                if (!error) {
                    resolve(this.web3.toDecimal(result));
                } else {
                    reject(error);
                }
            });
        });

        return p;
    }

    getQuestion(index: number): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
            this.web3.eth.contract(this.ABI).at(this.contractAddr).questions(index, (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });

        return p;
    }

    getQuestionIndex(questionAddr: string): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
            this.web3.toDecimal(this.web3.eth.getStorageAt(questionAddr, 3, (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }));
        });

        return p;
    }

    getQuestionAddr(id: string, site: string): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
            this.web3.eth.contract(this.ABI).at(this.contractAddr).getAddressOfQuestion(id, site, (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });

        return p;
    }

    getSponsorList(index: number, contractAddr: string): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
            this.web3.eth.contract(this.ABI).at(contractAddr).getSponsors(index, (error, result) => {
                if (!error) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    reject(error);
                }
            });
        });

        return p;
    }

    getSponsorBalance(index: number, sponsor: string, contractAddr: string): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
            this.web3.eth.contract(this.ABI).at(contractAddr).getSponsorBalance(index, sponsor, (error, result) => {
                if (!error) {
                    resolve(this.web3.toDecimal(result));
                } else {
                    reject(error);
                }
            });
        });

        return p;
    }

    getMainAddr(questionAddr: string): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
            this.web3.eth.getStorageAt(questionAddr, 0, (error, result) => {
                if (!error) {
                    resolve(result.replace('0x000000000000000000000000',''));
                } else {
                    console.error(error);
                }
            });
        });

        return p;
    }

    weiToEth(wei: number): number {
        return parseFloat(this.web3.fromWei(wei, 'ether'));
    }

    connected(): Promise<any> {
        let p = new Promise<any>((resolve, reject) => {
            if (this.nodeIP !== 'MetaMask') {
                this.web3.eth.sendTransaction({from: this.web3.eth.accounts[0], to: this.web3.eth.accounts[0], value: 0, gas: 0, gasPrice: 0 },
                    (err, res) => {;
                        if (err.toString() !== 'Error: account is locked') {
                            this.unlockedAccount = this.web3.eth.accounts[0];
                            this.update.emit(null);
                            console.log('Connected to account: ' + this.unlockedAccount);
                            resolve(true);
                        } else {
                            console.log('Error: Could not find an unlocked account');
                            resolve(false);
                        }
                    }
                );
            } else {
                this.unlockedAccount = this.web3.eth.accounts[0];
                console.log('Connected to account: ' + this.unlockedAccount);
                resolve(false);
            }
        });
        return p;
    }

    handleConnection(connect: boolean): void {
        if (connect) {
            this.connected();
        } else {
            this.nodeIP = this.defaultNodeIP;
            this.connectToNode();
        }
        this.nodeConnected = connect;
    }

    connectToNode(): void { // Don't unlock until you send a transaction
        if (typeof window['web3'] !== 'undefined' && (!localStorage['nodeIP'] || this.nodeIP === 'MetaMask')) {
            localStorage['nodeIP'] = this.nodeIP;
            console.log('Using injected web3');
            this.web3 = new this.Web3(window['web3'].currentProvider);
            this.nodeIP = 'MetaMask';
            this.nodeConnected = true;
            this.unlockedAccount = 'MetaMask';
            this.update.emit(null);
        } else {
            localStorage['nodeIP'] = this.nodeIP;
            console.log('Using HTTP node');
            this.unlockedAccount = undefined;
            this.web3 = new this.Web3(new this.Web3.providers.HttpProvider(this.nodeIP));
            this.handleConnection(this.web3.isConnected());
        }
    }

    addQuestion(url: string, site: string, id: string, amount: number): boolean {
        if (url !== '' && site.indexOf('/') === -1) {
            this.connected().then((connected) => {
                this.web3.eth.contract(this.ABI).at(this.contractAddr).handleQuestion(id, site,
                    {
                        from: this.unlockedAccount,
                        value: this.web3.toWei(amount, 'ether'),
                        gas: 500000
                    },
                    (error, result) => {
                        this.adding = true;
                        this.update.emit(null);
                        if (error) {
                            console.log(error);
                        }
                        console.log('adding', result);
                        setTimeout(() => { // Generally will be added after 25 seconds
                                let contractInstance = this.web3.eth.contract(this.ABI).at(this.contractAddr);
                                let z = 0;
                                this.adding = false;
                                this.update.emit(null);
                                contractInstance.QuestionAdded((error, resultQ) => {
                                    console.log(result);
                                    if (!error && z === 0) {
                                        z += 1;
                                        console.log('Question added at: ' +  resultQ.args.questionAddr);
                                    } else {
                                        console.log('Error: Question not added');
                                    }
                                });
                        },25000);
                    }
                );
                return true;
            });
        }
        return false;
    }

    get isConnected(): boolean {
        return this.nodeConnected;
    }

    get web3(): any {
        if (!this.web3Instance) {
            this.intializeWeb3();
        }
        return this.web3Instance;
    }
    set web3(web3: any) {
        this.web3Instance = web3;
    }

    get currentAcc(): string {
        return this.unlockedAccount;
    }
    get currentAddr(): string {
        return this.contractAddr;
    }
    set currentAddr(contractAddr: string) {
        if (contractAddr.length === 42 || contractAddr.length === 40) {
            this.contractAddr = contractAddr;
        } else {
            console.log('Invalid address used');
        }
    }
    get currentNode(): string {
        return this.nodeIP;
    }
    set currentNode(nodeIP: string) {
        this.nodeIP = nodeIP;
    }

    get Web3(): any {
        return window['Web3'];
    }

    get addingQuestion(): boolean {
        return this.adding;
    }
}
