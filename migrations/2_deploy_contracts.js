// General Libs
let Math = artifacts.read("./math/Math.sol");
let SafeMath = artifacts.read("./math/SafeMath.sol");

// Ownership
let Ownable = artifacts.read("./ownership/Ownable.sol");
let HasNoContracts = artifacts.read("./ownership/HasNoContracts.sol");
let HasNoEther = artifacts.read("./ownership/HasNoEther.sol");
let Contactable = artifacts.read("./ownership/Contactable.sol");

// Token Imports
let BasicToken = artifacts.read("./token/BasicToken.sol");
let StandardToken = artifacts.read("./token/StandardToken.sol");
let PausableToken = artifacts.read("./token/PausableToken.sol");

// Lifecycle
let Pausable = artifacts.read("./lifecycle/Pausable.sol");

// Unikrn Specific
let KingsleyKoin = artifacts.require("./KingsleyKoin.sol");

// Crowdsale
let Crowdsale = artifacts.read("./crowdsale/Crowdsale.sol");
let CappedCrowdsale = artifacts.read("./crowdsale/CappedCrowdsale.sol");

module.exports = function(deployer, network, accounts) {
  // TODO: Ownable contracts with owner

  // Contracts with no deps
  deployer.deploy(Math);
  deployer.deploy(SafeMath);
  deployer.deploy(Pausable);

  // Link ownable
  deployer.deploy(Ownable);
  deployer.link(Ownable, [HasNoContracts, HasNoEther, Contactable]);

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

  deployer.link(HasNoContracts, KingsleyKoin);
  deployer.link(HasNoEther, KingsleyKoin);
  deployer.link(Contactable, KingsleyKoin);
  deployer.link(PausableToken, KingsleyKoin);
  deployer.deploy(KingsleyKoin);

  deployer.link(KingsleyKoin, Crowdsale);
  deployer.deploy(Crowdsale);

  deployer.link(CappedCrowdsale, Crowdsale);
  deployer.deploy(CappedCrowdsale);
};
