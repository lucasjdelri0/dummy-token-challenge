import { AnyAction } from "redux";
import {
  ConnectWalletFailureAction,
  ConnectWalletSuccessAction,
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
} from "./actions";
import { WalletState } from "./types";

const INITIAL_STATE: WalletState = {
  provider: null,
  address: null,
  symbol: null,
  balance: null,
  isConnecting: false,
  error: null,
};

export function walletReducer(
  state: WalletState = INITIAL_STATE,
  action: AnyAction
): WalletState {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST: {
      return {
        ...state,
        isConnecting: true,
        error: null,
      };
    }
    case CONNECT_WALLET_SUCCESS: {
      const { provider, address, symbol, balance } =
        action.payload as ConnectWalletSuccessAction["payload"];
      return {
        ...state,
        isConnecting: false,
        provider,
        address,
        symbol,
        balance,
        error: null,
      };
    }

    case CONNECT_WALLET_FAILURE: {
      const { error } = action.payload as ConnectWalletFailureAction["payload"];
      return {
        ...state,
        isConnecting: false,
        error,
      };
    }

    default:
      return state;
  }
}
