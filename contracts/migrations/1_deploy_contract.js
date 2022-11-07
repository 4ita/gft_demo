var GFTContract = artifacts.require("GreenFoodToken");

module.exports = function(deployer) {
  deployer.deploy(GFTContract);
};
