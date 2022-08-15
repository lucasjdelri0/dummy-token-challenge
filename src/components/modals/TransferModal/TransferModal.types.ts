import { BigNumber } from "ethers";

export type Props = {
  dummyBalance: string;
  dummySymbol: string;
  showModal?: boolean;
  onClose?: () => void;
  onSubmit: (address: string, amount: string) => Promise<void>;
};
