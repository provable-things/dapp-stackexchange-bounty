"use strict";
var Question = (function () {
    function Question(oraclizeQuestion, seQuestion, sponsors, totalBounty, index) {
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
        var items = seQuestion.items[0];
        this.title = items.title;
        this.body = items.body;
        this.link = items.link;
        this.owner = items.owner;
        var _a = this.setQuestionText(this.winnerAddr, this.expiryDate), text = _a[0], info = _a[1];
        this.text = text;
        this.info = info;
        this.sponsors = sponsors;
        this.totalBounty = totalBounty;
        this.index = index;
    }
    Question.prototype.setQuestionText = function (winnerAddr, expiryDate) {
        var now = new Date().getTime() / 1000;
        var text;
        var info;
        if (this.addressIsNone(winnerAddr) && now < expiryDate) {
            text = 'Expires:';
            info = new Date(expiryDate * 1000).toLocaleDateString();
        }
        else if (!this.addressIsNone(winnerAddr)) {
            text = 'Status:';
            info = 'Completed';
        }
        else {
            text = 'Status:';
            info = 'Expired';
        }
        return [text, info];
    };
    Question.prototype.addressIsNone = function (address) {
        return address === '0x0000000000000000000000000000000000000000';
    };
    return Question;
}());
exports.Question = Question;
