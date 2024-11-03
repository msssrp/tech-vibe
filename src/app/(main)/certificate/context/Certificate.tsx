import { createContext, Dispatch, SetStateAction, useState } from "react";
export const RPC_URLS = {
  sepolia:
    "https://light-delicate-energy.ethereum-sepolia.quiknode.pro/d37f6796b28cace29d313c06a9565bdb64f06c48",
  polygon:
    "https://light-delicate-energy.matic.quiknode.pro/d37f6796b28cace29d313c06a9565bdb64f06c48",
  avalanche:
    "https://light-delicate-energy.avalanche-mainnet.quiknode.pro/d37f6796b28cace29d313c06a9565bdb64f06c48/ext/bc/C/rpc/",
};

interface CertificateContextType {
  provider: string;
  setProvider: Dispatch<SetStateAction<string>>;
}

export const CertificateContext = createContext<CertificateContextType>({
  provider: "",
  setProvider: () => "",
});

export const CertificateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [provider, setProvider] = useState("");
  return (
    <CertificateContext.Provider value={{ provider, setProvider }}>
      {children}
    </CertificateContext.Provider>
  );
};
