import { BigNumber, ethers } from "ethers";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  connectWalletFailure,
  connectWalletSuccess,
  updateBalance,
  CONNECT_WALLET_REQUEST,
  UPDATE_BALANCE,
} from "./actions";
import { WindowWithEthereum } from "./types";

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum;
const { ethereum } = windowWithEthereum;

/* This is the Dummy Token address, it identifies the token contract once deployed */
export const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS!;

if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable REACT_APP_TOKEN_ADDRESS`);
}

// This is the Dummy Token ABI (application binary interface)
// You will need this to interact with the deployed contract, ie:
export const TOKEN_ABI = [
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
];

const provider = new ethers.providers.Web3Provider(ethereum);
const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);

// Balance worker Saga: will perform the async increment task
export function* handleUpdateBalance() {
  const signer = provider.getSigner();
  const address: string = yield call(() => signer.getAddress());
  const balance: BigNumber = yield call(
    async () => await token.balanceOf(address)
  );
  console.log(`updatedBalance`, balance.toString());
  yield put(updateBalance(balance));
}

function* balanceSaga() {
  yield takeEvery(UPDATE_BALANCE, handleUpdateBalance);
}

// Wallet worker Saga: will perform the async increment task
function* handleConnectWalletRequest() {
  try {
    yield call(() => provider.send("eth_requestAccounts", []));
    const signer = provider.getSigner();
    const address: string = yield call(() => signer.getAddress());
    const symbol: string = yield call(async () => await token.symbol());
    const balance: BigNumber = yield call(
      async () => await token.balanceOf(address)
    );
    yield put(connectWalletSuccess(provider, address, symbol, balance));
  } catch (error: any) {
    yield put(connectWalletFailure(error.message));
  }
}

// Wallet watcher Saga: spawn a new handleConnectWalletRequest task on each CONNECT_WALLET_REQUEST
function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export function* rootSaga() {
  yield all([walletSaga(), balanceSaga()]);
}
