import { BigNumber, ethers } from "ethers";
import { AnyAction, Dispatch } from "redux";
import {
  ConnectWalletRequestAction,
  UpdateBalanceAction,
} from "../../modules/wallet/actions";

export type Props = {
  provider: ethers.providers.Web3Provider | null;
  address: string;
  symbol: string;
  balance: BigNumber;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  onConnect: () => void;
};

export type MapStateProps = Pick<
  Props,
  | "provider"
  | "address"
  | "symbol"
  | "balance"
  | "isConnected"
  | "isConnecting"
  | "error"
>;
export type MapDispatchProps = Pick<Props, "onConnect">;
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>;
