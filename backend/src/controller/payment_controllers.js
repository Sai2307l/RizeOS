import { JsonRpcProvider, formatEther } from "ethers";
import Job from "../models/Job.js";

export const verifyPayment = async (req, res, next) => {
  try {
    const { txHash, expectedAmount, jobId } = req.body;
    const provider = new JsonRpcProvider(process.env.RPC_URL);
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt || receipt.status !== 1) {
      return res.status(400).json({ message: "Transaction failed or pending" });
    }
    
    const tx = await provider.getTransaction(txHash);
    if (Number(formatEther(tx.value)) < expectedAmount) {
      return res.status(400).json({ message: "Insufficient payment amount" });
    }

    await Job.findByIdAndUpdate(jobId, { paymentTx: txHash });

    res.json({ message: "Payment verified", txHash });
  } catch (err) {
    next(err);
  }
};
