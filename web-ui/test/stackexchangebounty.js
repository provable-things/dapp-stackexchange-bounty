contract('StackExchangeBounty', function(accounts) {
    var id2 = 8240;
    var id = 1286;
    var site = "ethereum"
    var fakeSite = "notasite"
    var acc = web3.eth.accounts[5];
    var acc2 = web3.eth.accounts[6];
    var payee = web3.eth.accounts[7];
    var value = web3.toWei(2, "ether");
    it("should handle questions correctly", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Adding a new question");
        console.log("Balance before submission: " + web3.eth.getBalance(acc).toNumber());
        se.handleQuestion(
            id,
            site,
            {
                from: acc,
                value: value
            }
        ).then(function() {
            console.log("Checking every second...");
            var x = 0;
            var interval = setInterval(function() {
                se.questions(0).then(function(question) {
                    x++;
                    console.log("CHECK #" + x + ": " + (question[1] !== "" ? "SUCCESS" : "FAIL"));
                    var qSite = question[1];
                    var qId = question[2].toNumber();
                    if (qSite !== "" && qId !== 0) {
                        assert.equal(qSite, site, "Site was added correctly");
                        assert.equal(qId, id, "ID was added correctly");
                        console.log("Balance after submission: " + web3.eth.getBalance(acc).toNumber());
                        clearInterval(interval);
                        done();
                    } else if (x > 25) {
                        console.log("Question creation timed out");
                        assert.equal(qSite, site, "Site was added correctly");
                        assert.equal(qId, id, "ID was added correctly");
                        clearInterval(interval);
                        done();
                    }
                });
            }, 1000);
        })
    });
    it("should handle more questions", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Adding a second question");
        console.log("Balance before submission: " + web3.eth.getBalance(acc).toNumber());
        se.handleQuestion(
            id2, 
            site,
            {
                from: acc,
                value: value    
            }
        ).then(function() {
            console.log("Checking every second...");
            var x = 0;
            var interval = setInterval(function() {
                se.questions(1).then(function(question) {
                    x++;
                    console.log("CHECK #" + x + ": " + (question[1] !== "" ? "SUCCESS" : "FAIL"));
                    var qSite = question[1];
                    var qId = question[2].toNumber();
                    if (qSite !== "" && qId !== 0) {
                        assert.equal(qSite, site, "Site was added correctly");
                        assert.equal(qId, id2, "ID was added correctly");
                        console.log("Balance after submission: " + web3.eth.getBalance(acc).toNumber());
                        clearInterval(interval);
                        done();
                    } else if (x > 25) {
                        console.log("Question creation timed out");
                        assert.equal(qSite, site, "Site was added correctly");
                        assert.equal(qId, id, "ID was added correctly");
                        clearInterval(interval);
                        done();
                    }
                });
            }, 1000);
        });
    });
    it("should get the sponsors of a question", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Getting the sponsors of a question");
        se.getSponsors(0).then(function(sponsors) {
            console.log("First sponsor: " + sponsors[0]);
            assert.equal(sponsors[0], acc, "First sponsor found");
            done();
        });
    })
    it("should handle duplicates", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Adding a duplicate");
        se.handleQuestion(
            id2, 
            site,
            {
                from: acc2,
                value: value    
            }
        ).then(function() {
            se.getSponsors(1).then(function(sponsors) {
                console.log("Second sponsor added: " + sponsors[1]);
                assert.equal(sponsors[1], acc2, "Duplicate handled correctly");
                done();
            });
        });
    });
    it("should handle incorrect questions", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Adding a non-existant question");
        var oldBalance = web3.eth.getBalance(acc).toNumber();
        console.log("Balance before submission: " + oldBalance);
        se.handleQuestion(
            id2, 
            fakeSite,
            {
                from: acc,
                value: value    
            }
        ).then(function() {
            console.log("Checking every second...");
            var x = 0;
            var interval = setInterval(function() {
                se.questions(2).then(function(question) {
                    x++;
                    console.log("CHECK #" + x + ": " + (question[1] !== "" ? "SUCCESS" : "FAIL"));
                    var qSite = question[1];
                    var qId = question[2].toNumber();
                    if (qSite !== "" && qId !== 0) {
                        assert.equal(1, 0, "Fake site should not have been real");
                        clearInterval(interval);
                        done();
                    } else if (x > 25) {
                        clearInterval(interval);
                        console.log("Question creation timed out, refunding balance");
                        var newBalance = web3.eth.getBalance(acc).toNumber();
                        console.log("Balance after submission: " + newBalance);
                        assert.isAbove(value, oldBalance-newBalance, "Question was refunded successfully");
                        done();
                    }
                });
            }, 1000);
        });
    });
    it("should get the address of a question", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Getting the address of a question");
        var contractAddr;
        se.questions(0).then(function(question) {
            contractAddr = question[0];
            se.getAddressOfQuestion(id, site).then(function(addr) {
                console.log("Contract Address: " + contractAddr)
                console.log("Returned Address: " + addr);
                assert.equal(contractAddr, addr, "Question address is correct");
                done();
            })
        });
    })
    it("should be able to accept more sponsors", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Accepting more sponsors for a question");
        se.increaseBounty(
            0,
            {
                from: acc2,
                value: value
            }
        ).then(function() {
            se.getSponsors(0).then(function(sponsors) {
                console.log("Second sponsor: " + sponsors[1]);
                assert.equal(sponsors[1], acc2, "Second sponsor added");
                done();
            });
        });
    })
    it("should get the balance of a sponsor", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Getting the balance of a sponsor");
        se.getSponsorBalance(0, acc).then(function(balance) {
            console.log("Balance: " + balance.toNumber());
            assert.equal(balance.toNumber(), value, "Got balance correctly");
            done();
        });
    })
    it("should refund to every sponsor correctly, minus a fee", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Refunding the sponsors of an unanswered question");
        var oldBalance1 = web3.eth.getBalance(acc).toNumber();
        console.log("Before payout: " + oldBalance1);
        var oldBalance2 = web3.eth.getBalance(acc2).toNumber();
        console.log("Before payout: " + oldBalance2);
        se.setWinner(0, 0, 0, payee).then(function() {
            se.fullfillContractEarly(0).then(function() {
                var newBalance1 = web3.eth.getBalance(acc).toNumber();
                console.log("Before payout: " + newBalance1);
                var newBalance2 = web3.eth.getBalance(acc2).toNumber();
                console.log("Before payout: " + newBalance2);
                assert.isAbove(value, newBalance1-oldBalance1, "Question was refunded successfully");
                assert.isAbove(value, newBalance2-oldBalance2, "Question was refunded successfully");
                done();
            });
        });
    })
    it("should pay out the second question correctly, minus a fee", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Paying out an answered question");
        var oldBalance = web3.eth.getBalance(payee).toNumber();
        console.log("Before payout: " + oldBalance);
        se.setWinner(1, 1, 1, payee).then(function() {
            se.fullfillContractEarly(1).then(function() {
                var newBalance = web3.eth.getBalance(payee).toNumber();
                console.log("After payout: " + newBalance);
                assert.isAbove(newBalance, oldBalance, "Payout was successful");
                done();
            });
        });
    })
    it("should allow valid answerIDs", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Using valid (numeric) answerID");
        se.setQuery("0x1111111111111117145a5312fbf543b58991d3df5cb22c69199f27b2d3ec2fd0", "somesite", 1, 999, 2).then(function() {
            var answerID = "1234";
            console.log("Using answerID: " + answerID);
            se.__callback("0x1111111111111117145a5312fbf543b58991d3df5cb22c69199f27b2d3ec2fd0", answerID);
            se.questions(999).then(function(question) {
                assert.equal(question[4].toString(), answerID, "AnswerID set");
                done();
            })
        });
    })
    it("should not allow invalid answerIDs", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Using invalid (non-numeric) answerID");
        se.setQuery("0x1111111111111117145a5312fbf543b58991d3df5cb22c69199f27b2d3ec2fd0", "somesite", 1, 1000, 2).then(function() {
            var answerID = "notandid";
            console.log("Using answerID: " + answerID);
            se.__callback("0x1111111111111117145a5312fbf543b58991d3df5cb22c69199f27b2d3ec2fd0", answerID);
            se.questions(1000).then(function(question) {
                console.log(question);
                assert.equal(question[4].toString(), "0", "AnswerID was not set");
                done();
            })
        });
    })
    it("should not allow invalid winner addresses", function(done) {
        var se = StackExchangeBounty.deployed();
        console.log("TEST: Using invalid (non-address) winner address");
        se.setQuery("0x1111111111111117145a5312fbf543b58991d3df5cb22c69199f27b2d3ec2fd0", "somesite", 1, 1001, 3).then(function() {
            var address = "notanaddr";
            console.log("Using address: " + address);
            se.__callback("0x1111111111111117145a5312fbf543b58991d3df5cb22c69199f27b2d3ec2fd0", address);
            se.questions(1001).then(function(question) {
                assert.equal(question[3].toString(), "0x0000000000000000000000000000000000000000", "Address not set");
                done();
            })
        });
    })
    // should throw when we have a bad call   
});
    