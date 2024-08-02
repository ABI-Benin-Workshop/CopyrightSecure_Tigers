// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IWorkRegistration {
    enum WorkStatus {
        PENDING,
        APPROVED,
        REJECTED
  
    }
      struct WorkValidation {
      WorkStatus _status;
      string observation;
    }


    struct Work {
        // <--- Declare Work struct in the interface
  uint workId;
        address owner;
        string title;
        string description;
        uint amount;
        string createdAt;
        string lastUpdatedAt;
        WorkStatus status;
        WorkValidation [] validations;
        uint positiveReview;
        uint negativeReview;

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
       function getInternalWork(
        uint256 workId
    )
        external
        view
        returns (
            uint256 _workId,
            address _owner,
            string memory title,
            string memory description,
            string memory createdAt,
            WorkStatus status,
            uint256 positiveReview,
            uint256 negativeReview
        );

    function deleteWork(uint workId) external;

    function listWork() external;

    function updateWorkStatus(uint256 _workId) external;
    function getWorkStatus(uint256 _workId) external view returns (WorkStatus);
    function addWorkValidation(
        uint256 _workId,
        WorkStatus _status,
        string memory _observation
    ) external;

  function getWorkValidations(uint256 _workId) external view returns (WorkValidation[] memory); 
}
