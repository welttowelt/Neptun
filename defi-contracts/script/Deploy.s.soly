// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/MyToken.sol";

contract DeployToken is Script {
    function run() external {
        uint256 initialSupply = 1_000_000 * 10 ** 18;
        vm.startBroadcast();
        new MyToken(initialSupply);
        vm.stopBroadcast();
    }
}

