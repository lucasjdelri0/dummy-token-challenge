import { BigNumber, ethers } from "ethers";

export type WalletState = {
  provider: ethers.providers.Web3Provider | null;
  address: string | null;
  symbol: string | null;
  balance: BigNumber | null;
  isConnecting: boolean;
  error: string | null;
};

export type WindowWithEthereum = Window & {
  ethereum: ethers.providers.ExternalProvider;
};
