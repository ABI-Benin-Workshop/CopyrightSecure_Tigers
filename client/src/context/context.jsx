import { createContext, useEffect, useState } from "react";
import { saveData } from "../utils/utils";
import PropTypes from "prop-types";

export const StateContext = createContext();

const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
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
        }
      } catch (error) {
        setAddress(null);
        saveData("connected", false);
      }
    }
    isConnected();
  }, []);

  const connect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        saveData("connected", true);
        return { success: true, address: accounts[0] };
      } catch (error) {
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
