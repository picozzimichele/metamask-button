import Web3 from "web3";
import {useEffect, useState} from "react";

const useWeb3 = () => {
  const[web3, setWeb3] = useState(null);

  useEffect(() => {
    let instance;

    if(window.ethereum) {
      //user has metamask extension
      try {
        instance = new Web3(window.ethereum);
      } catch (error) {
        console.log(error)
      }
    } else if (window.web3) {

      //this is to support old application and old browsers
      instance = new Web3(window.web3);
    } else {
      //this is to use our local test network such as ganache
      const provider = new Web3.provider.HttpProvider("http://127.0.0.1:7545");
      instance = new Web3(provider);
    }

    setWeb3(instance)

  }, []);

  return web3;
}

export default useWeb3;