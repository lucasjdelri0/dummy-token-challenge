import { BigNumber, ethers } from "ethers";

// Connect Wallet
export const CONNECT_WALLET_REQUEST = "[Request] Connect Wallet";
export const CONNECT_WALLET_SUCCESS = "[Success] Connect Wallet";
export const CONNECT_WALLET_FAILURE = "[Failure] Connect Wallet";

export function connectWalletRequest() {
  return {
    type: CONNECT_WALLET_REQUEST,
    payload: {},
  };
}

export function connectWalletSuccess(
  provider: ethers.providers.Web3Provider,
  address: string,
  symbol: string,
  balance: BigNumber
) {
  return {
    type: CONNECT_WALLET_SUCCESS,
    payload: {
      provider,
      address,
      symbol,
      balance,
    },
  };
}

export function connectWalletFailure(error: string) {
  return {
    type: CONNECT_WALLET_FAILURE,
    payload: {
      error,
    },
  };
}

export type ConnectWalletRequestAction = ReturnType<
  typeof connectWalletRequest
>;
export type ConnectWalletSuccessAction = ReturnType<
  typeof connectWalletSuccess
>;
export type ConnectWalletFailureAction = ReturnType<
  typeof connectWalletFailure
>;
