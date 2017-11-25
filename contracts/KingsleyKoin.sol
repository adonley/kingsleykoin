pragma solidity ^0.4.2;

import {SafeMath} from './math/SafeMath.sol';
import {PausableToken} from './token/PausableToken.sol';
import {MintableToken} from './token/MintableToken.sol';
import {Ownable} from './ownership/Ownable.sol';

contract KingsleyKoin is Ownable, PausableToken, MintableToken {
    using SafeMath for uint;

    uint256 public totalSupply;
    string public name;
    uint8 public decimals;
    string public symbol;

    uint256 public maxInt = 2**256 - 1;

    function KingsleyKoin()
    {
        totalSupply = 0;
        name = "KingsleyKoin";
        decimals = 18;
        symbol = "KEK";
    }
}
