// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/MyToken.sol";

contract MyTokenTest is Test {
    MyToken token;

    function setUp() public {
        token = new MyToken(1_000_000 * 10 ** 18);
    }

    function testTotalSupply() public {
        assertEq(token.totalSupply(), 1_000_000 * 10 ** 18);
    }

    function testBalanceOfOwner() public {
        assertEq(token.balanceOf(address(this)), 1_000_000 * 10 ** 18);
    }
}

