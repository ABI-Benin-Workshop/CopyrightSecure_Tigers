// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IWorkRegistration.sol";
import "./IRoyaltyManagment.sol";
import "./UserContract.sol";

contract RoyaltyManagementContract is IRoyaltyManagment {
    IWorkRegistration public workRegistration;
    UserContract public userContract;

    // Royalty percentage (e.g., 10% = 1000)
    uint256 public royaltyPercentage = 1000;
    // Price per usage unit in wei (e.g., 0.01 ether = 10**16 wei)
    uint256 public pricePerUsageUnit = 10 ** 16;

    mapping(uint256 => uint256) public workUsage; // Track usage of each work

    constructor(address _workRegistrationAddress, address _userContractAddress) {
        workRegistration = IWorkRegistration(_workRegistrationAddress);
        userContract = UserContract(_userContractAddress);
    }

    // Function to record the usage of a work
    function recordWorkUsage(uint256 _workId, uint256 _usageUnits) external {
        workUsage[_workId] += _usageUnits;
    }

    // Calculate royalties owed for a work
    function calculateRoyalties(
        uint256 _workId
    ) public view override returns (uint256) {
        // Get unpaid views directly from UserContract:
        uint256 viewsToPay = userContract
            .getWorkViewCounts(_workId)
            .viewsSinceLastPayout;
        uint256 totalRevenue = viewsToPay * pricePerUsageUnit;
        return (totalRevenue * royaltyPercentage) / 10000;
    }

    // Distribute royalties for a work to the creator
    function distributeRoyalties(uint256 _workId) public payable override {
        (, address creator, , , , ) = workRegistration.getInternalWork(_workId);
        uint256 royalties = calculateRoyalties(_workId);

        require(msg.value >= royalties, "Not enough funds to pay royalties");
        require(creator != address(0), "Invalid creator address"); // Added check

        (bool sent, ) = payable(creator).call{value: royalties}("");
        require(sent, "Failed to send royalties");

        // After successfully distributing, reset the view counter in UserContract:
        userContract.resetViewsSinceLastPayout(_workId);

        emit RoyaltiesPaid(_workId, creator, royalties);
    }
}
