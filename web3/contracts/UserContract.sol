// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "./IWorkRegistration.sol";

contract UserContract {

 
    enum Role { FINAL_USER, CONTENT_CREATOR, VALIDATOR }

    mapping(address => User) public addressToUser; 

    struct User {
        address _address;
        string _pseudo;
        Role[] _roles;
    }

  

    event UserCreated(address indexed userAddress, string pseudo, Role role);

    function createUser(address _address, string memory _pseudo, Role _role) public {
        // Check if the user already exists
        require(addressToUser[_address]._address == address(0), "User already exists");

        Role[] memory roles = new Role[](1);
        roles[0] = _role;

        User memory newUser = User({
            _address: _address,
            _pseudo: _pseudo,
            _roles: roles
        });

        addressToUser[_address] = newUser;

        emit UserCreated(_address, _pseudo, _role);
    }

    // Function to add a role to a user
    function addRole(address _userAddress, Role _newRole) public {
        User storage user = addressToUser[_userAddress];
        require(user._address != address(0), "User does not exist");

        // Check if the user already has the role
        for (uint256 i = 0; i < user._roles.length; i++) {
            if (user._roles[i] == _newRole) {
                revert("User already has this role"); 
            }
        }

        user._roles.push(_newRole);
    }

    // Function to check if a user has a specific role
    function hasRole(address _userAddress, Role _role) public view returns (bool) {
        User memory user = addressToUser[_userAddress];
        for (uint256 i = 0; i < user._roles.length; i++) {
            if (user._roles[i] == _role) {
                return true;
            }
        }
        return false; 
    }

     function getUser(address userAddress) public view returns (string memory _pseudo, Role[] memory) {
        User memory user = addressToUser[userAddress];
        require(user._address != address(0), "User does not exist");

        return (user._pseudo, user._roles);
    }



   
}