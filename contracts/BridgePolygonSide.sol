// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./interfaces/IWrappedBNB.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BridgePolygonSide is Ownable, ReentrancyGuard {
    event Minted(address indexed user, uint256 amount);
    event Burned(address indexed user, uint256 amount);

    ITestWrappedBNB public wrappedBNB;

    constructor(address _wrappedBNB) {
        wrappedBNB = ITestWrappedBNB(_wrappedBNB);
    }

    function mint(
        uint256 amount,
        address receiver
    ) public onlyOwner nonReentrant {
        require(amount > 0, "Invalid mint amount");
        wrappedBNB.mint(amount, receiver);
        emit Minted(_msgSender(), amount);
    }

    function burn(uint256 amount) public nonReentrant {
        require(amount > 0, "Invalid burn amount");
        wrappedBNB.transferFrom(_msgSender(), address(this), amount);
        wrappedBNB.burn(amount);
        emit Burned(_msgSender(), amount);
    }
}
