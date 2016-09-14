module.exports = function(deployer) {
  deployer.deploy(StackExchangeBounty);
  deployer.deploy(usingOraclize);
  deployer.deploy(Test);
};
