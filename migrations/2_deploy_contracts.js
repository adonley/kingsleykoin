// General Libs
let Math = artifacts.require("./math/Math.sol");
let SafeMath = artifacts.require("./math/SafeMath.sol");

// Ownership
let Ownable = artifacts.require("./ownership/Ownable.sol");

// Token Imports
let BasicToken = artifacts.require("./token/BasicToken.sol");
let StandardToken = artifacts.require("./token/StandardToken.sol");
let PausableToken = artifacts.require("./token/PausableToken.sol");
let MintableToken = artifacts.require("./token/MintableToken.sol");

// Lifecycle
let Pausable = artifacts.require("./lifecycle/Pausable.sol");

// Unikrn Specific
let KingsleyKoin = artifacts.require("./KingsleyKoin.sol");

module.exports = function(deployer, network, accounts) {
  // TODO: Ownable contracts with owner

  // Contracts with no deps
  deployer.deploy(Math);
  deployer.deploy(SafeMath);
  deployer.deploy(Pausable);

  // Link ownable
  deployer.deploy(Ownable);
  deployer.link(Ownable, [MintableToken]);

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

  deployer.link(PausableToken, KingsleyKoin);
  deployer.link(MintableToken, KingsleyKoin);
  deployer.deploy(KingsleyKoin);
};
