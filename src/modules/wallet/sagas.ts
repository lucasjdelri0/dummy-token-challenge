import { BigNumber, ethers } from "ethers";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  connectWalletFailure,
  connectWalletSuccess,
  CONNECT_WALLET_REQUEST,
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

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest);
}

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
