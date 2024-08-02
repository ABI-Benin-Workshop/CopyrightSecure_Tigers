export const saveData = (key, value) => {
  localStorage.setItem(key, value);
};

export const getData = (key) => {
  const value = localStorage.getItem(key);
  return value;
};

export const removeData = (key) => {
  localStorage.removeItem(key);
};

export const isConnected = () => {
  try {
    return JSON.parse(getData("connected")) === true;
  } catch (error) {
    saveData("connected", false);
    return false;
  }
};
