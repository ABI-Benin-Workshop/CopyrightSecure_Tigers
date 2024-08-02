// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IRoyaltyManagment {
    // Event emitted when royalties are paid
    event RoyaltiesPaid(
        uint256 indexed workId, 
        address creator, 
        uint256 amount
    ); 

    // Function to record the usage of a work
    // You'll need to define how you want to track "usage" (e.g., downloads, views, etc.)
    function recordWorkUsage(uint256 _workId, uint256 _usageUnits) external; 

    // Function to calculate the royalties due for a work 
    function calculateRoyalties(uint256 _workId) external view returns (uint256);

    // Function to distribute royalties for a work to its creator
    function distributeRoyalties(uint256 _workId) external payable;
}