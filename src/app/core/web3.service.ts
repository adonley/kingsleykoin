import { Injectable } from '@angular/core';
import {default as Web3} from 'web3';
// const contract = require('truffle-contract');
declare let web3: any; // for metamask

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
    }
  }

  public getWeb3(): any {
    return this.web3;
  }

}
