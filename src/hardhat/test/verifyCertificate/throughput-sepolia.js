const { ethers } = require("hardhat");

describe("SBTBlogCert Performance - Throughput Test", function () {
  let contract;
  let contractABI;
  let contractAddress;
  let signer;

  before(async function () {
    contractAddress = "0x1443728D7Fce10b55b79e6cB9DD35919a919aC44";
    contractABI = require("../../artifacts/contracts/BlogCert.sol/BlogCertificate.json");
    [signer] = await ethers.getSigners();
    contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
  });

  it("Should measure transactions per second (TPS)", async function () {
    this.timeout(30000); // Extend timeout to 5 minutes

    const numTransactions = 5;
    const startTime = Date.now();

    // Get gas price dynamically
    const feeData = await ethers.provider.getFeeData();
    const gasPrice = feeData.gasPrice || ethers.parseUnits("50", "gwei"); // Default 50 gwei

    // Get the starting nonce
    let nonce = await signer.getNonce();

    // Send transactions sequentially with a delay
    const txReceipts = [];
    for (let i = 0; i < numTransactions; i++) {
      const tx = await signer.sendTransaction({
        to: contractAddress,
        data: contract.interface.encodeFunctionData("verifyCertificate", [
          `${i}`,
          `ipfs://QmZz`,
        ]),
        nonce: nonce + i, // Ensure unique nonce
        gasPrice: gasPrice * BigInt(2), // Increase gas price
        gasLimit: 300000, // Ensure enough gas
      });

      console.log(
        `🔄 Sent transaction ${i + 1}/${numTransactions}: ${tx.hash}`
      );

      txReceipts.push(tx.wait());

      // Small delay to avoid nonce conflicts
      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    await Promise.all(txReceipts);

    const endTime = Date.now();
    const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
    const tps = numTransactions / elapsedTime;

    console.log(`🟢 Throughput: ${tps.toFixed(2)} TPS`);
  });
});
