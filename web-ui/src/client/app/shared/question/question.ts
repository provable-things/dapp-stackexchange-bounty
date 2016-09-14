export class Question {
    contractAddr: string;
    site: string;
    questionID: string;
    winnerAddr: string;
    winnerID: string;
    acceptedAnswerID: string;
    updateDelay: string;
    expiryDate: number;
    ownedFee: string;
    exists: boolean;
    title: string;
    body: string;
    link: string;
    info: string;
    text: string;
    owner: any;
    sponsors: any[];
    totalBounty: number;
    index: number;

    constructor(oraclizeQuestion: any, seQuestion: any, sponsors: any[], totalBounty: number, index: number) {
        this.contractAddr = oraclizeQuestion[0];
        this.site = oraclizeQuestion[1];
        this.questionID = oraclizeQuestion[2];
        this.winnerAddr = oraclizeQuestion[3];
        this.winnerID = oraclizeQuestion[4];
        this.acceptedAnswerID = oraclizeQuestion[5];
        this.updateDelay = oraclizeQuestion[6];
        this.expiryDate = parseInt(oraclizeQuestion[7]);
        this.ownedFee = oraclizeQuestion[8];
        this.exists = seQuestion.items.length > 0;
        let items = seQuestion.items[0];
        this.title = items.title;
        this.body = items.body;
        this.link = items.link;
        this.owner = items.owner;
        let [text, info] = this.setQuestionText(this.winnerAddr, this.expiryDate);
        this.text = text;
        this.info = info;
        this.sponsors = sponsors;
        this.totalBounty = totalBounty;
        this.index = index;
    }

    setQuestionText(winnerAddr: string, expiryDate: number): string[] {
        let now = new Date().getTime()/1000;
        let text;
        let info;
        if (this.addressIsNone(winnerAddr) && now < expiryDate) {
            text = 'Expires:';
            info = new Date(expiryDate*1000).toLocaleDateString();
        } else if (!this.addressIsNone(winnerAddr)) {
            text = 'Status:';
            info = 'Completed';
        } else {
            text = 'Status:';
            info = 'Expired';
        }
        return [text, info];
    }

    addressIsNone(address: string): boolean {
        return address === '0x0000000000000000000000000000000000000000';
    }
}
