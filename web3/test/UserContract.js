const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserContract", function () {
    let userContract;
    let owner, addr1, addr2; // Sample addresses

    beforeEach(async function () {
        const UserContract = await ethers.getContractFactory("UserContract");
        userContract = await UserContract.deploy();
        
        [owner, addr1, addr2] = await ethers.getSigners(); 
    });

    it("Should create a new user", async function () {
        const pseudo = "testuser";
        const role = 0; // Role.FINAL_USER

        await userContract.createUser(addr1.address, pseudo, role);
        const result = await userContract.getUser(addr1.address);
        
        console.log("Result of getUser: ", result); // Debugging line

        const storedPseudo = result[0]; 
        const storedRoles = result[1].map(role => role.toNumber ? role.toNumber() : Number(role));

        console.log("Stored Roles: ", storedRoles); // Debugging line

        expect(storedPseudo).to.equal(pseudo);
        expect(storedRoles.length).to.equal(1);
        expect(storedRoles[0]).to.equal(role); 
    });

    it("Should revert if user already exists", async function () {
        const pseudo = "testuser";
        const role = 0; // Role.FINAL_USER

        await userContract.createUser(addr1.address, pseudo, role);

        await expect(userContract.createUser(addr1.address, pseudo, role))
            .to.be.revertedWith("User already exists");
    });

    it("Should add a new role to an existing user", async function () {
        const role1 = 0; // Role.FINAL_USER
        const role2 = 1; // Role.CONTENT_CREATOR

        await userContract.createUser(addr1.address, "testuser", role1);
        await userContract.addRole(addr1.address, role2);

        const result = await userContract.getUser(addr1.address);

        console.log("Result of getUser after adding role: ", result); // Debugging line

        const storedRoles = result[1].map(role => role.toNumber ? role.toNumber() : Number(role));

        console.log("Stored Roles after adding role: ", storedRoles); // Debugging line

        expect(storedRoles.length).to.equal(2);
        expect(storedRoles).to.include(role1);
        expect(storedRoles).to.include(role2);
    });

    it("Should revert if trying to add an existing role", async function () {
        const role = 0; // Role.FINAL_USER

        await userContract.createUser(addr1.address, "testuser", role);

        await expect(userContract.addRole(addr1.address, role))
            .to.be.revertedWith("User already has this role");
    });

    it("Should correctly check if a user has a specific role", async function () {
        const role1 = 0; // Role.FINAL_USER
        const role2 = 2; // Role.VALIDATOR

        await userContract.createUser(addr1.address, "testuser", role1);

        expect(await userContract.hasRole(addr1.address, role1)).to.be.true;
        expect(await userContract.hasRole(addr1.address, role2)).to.be.false; 
    });

});
