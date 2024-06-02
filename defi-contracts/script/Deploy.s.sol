// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/MyToken.sol";

contract DeployToken is Script {
    function run() external {
        vm.startBroadcast();
        new MyToken(1000000 ether); // Initial supply
        vm.stopBroadcast();
    }
}

