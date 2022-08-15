import { ethers } from "ethers";
import TOKEN_ABI from "./dummyToken.json";

const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS!;

export const getDummyContract = (
  signerOrProvider?: ethers.Signer | ethers.providers.Provider
): ethers.Contract => {
  if (!TOKEN_ADDRESS) {
    console.error(`Missing env variable REACT_APP_TOKEN_ADDRESS`);
  }
  return new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signerOrProvider);
};
