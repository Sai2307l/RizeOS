import { useState } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import { confirmPayment } from "../api/jobs";
const Payment = () => {
  const { jobId: JOB_ID } = useParams();

  const [walletAddress, setWalletAddress] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const POLYGON_CHAIN_ID = "0x89";
  const RECEIVING_ADDRESS = import.meta.env.VITE_RECEIVING_ADDRESS;
  const AMOUNT = import.meta.env.VITE_JOB_BUDGET || "0.01";
  const switchToPolygon = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: POLYGON_CHAIN_ID }],
      });
    } catch (error) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: POLYGON_CHAIN_ID,
              chainName: "Polygon Mainnet",
              nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
              rpcUrls: ["https://polygon-rpc.com"],
              blockExplorerUrls: ["https://polygonscan.com/"],
            },
          ],
        });
      } else {
        throw error;
      }
    }
  };

  const handlePayment = async () => {
    setError("");
    setLoading(true);
    try {
      if (!window.ethereum) throw new Error("MetaMask not detected");
      await switchToPolygon();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const address = await signer.getAddress();
      setWalletAddress(address);

      const tx = await signer.sendTransaction({
        to: RECEIVING_ADDRESS,
        value: ethers.parseEther(AMOUNT),
      });

      setTxHash(tx.hash);
      await tx.wait();

      await confirmPayment(JOB_ID, {
        txnHash: tx.hash,
        from: address,
      });
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div className="flex items-center mb-6">
          <svg
            className="w-10 h-10 text-indigo-500 mr-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zm0 0v13m0 0l-4-4m4 4l4-4"
            />
          </svg>
          <h1 className="text-3xl font-bold text-white">Complete Payment</h1>
        </div>
        <p className="text-gray-400 mb-6">
          Please pay{" "}
          <span className="text-indigo-400 font-semibold">{AMOUNT} MATIC</span>{" "}
          to continue. Payments are processed securely on Polygon Mainnet.
        </p>
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-400">
            <span className="mr-2">Receiving Address:</span>
            <span className="font-mono text-indigo-300 truncate">
              {RECEIVING_ADDRESS}
            </span>
          </div>
        </div>
        {walletAddress && (
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-400">
              <span className="mr-2">Your Wallet:</span>
              <span className="font-mono text-green-400 truncate">
                {walletAddress}
              </span>
            </div>
          </div>
        )}
        {error && (
          <div className="mb-4">
            <div className="bg-red-900 text-red-300 px-4 py-2 rounded">
              {error}
            </div>
          </div>
        )}
        {txHash ? (
          <div className="mb-4">
            <div className="bg-green-900 text-green-300 px-4 py-2 rounded flex flex-col">
              <span className="mb-1">✅ Payment successful!</span>
              <a
                href={`https://polygonscan.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-green-200 break-all"
              >
                View on PolygonScan
              </a>
            </div>
          </div>
        ) : (
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
              loading
                ? "bg-indigo-900 text-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-indigo-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Pay with MetaMask"
            )}
          </button>
        )}
        <div className="mt-8 text-xs text-gray-500 text-center">
          Powered by Polygon • Secure crypto payments
        </div>
      </div>
    </div>
  );
};

export default Payment;
