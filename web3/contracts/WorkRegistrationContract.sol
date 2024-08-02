// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

contract WorkRegistrationContract {
    constructor() {}

    uint workCounter = 0;

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
    }

    mapping(uint => Work) public idToWork;

    function addWork(
        string memory title,
        string memory description,
        uint amount,
        string memory createdAt,
        string memory lastUpdatedAt
    ) public {
        idToWork[workCounter] = Work(
            workCounter,
            msg.sender,
            title,
            description,
            amount,
            createdAt,
            lastUpdatedAt,
            WorkStatus.PENDING
        );
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
            WorkStatus status
        )
    {
        Work memory work = idToWork[workId];
        return (
            work.workId,
            work.owner,
            work.title,
            work.description,
            work.createdAt,
            work.status
        );
    }

    function updateWork(
        uint workId,
        string memory title,
        string memory description,
        uint amount,
        string memory lastUpdatedAt
    ) public {
        require(idToWork[workId].amount != 0, "Work Art doesn't exist");
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

    function deleteWork(uint workId) public {
        require(idToWork[workId].amount != 0, "Work Art doesn't exist");
        require(
            idToWork[workId].owner == msg.sender,
            "You can't edit this work art"
        );
        Work storage work = idToWork[workId];
        work.status = WorkStatus.DELETED;
    }
}
