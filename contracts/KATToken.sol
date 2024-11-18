// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KATToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("KAT", "KAT") {
        _mint(msg.sender, initialSupply);
    }
}
// 0x5FbDB2315678afecb367f032d93F642f64180aa3