import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import tokenABI from "./abi.json";
import { ToastContainer, toast } from "react-toastify"; // Import toastify components
import { ClipLoader } from "react-spinners"; // Import a spinner from react-spinners
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

// The address of your deployed contract from Hardhat
const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false); // Loader state for processing transactions

  useEffect(() => {
    // Load blockchain data on mount
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []); // Request account access

          const signer = await provider.getSigner();
          const userAccount = await signer.getAddress(); // Get user account
          setAccount(userAccount);

          const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
          const tokenBalance = await tokenContract.balanceOf(userAccount);
          setBalance(ethers.formatUnits(tokenBalance, 18)); // Convert from wei to tokens
        } catch (err) {
          console.error("Error loading blockchain data:", err);
          toast.error("Error loading blockchain data. Please try again.");
        }
      } else {
        toast.error("Please install MetaMask to continue.");
      }
    };

    loadBlockchainData();

    // Listen for account or network changes
    const handleAccountChange = (accounts) => {
      if (accounts.length > 0) {
        const newAccount = accounts[0];
        setAccount(newAccount);
        loadBlockchainData(); // Reload balance and account details
      }
    };

    const handleNetworkChange = (networkId) => {
      console.log("Network changed to:", networkId);
      // Optionally, you can reload data or check for a specific network
      // loadBlockchainData(); // Uncomment to reload data on network change
    };

    // Subscribe to account and network change events
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
      window.ethereum.on("chainChanged", handleNetworkChange);
    }

    // Cleanup event listeners on component unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
        window.ethereum.removeListener("chainChanged", handleNetworkChange);
      }
    };
  }, []); // Run once on mount

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      toast.error("Please provide both recipient address and amount.");
      return;
    }

    setIsProcessing(true); // Start loading

    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

        // Send the transaction (convert amount to the appropriate token decimals, here assuming 18 decimals)
        const tx = await tokenContract.transfer(recipient, ethers.parseUnits(amount, 18));
        await tx.wait();

        // Reset error message if transaction is successful
        setIsProcessing(false); // Stop loading
        toast.success(`Transaction successful: ${tx.hash}`);
      } else {
        toast.error("Please install MetaMask or another Ethereum wallet.");
      }
    } catch (error) {
      console.error("Transaction failed:", error);

      // Extract and display the actual error message
      const errorMessage = error?.data?.message || error?.message || error?.reason || "Transaction failed. Please try again.";

      setIsProcessing(false); // Stop loading
      toast.error(`Transaction failed: ${errorMessage}`); // Display actual error
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6 transition-all duration-300 hover:text-indigo-700">
          Welcome to KAT Token DApp
        </h1>

        {account && (
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-700">Account: <span className="font-semibold">{account}</span></p>
            <p className="text-lg text-gray-700">Balance: <span className="font-semibold">{balance} KAT</span></p>
          </div>
        )}

        {/* Input fields and Transfer button */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
            />
          </div>

          <div className="flex flex-col">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
            />
          </div>

          <button
            onClick={handleTransfer}
            className={`w-full p-3 rounded-lg shadow-md text-white transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isProcessing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ClipLoader color="#ffffff" size={20} /> // Use the ClipLoader from react-spinners
            ) : (
              "Transfer"
            )}
          </button>
        </div>
      </div>

      {/* Toast container to show notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
