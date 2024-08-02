// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

contract UserContract {
  constructor() {
    
  }
  enum Role {
    FinalUser, ContentCreator,Validator
  }

  mapping(address=>User) addressToUser;

  struct User {
    address user_id;
    Role role;
  }

  function createUser(address _address, Role _role) public {
    addressToUser[_address] = User(_address, _role);
  }

  

}