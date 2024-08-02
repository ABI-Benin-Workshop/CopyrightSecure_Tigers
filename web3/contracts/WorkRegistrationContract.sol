// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract WorkRegistrationContract {
    constructor() {}

    uint workCounter = 0;

    struct WorkValidation {
      WorkStatus _status;
      string observation;
    }

    enum WorkStatus {
        PENDING,
        APPROVED,
        REJECTED,
        DELETED
    }
    struct Work {
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

    mapping(uint => Work) public idToWork;

    function addWork(
    string memory title,
    string memory description,
    uint amount,
    string memory createdAt,
    string memory lastUpdatedAt
) public {
   Work storage newWork = idToWork[workCounter];
    newWork.workId = workCounter;
    newWork.owner = msg.sender;
    newWork.title = title;
    newWork.description = description;
    newWork.amount = amount;
    newWork.createdAt = createdAt;
    newWork.lastUpdatedAt = lastUpdatedAt;
    newWork.status = WorkStatus.PENDING;
    newWork.positiveReview = 0;
    newWork.negativeReview = 0;
    workCounter++;
}
    function getWork(
        uint workId
    )
        public
        payable
        returns (
            bool,
            uint _workId,
            address _owner,
            string memory title,
            string memory description,
            string memory createdAt,
            WorkStatus status
        )
    {
        Work memory work = idToWork[workId];
        require(bytes(work.title).length!=0,"Work doesn't exist");
        require(msg.value >= work.amount, "Not enough funds");
        (bool resp, ) = msg.sender.call{value: work.amount}("");

        return (
            resp,
            work.workId,
            work.owner,
            work.title,
            work.description,
            work.createdAt,
            work.status
        );
    }

    function getInternalWork(
        uint workId
    )
        public
        view
        returns (
            uint _workId,
            address _owner,
            string memory title,
            string memory description,
            string memory createdAt,
            WorkStatus status,
            uint positiveReview,
            uint negativeReview
        )
    {
        Work memory work = idToWork[workId];
        return (
            work.workId,
            work.owner,
            work.title,
            work.description,
            work.createdAt,
            work.status,
            work.positiveReview,
            work.negativeReview
        );
    }

    function updateWork(
        uint workId,
        string memory title,
        string memory description,
        uint amount,
        string memory lastUpdatedAt
    ) public {
           require(bytes( idToWork[workId].title).length!=0,"Work doesn't exist");
        require(
            idToWork[workId].owner == msg.sender,
            "You can't edit this work art"
        );
        Work storage work = idToWork[workId];
        work.title = title;
        work.description = description;
        work.amount = amount;
        work.lastUpdatedAt = lastUpdatedAt;
    }

      function listWork() public view returns (Work[] memory) {
        address owner = msg.sender;
        uint256 ownerWorkCount = 0;

        // First, count how many works the owner has
        for (uint256 i = 0; i < workCounter; i++) {
            if (idToWork[i].owner == owner) {
                ownerWorkCount++;
            }
        }

        // Create a dynamic array with the correct size
        Work[] memory ownerWorks = new Work[](ownerWorkCount);

        // Now populate the array with the owner's works
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < workCounter; i++) {
            if (idToWork[i].owner == owner) {
                ownerWorks[currentIndex] = idToWork[i];
                currentIndex++;
            }
        }
        return ownerWorks;
    }

    // Function to get the full Work struct by ID
    function getWorkById(uint256 _workId) public view returns (Work memory) {
        return idToWork[_workId];
    }

    function deleteWork(uint workId) public {
         require(bytes( idToWork[workId].title).length!=0,"Work doesn't exist");
        require(
            idToWork[workId].owner == msg.sender,
            "You can't edit this work art"
        );
        Work storage work = idToWork[workId];
        work.status = WorkStatus.DELETED;
    }

    function updateWorkStatus(uint256 _workId) external { 
        // Add authorization checks: Only callable by WorkValidationContract (or authorized addresses)
        Work storage work = idToWork[_workId];
        if(work.positiveReview> work.negativeReview ){
          work.status = WorkStatus.APPROVED;
        }else{
          work.status = WorkStatus.REJECTED;
        }
    }

     function getWorkStatus(uint256 _workId) public view returns (WorkStatus) { 
        return idToWork[_workId].status;
    }

  function addWorkValidation(
        uint256 _workId,
        WorkStatus _status,
        string memory _observation
    ) public {
        // Add authorization checks (example below):
        // require(msg.sender == address(workValidationContract), "Unauthorized");

       Work storage work = idToWork[_workId];
       WorkValidation memory newValidation = WorkValidation({
        _status: _status,
        observation: _observation
    });

    // Push the new validation onto the validations array
      work.validations.push(newValidation); 
        if (_status == WorkStatus.APPROVED) {
            work.positiveReview++;
        } else if (_status == WorkStatus.REJECTED) {
            work.negativeReview++;
        }
    }
    function getWorkValidations(uint256 _workId) public view returns (WorkValidation[] memory) {
    return idToWork[_workId].validations;
}
}
