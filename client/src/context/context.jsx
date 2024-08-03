import { createContext, useEffect, useState } from "react";
import { saveData } from "../utils/utils";
import PropTypes from "prop-types";
import { ethers } from "ethers";
import userContractABI from "../abi/userContarctAbi.json";
import workContractABI from "../abi/workRegistrationContractAbi.json";

export const StateContext = createContext();

const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [user, setUser] = useState(null);
  const ethereum = window.ethereum;

  useEffect(() => {
    async function isConnected() {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          saveData("connected", true);
        } else {
          saveData("connected", false);
        }
      } catch (error) {
        setAddress(null);
        saveData("connected", false);
        console.log(error);
      }
    }
    isConnected();
  }, []);

  useEffect(() => {
    //
    if (address) {
      getUser(null, address);
    }
  }, [address]);

  //User Contract
  const provider = new ethers.BrowserProvider(window.ethereum);

  const getUserContract = async () => {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      "0x741730cFeE14Ac0020d8A7547B5C31f436e13CDc",
      userContractABI,
      signer
    );
    return contract;
  };

  const getWorkContract = async () => {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      "0x865D74101c6386a98DdAEEa60b51BF658c97c708",
      workContractABI,
      signer
    );
    return contract;
  };

  const getUser = async (contract, addr) => {
    contract = contract ?? (await getUserContract());
    const res = await contract.getUser(addr);
    const roles = res[1].map((role) => {
      return Number(role);
    });
    setUser({ username: res[0], roles });
  };

  const addWork = async (title, description, amount) => {
    const contract = await getWorkContract();
    try {
      // Convertir amountInEther en Wei
      const amountInWei = ethers.parseEther(amount.toString());

      const date = new Date();
      const isoString = date.toISOString();

      const tx = await contract.addWork(
        title,
        description,
        amountInWei,
        isoString,
        isoString
      );
      await tx.wait();
      console.log("Work added successfully");
    } catch (error) {
      console.error("Error adding work:", error);
    }
  };

  const connect = async (signUp = false, data = []) => {
    if (window.ethereum) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const contract = await getUserContract();

        //Inscription
        if (signUp) {
          await contract.createUser(accounts[0], ...data);
          setUser({ username: data[0], roles: [data[1]] });
        } else {
          //Connexion
          await getUser(contract, accounts[0]);
        }
        setAddress(accounts[0]);
        saveData("connected", true);
        return { success: true, address: accounts[0] };
      } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
      }
    } else {
      console.log("Not installed");
      saveData("connected", false);
      return { success: false };
    }
  };

  const disconnect = async () => {
    if (window.ethereum) {
      try {
        await ethereum.request({
          method: "wallet_revokePermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
        setAddress(null);
        saveData("connected", false);
        return { success: true };
      } catch (error) {
        return { success: false, message: error.message };
      }
    } else {
      return { success: false };
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        disconnect,
        user,
        addWork,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

StateContextProvider.propTypes = {
  children: PropTypes.node,
};
export default StateContextProvider;
