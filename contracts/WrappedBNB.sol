// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWrappedBNB.sol";

/**
 * @title TestWrappedBNB
 */
contract TestWrappedBNB is ERC20, Ownable, ITestWrappedBNB {
    constructor() ERC20("Test Wrapped BNB", "tWBNB") {}

    /**
     * @dev Creates `amount` tokens and assigns them to `msg.sender`, increasing
     * the total supply.
     *
     * Requirements
     *
     * - `msg.sender` must be the token owner
     */
    function mint(
        uint256 amount,
        address receiver
    ) public onlyOwner returns (bool) {
        _mint(receiver, amount);
        return true;
    }

    /**
     * @dev Burn `amount` tokens and decreasing the total supply.
     */
    function burn(uint256 amount) public returns (bool) {
        _burn(_msgSender(), amount);
        return true;
    }
}
