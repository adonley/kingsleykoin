import { Injectable } from '@angular/core';
declare let Web3: any;
declare let web3: any;
const contract = require('truffle-contract');
const metacoinArtifacts = require('../../../build/contracts/Metacoin.json');
// const metaincoinArtifacts = require('../../build/contracts/MetaCoin.json');

@Injectable()
export class Web3Service {

  private web3: any;

  constructor() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      this.web3 = new Web3(web3.currentProvider);
      console.log("Using injected provider");
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      console.log("Using node on machine");
    }
  }

  public getWeb3Instance(): any {
    return this.web3;
  }

}
