// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract BridgeBNBSide is Ownable, ReentrancyGuard {
    using Address for address payable;

    event Locked(address indexed user, uint256 amount);
    event Released(address indexed user, uint256 amount);

    constructor() {}

    function lock() public payable {
        require(msg.value > 0, "Invalid mint amount");
        emit Locked(_msgSender(), msg.value);
    }

    function release(uint256 amount) public onlyOwner nonReentrant {
        require(amount > 0, "Invalid release amount");
        require(address(this).balance >= amount, "Insufficient balance");
        payable(_msgSender()).transfer(amount);
        emit Released(_msgSender(), amount);
    }
}
