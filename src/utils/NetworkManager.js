// NetworkManager.js
import NetInfo from "@react-native-community/netinfo";
import { useState, useEffect } from 'react';

let isConnected = true;
const listeners = new Set();

const NetworkManager = {
  isConnected: () => isConnected,
  
  addListener: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  removeListener: (listener) => {
    listeners.delete(listener);
  },

  notifyListeners: () => {
    listeners.forEach(listener => listener(isConnected));
  },

  init: () => {
    NetInfo.addEventListener(state => {
      if (isConnected !== state.isConnected) {
        isConnected = state.isConnected;
        NetworkManager.notifyListeners();
      }
    });
  }
};

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState(NetworkManager.isConnected());

  useEffect(() => {
    const unsubscribe = NetworkManager.addListener(setNetworkStatus);
    return unsubscribe;
  }, []);

  return networkStatus;
};

export default NetworkManager;