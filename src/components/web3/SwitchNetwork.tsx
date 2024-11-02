"use client";
import { notifications } from "@mantine/notifications";
import { BrowserProvider, Eip1193Provider } from "ethers";
import React, { useEffect } from "react";

const sepoliaChainData = {
  chainId: "0xaa36a7", // Sepolia testnet ID in hex
  chainName: "Ethereum Sepolia",
  nativeCurrency: {
    name: "Sepolia ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"],
  blockExplorerUrls: ["https://sepolia.etherscan.io"],
};

const polygonMainnet = {
  chainId: "0x89", // 137 in decimal
  chainName: "Polygon Mainnet",
  nativeCurrency: {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: [
    "https://polygon-rpc.com",
    "https://rpc-mainnet.maticvigil.com",
    "https://rpc.ankr.com/polygon",
  ],
  blockExplorerUrls: ["https://polygonscan.com"],
};

const avaxCChain = {
  chainId: "0xa86a", // 43114 in decimal
  chainName: "Avalanche C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: [
    "https://api.avax.network/ext/bc/C/rpc",
    "https://rpc.ankr.com/avalanche",
  ],
  blockExplorerUrls: ["https://snowtrace.io"],
};

interface EthereumProvider extends Eip1193Provider {
  on: (event: string, callback: (chainId: string) => void) => void;
  removeListener: (event: string, callback: (chainId: string) => void) => void;
}

const SwitchNetWork = () => {
  const [currentChainId, setCurrentChainId] = React.useState<string>("");
  const [isConnected, setIsConnected] = React.useState<boolean>(false);
  const [ethereum, setEthereum] = React.useState<EthereumProvider | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ethProvider = window.ethereum as EthereumProvider;
      setEthereum(ethProvider);

      if (!ethProvider) {
        notifications.show({
          title: "Message",
          message: "Please install MetaMask",
          color: "red",
        });
      } else {
        getCurrentChain();

        const handleChainChange = (chainId: string) => {
          setCurrentChainId(chainId);
        };

        ethProvider.on("chainChanged", handleChainChange);

        return () => {
          ethProvider.removeListener("chainChanged", handleChainChange);
        };
      }
    }
  }, []);

  const provider = ethereum ? new BrowserProvider(ethereum) : null;

  const getCurrentChain = async () => {
    if (provider) {
      try {
        const chainId = await provider.send("eth_chainId", []); // Request current chain ID
        setCurrentChainId(chainId);

        const accounts = await provider.send("eth_accounts", []); // Check connected accounts
        setIsConnected(accounts.length > 0); // Set connection state based on accounts
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "Failed to get chain ID or accounts",
          color: "red",
        });
        console.error("Error fetching chain ID or accounts:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (provider) {
      try {
        await provider.send("eth_requestAccounts", []); // Request account access
        notifications.show({
          title: "Message",
          message: "Wallet connected to the website",
          color: "green",
        });
        getCurrentChain(); // Update chain after connecting
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "Failed to connect wallet to the website",
          color: "red",
        });
      }
    }
  };

  const switchChain = async (chainName: string) => {
    if (provider) {
      try {
        const chainIdMap: { [key: string]: string } = {
          ETHSepolia: sepoliaChainData.chainId,
          Polygon: polygonMainnet.chainId,
          Avax: avaxCChain.chainId,
        };

        await provider.send("wallet_switchEthereumChain", [
          { chainId: chainIdMap[chainName] },
        ]);

        notifications.show({
          title: "Message",
          message: `Switched to ${chainName}`,
          color: "green",
        });
      } catch (error: any) {
        handleChainSwitchError(error, chainName);
      }
    }
  };

  const handleChainSwitchError = async (error: any, chainName: string) => {
    if (error.code === "ACTION_REJECTED") {
      notifications.show({
        title: "Message",
        message: "User rejected the request to switch chains",
        color: "orange",
      });
      return;
    }

    if (error.error.code === 4902) {
      try {
        // Attempt to add the chain
        await addChain(chainName);
      } catch (addError) {
        notifications.show({
          title: "Error",
          message: `Failed to add ${chainName} chain`,
          color: "red",
        });
      }
    } else {
      notifications.show({
        title: "Error",
        message: `An error occurred while switching chains: ${error.error.code}`,
        color: "red",
      });
    }
  };

  const addChain = async (chainName: string) => {
    if (provider) {
      const chainDataMap: { [key: string]: any } = {
        Polygon: polygonMainnet,
        Avax: avaxCChain,
      };

      await provider.send("wallet_addEthereumChain", [chainDataMap[chainName]]);
      notifications.show({
        title: "Message",
        message: `Added ${chainName}`,
        color: "green",
      });
    }
  };

  const chainDataMap = {
    ETHSepolia: { id: sepoliaChainData.chainId, displayName: "ETH Sepolia" },
    Polygon: { id: polygonMainnet.chainId, displayName: "Polygon" },
    Avax: { id: avaxCChain.chainId, displayName: "Avalanche" },
  };

  return (
    <div className="flex items-center space-x-4 flex-wrap justify-center">
      {ethereum ? (
        isConnected ? (
          Object.entries(chainDataMap).map(([name, { id, displayName }]) => {
            if (currentChainId === id)
              return (
                <div
                  key={name}
                  className={`btn btn-sm border-b-2 mt-5 border-purple-600 shadow-md shadow-purple-500 transition-all duration-300 ease-in-out`}
                >
                  Switch to {displayName}
                </div>
              );
            return (
              <button
                key={name}
                className={`btn btn-sm border-transparent mt-5 transition-all duration-300 ease-in-out`}
                onClick={() => switchChain(name as keyof typeof chainDataMap)}
              >
                Switch to {displayName}
              </button>
            );
          })
        ) : (
          <button
            className="btn btn-sm border-transparent transition-all duration-300 ease-in-out"
            onClick={connectWallet}
          >
            Connect to Website
          </button>
        )
      ) : (
        <div className="text-red-600">Please install MetaMask</div>
      )}
    </div>
  );
};

export default SwitchNetWork;
