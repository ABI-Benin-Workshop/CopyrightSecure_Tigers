// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import "./IWorkRegistration.sol";
import "./UserContract.sol";
contract WorkValidationContract {
     IWorkRegistration public  workRegistration;
     UserContract public userContract;
    constructor(address _registrationAddress, address _userContractAddress) {
        workRegistration = IWorkRegistration(_registrationAddress);
        userContract = UserContract(_userContractAddress); // Initialize userContract
    }
   
        modifier onlyValidator (address _validatorAddress, uint _workId){
  
      (,,address owner,,,,)  =  workRegistration.getWork(_workId);
      require(owner ==_validatorAddress, "You can't be a validator for this work");
      require(userContract.hasRole(_validatorAddress,UserContract.Role.VALIDATOR), "Only Validator can perform this action");

      _;
    }

    function validateWork(uint256 _workId) external onlyValidator(msg.sender, _workId) {
        // ... (Your logic to mark a work as validated)

        // Example: Update the work status in WorkRegistrationContract
        workRegistration.updateWorkStatus(_workId, IWorkRegistration.WorkStatus.APPROVED);
    } 
   
   function rejectWork(uint256 _workId) external onlyValidator(msg.sender, _workId) {
        // ... (Your logic to mark a work as validated)

        // Example: Update the work status in WorkRegistrationContract
        workRegistration.updateWorkStatus(_workId, IWorkRegistration.WorkStatus.REJECTED);
    } 

   function getWorkStatus(uint256 _workId) public view returns (IWorkRegistration.WorkStatus) {
        // Anyone can call this function (using "view")
        // Consider adding a check if you only want certain addresses to get the status
        return workRegistration.getWorkStatus(_workId); // Assuming getWorkStatus is in your IWorkRegistration
    }

}