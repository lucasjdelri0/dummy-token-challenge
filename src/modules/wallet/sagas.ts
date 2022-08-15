import { BigNumber, ethers } from "ethers";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  connectWalletFailure,
  connectWalletSuccess,
  CONNECT_WALLET_REQUEST,
} from "./actions";
import { WindowWithEthereum } from "./types";
import { getDummyContract } from "../../utils/contractHelpers";

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum;
const { ethereum } = windowWithEthereum;

const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const dummyContract = getDummyContract(provider);

function* handleConnectWalletRequest() {
  try {
    yield call(() => provider.send("eth_requestAccounts", []));
    const address: string = yield call(() => signer.getAddress());
    const symbol: string = yield call(async () => await dummyContract.symbol());
    const balance: BigNumber = yield call(
      async () => await dummyContract.balanceOf(address)
    );
    yield put(connectWalletSuccess(provider, address, symbol, balance));
  } catch (error: any) {
    yield put(connectWalletFailure(error.message));
  }
}

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest);
}
