const { ethers } = require("hardhat");

async function measureInclusionLatency(networkName) {
  const [deployer] = await ethers.getSigners();
  console.log(
    `Deploying transaction from: ${deployer.address} on ${networkName}`
  );

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(
    `Deployer Balance: ${ethers.formatEther(balance)} ${networkName}`
  );

  if (balance < ethers.parseEther("0.01")) {
    console.error("❌ Not enough funds to send the transaction!");
    return;
  }

  // Capture Transaction Submission Time (T1)
  const T1 = Date.now();

  try {
    // Send Transaction
    const tx = await deployer.sendTransaction({
      to: "0xbC7790E88062726f12A641026e37a45AFD4741A0",
      value: ethers.parseEther("0.01"),
    });

    console.log(`Transaction Sent: ${tx.hash}`);

    // Wait for inclusion in a block (T2)
    const receipt = await tx.wait();
    console.log("Gas used", receipt.cumulativeGasUsed.toString(), "gas");

    const T2 =
      (await ethers.provider.getBlock(receipt.blockNumber)).timestamp * 1000;
    console.log(`Transaction Included in Block: ${receipt.blockNumber}`);

    // Compute Inclusion Latency
    const inclusionLatency = T2 - T1;
    console.log(
      `📌 Inclusion Latency on ${networkName}: ${inclusionLatency} ms`
    );
  } catch (error) {
    console.error("❌ Error sending transaction:", error);
  }
}

async function main() {
  console.log(
    "Measuring Inclusion Latency on Sepolia, Polygon, and Avalanche..."
  );
  await measureInclusionLatency("ETH Sepolia");
}

main();
