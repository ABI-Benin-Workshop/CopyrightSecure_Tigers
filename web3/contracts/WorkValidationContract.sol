// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IWorkRegistration.sol";
import "./UserContract.sol";
import "./WorkRegistrationContract.sol";

contract WorkValidationContract {
    IWorkRegistration public workRegistration;
    UserContract public userContract;

    constructor(address _registrationAddress, address _userContractAddress) {
        workRegistration = IWorkRegistration(_registrationAddress);
        userContract = UserContract(_userContractAddress); // Initialize userContract
    }

    modifier onlyValidator(address _validatorAddress, uint256 _workId) {
        (, address owner, , , , , ,  ) = workRegistration.getInternalWork(
            _workId
        );
        require(
            owner != _validatorAddress,
            "You can't be a validator for this work"
        );
        require(
            userContract.hasRole(
                _validatorAddress,
                UserContract.Role.VALIDATOR
            ),
            "Only Validator can perform this action"
        );

        _;
    }

function validateWork(uint256 _workId, string memory observation) external onlyValidator(msg.sender, _workId) {
        workRegistration.addWorkValidation(_workId, IWorkRegistration.WorkStatus.APPROVED, observation);

        // Update work status based on reviews (you might want to reconsider this logic based on your requirements)
        workRegistration.updateWorkStatus(_workId); 
    }

      function rejectWork(uint256 _workId, string memory observation) external onlyValidator(msg.sender, _workId) {
        workRegistration.addWorkValidation(_workId, IWorkRegistration.WorkStatus.REJECTED, observation);

        // Update work status based on reviews
        workRegistration.updateWorkStatus(_workId); 
    }

    function getWorkStatus(
        uint256 _workId
    ) public view returns (IWorkRegistration.WorkStatus) {
        // Anyone can call this function (using "view")
        // Consider adding a check if you only want certain addresses to get the status
        return workRegistration.getWorkStatus(_workId); // Assuming getWorkStatus is in your IWorkRegistration
    }
}
