// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IWorkRegistration {
    enum WorkStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    struct Work {
        // <--- Declare Work struct in the interface
        uint256 workId;
        address owner;
        string title;
        string description;
        uint256 amount;
        string createdAt;
        WorkStatus status;
    }

    function addWork(
        string memory title,
        string memory description,
        uint amount,
        string memory createdAt
    ) external;

    function getWork(
        uint workId
    )
        external
        payable
        returns (
            bool,
            uint _workId,
            address _owner,
            string memory title,
            string memory description,
            string memory createdAt,
            WorkStatus status
        );
    function getInternalWork(uint workId) external view  returns (
              uint _workId,
            address _owner,
            string memory title,
            string memory description,
            string memory createdAt,
            WorkStatus status
    );

    function deleteWork(uint workId) external;

    function listWork() external;

    function updateWorkStatus(uint256 _workId, WorkStatus _newStatus) external;
    function getWorkStatus(uint256 _workId) external view returns (WorkStatus);
}
