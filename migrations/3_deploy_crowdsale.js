let SafeMath = artifacts.require("./math/SafeMath.sol");
let KingsleyKoin = artifacts.require("./KingsleyKoin.sol");

// Crowdsale
let Crowdsale = artifacts.require("./crowdsale/Crowdsale.sol");

module.exports = function (deployer, network, accounts) {
  deployer.link(SafeMath, [Crowdsale]);
  deployer.deploy(Crowdsale, 100000000000000000000, "0x3C4a4F32615c04Aa178926137745F5b005F37eaA");
};
