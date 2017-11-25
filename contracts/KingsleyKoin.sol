pragma solidity ^0.4.2;

import {SafeMath} from './math/SafeMath.sol';
import {PausableToken} from './token/PausableToken.sol';
import {Contactable} from './ownership/Contactable.sol';
import {HasNoContracts} from './ownership/HasNoContracts.sol';
import {HasNoEther} from './ownership/HasNoEther.sol';
import {Ownable} from './ownership/Ownable.sol';

contract KingsleyKoin is Ownable, Contactable, HasNoContracts, HasNoEther, PausableToken {
    using SafeMath for uint;

    uint256 public totalSupply;
    string public name;
    uint8 public decimals;
    string public symbol;

    uint256 public maxInt = 2**256 - 1;

    event Created(address indexed to, uint256 value, uint256 newBalance);
    event Destroyed(address indexed from, uint256 value, uint256 newBalance);

    function UnikoinSilver()
    {
        totalSupply = 10000;
        name = "KingsleyKoin";
        decimals = 18;
        symbol = "KEK";
    }

    ////
    // All the functions below wouldn't normally exist on a token.
    ////

    function createToOne(address _to, uint256 _amount)
    onlyOwner
    {
        // Make sure we're not wrapping around uint256 here.
        if(balances[_to] + _amount > _amount) {
            balances[_to] = maxInt;
            Created(_to, maxInt.sub(balances[_to]), balances[_to]);
        } else {
            balances[_to] = balances[_to].add(_amount);
            Created(_to, _amount, balances[_to]);
        }
    }

    function createToMany(address[] _addresses, uint256[] _amounts)
    onlyOwner
    {
        require(_addresses.length == _amounts.length);
        for (uint256 j = 0; j < _addresses.length; j++) {
            createToOne(_addresses[j], _amounts[j]);
        }
    }

    function destroyFromOne(address _from, uint256 _amount)
    onlyOwner
    {
        // Make sure we don't wrap around backwards here
        if(balances[_from] - _amount > balances[_from]) {
            Destroyed(_from, balances[_from], 0);
            balances[_from] = 0;
        } else {
            balances[_from] = balances[_from].sub(_amount);
            Destroyed(_from, _amount, balances[_from]);
        }
    }

    function destroyFromMany(address[] _addresses, uint256[] _amounts)
    onlyOwner
    {
        require(_addresses.length == _amounts.length);
        for (uint256 j = 0; j < _addresses.length; j++) {
            destroyFromOne(_addresses[j], _amounts[j]);
        }
    }

    function oneToOne(address _from, address _to, uint256 _amount)
    onlyOwner
    {
        if(_amount > balances[_from]) {
            _amount = balances[_from];
        }
        balances[_from] = balances[_from].sub(_amount);
        balances[_to] = balances[_to].add(_amount);
        Transfer(_from, _to, _amount);
    }

    function manyToOne(address[] _from, address _to, uint256[] _amounts)
    onlyOwner
    {
        require(_from.length == _amounts.length);
        for (uint256 j = 0; j < _from.length; j++) {
            oneToOne(_from[j], _to, _amounts[j]);
        }
    }

    function oneToMany(address _from, address[] _to, uint256[] _amounts)
    onlyOwner
    {
        require(_to.length == _amounts.length);
        for (uint256 j = 0; j < _to.length; j++) {
            oneToOne(_from, _to[j], _amounts[j]);
        }
    }
}
