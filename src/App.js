import React, { useEffect } from "react";
import ConnectButton from "./components/ConnectButton";
import useStoreApi from "./storeAPI";
import useWeb3 from "./Web3Client"


function App() {
  //the localhost is in case we are using ganache
  // const providerUrl = process.env.PROVIDER_URL || "http://localhost:8545"; 

  const {address, balance, messagge, setBalance, setAddress } = useStoreApi();
  const web3 = useWeb3();

  const setUserAccount = async () => {
    if(window.ethereum) {
      await window.ethereum.enable();
      web3.eth.getAccounts().then(accounts => {
        setAddress(accounts[0])
        setUserBalance(accounts[0]);
      });
    }
  }

  const setUserBalance = async (fromAddress) => {
    await web3.eth.getBalance(fromAddress).then(value => {
      const credit = web3.utils.fromWei(value, "ether");
      setBalance(credit);
    })
  }

  const sendTransaction = async (e) => {
    e.preventDefault();
    const amount = e.target[0].value;
    const recipient = e.target[1].value;
    await web3.eth.sendTransaction({
      from: address,
      to: recipient,
      value: web3.utils.toWei(amount, "ether")
    })
    setUserBalance(address);
  }

  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <p className="text-sm mb-10">Hello, welcome to a simple metamask connection</p>
      {/* Connect button 🦊 */}
      <ConnectButton setUserAccount={setUserAccount} />
      {/* Conditionnaly show once accounts is connected */}
      {address ? 
        <>
        <p className="text-sm mt-5">Your account is: <b>{address}</b></p>
        <p className="text-sm mt-3">Your current balance is: <b>{balance}</b></p>
        </>
        : null
      }
      {/* Submit form */}
      <p className="text-sm mt-5">
        <b>Send your transaction</b> 
        <p className="text-xs">(please use a test network)</p>
      </p>
      <form onSubmit={(e) => sendTransaction(e)}>
          <div className="flex mt-5">
            <input
              className={`w-full text-sm px-2 py-2 text-gray-700 border-gray-300 border rounded-md focus:outline-none`}
              placeholder="Amount in eth"
              type="number"
              min="0"
              step="any"
            />
            <input
              className={`w-full text-sm ml-2 px-2 py-2 text-gray-700 border-gray-300 border rounded-md focus:outline-none`}
              placeholder="Recipient address"
            />
            <button className="flex ml-2 px-3 py-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded-lg">
                  💰
                  <p className="ml-2">Send</p>
            </button>
          </div>
      </form>
    </div>
  );
}

export default App;
