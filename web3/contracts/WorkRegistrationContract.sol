// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

contract WorkRegistrationContract {
  constructor() {
    
  }

uint workCounter = 0;

enum WorkStatus{
  PENDING, APPROVED,REJECTED
}
  struct Work {
    uint workId;
    address owner;
    string title;
    string description;
    uint amount;
    string createdAt;
    WorkStatus status ;
  }

  mapping(uint=>Work) public idToWork;

  function addWork(
    string memory title,
    string memory description,
    uint amount,
    string memory createdAt
  )public {
    idToWork[workCounter] = Work(workCounter,msg.sender, title, description, amount,createdAt, WorkStatus.PENDING);
    workCounter++;
  }

  function getWork(uint workId) public payable returns(bool, 
    uint _workId,
    address _owner,
    string memory title,
    string memory description,
    string memory createdAt,
    WorkStatus status 
  ){
    Work memory work= idToWork[workId];
    require(msg.value>=work.amount, "Not enough funds");
    (bool resp, ) = msg.sender.call{value: work.amount}("");
    
    return (resp, work.workId, work.owner, work.title, work.description, work.createdAt,work.status );
  }

}