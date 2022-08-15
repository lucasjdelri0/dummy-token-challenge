import { connect } from "react-redux";
import { connectWalletRequest } from "../../modules/wallet/actions";
import {
  getProvider,
  getAddress,
  getSymbol,
  getBalance,
  getError,
  isConnected,
  isConnecting,
} from "../../modules/wallet/selectors";
import { RootState } from "../../modules/types";
import { MapDispatch, MapDispatchProps, MapStateProps } from "./App.types";
import App from "./App";

const mapState = (state: RootState): MapStateProps => ({
  provider: getProvider(state),
  address: getAddress(state),
  symbol: getSymbol(state),
  balance: getBalance(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  error: getError(state),
});

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest()),
});

export default connect(mapState, mapDispatch)(App);
