// General Libs
let Math = artifacts.require("./math/Math.sol");
let SafeMath = artifacts.require("./math/SafeMath.sol");

// Ownership
let Ownable = artifacts.require("./ownership/Ownable.sol");
let HasNoContracts = artifacts.require("./ownership/HasNoContracts.sol");
let HasNoEther = artifacts.require("./ownership/HasNoEther.sol");
let Contactable = artifacts.require("./ownership/Contactable.sol");

// Token Imports
let BasicToken = artifacts.require("./token/BasicToken.sol");
let StandardToken = artifacts.require("./token/StandardToken.sol");
let PausableToken = artifacts.require("./token/PausableToken.sol");
let MintableToken = artifacts.require("./token/MintableToken.sol");

// Lifecycle
let Pausable = artifacts.require("./lifecycle/Pausable.sol");

// Unikrn Specific
let KingsleyKoin = artifacts.require("./KingsleyKoin.sol");

// Crowdsale
let Crowdsale = artifacts.require("./crowdsale/Crowdsale.sol");
let CappedCrowdsale = artifacts.require("./crowdsale/CappedCrowdsale.sol");

module.exports = function(deployer, network, accounts) {
  // TODO: Ownable contracts with owner

  // Contracts with no deps
  deployer.deploy(Math);
  deployer.deploy(SafeMath);
  deployer.deploy(Pausable);

  // Link ownable
  deployer.deploy(Ownable);
  deployer.link(Ownable, [HasNoContracts, HasNoEther, Contactable, MintableToken]);

  // Deploy contracts with no other deps besides ownable
  deployer.deploy(HasNoContracts);
  deployer.deploy(HasNoEther);
  deployer.deploy(Contactable);

  // Link safemath contracts
  deployer.link(SafeMath, [BasicToken, KingsleyKoin]);

  deployer.deploy(BasicToken);

  deployer.link(BasicToken, StandardToken);
  deployer.deploy(StandardToken);

  deployer.link(StandardToken, PausableToken);
  deployer.link(Pausable, PausableToken);
  deployer.deploy(PausableToken);

  deployer.link(StandardToken, MintableToken);
  deployer.deploy(MintableToken);

  deployer.link(HasNoContracts, KingsleyKoin);
  deployer.link(HasNoEther, KingsleyKoin);
  deployer.link(Contactable, KingsleyKoin);
  deployer.link(PausableToken, KingsleyKoin);
  deployer.link(MintableToken, KingsleyKoin);
  deployer.deploy(KingsleyKoin);

  deployer.deploy([Crowdsale, 0.004, "0x3C4a4F32615c04Aa178926137745F5b005F37eaA"]);

  deployer.link(CappedCrowdsale, Crowdsale);
  deployer.deploy([CappedCrowdsale, 1000]);
};
