// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    mapping(address => uint256) private _stakes;

    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }

    function stake(uint256 amount) public {
        require(amount > 0, "Cannot stake 0 tokens");
        _burn(msg.sender, amount);
        _stakes[msg.sender] += amount;
        emit Staked(msg.sender, amount);
    }

    function getStake(address account) public view returns (uint256) {
        return _stakes[account];
    }

    event Staked(address indexed user, uint256 amount);
}

