// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract SimpleStorage {
    uint256 public value;

    event ValueChanged(uint256 newValue, address changedBy);

    constructor(uint256 initialValue) {
        value = initialValue;
    }

    function setValue(uint256 newValue) external {
        value = newValue;
        emit ValueChanged(newValue, msg.sender);
    }

    function getValue() external view returns (uint256) {
        return value; // comment
    }
}