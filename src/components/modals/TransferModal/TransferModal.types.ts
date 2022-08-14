export type Props = {
  showModal?: boolean;
  onClose?: () => void;
  onSubmit: (address: string, amount: string) => Promise<void>;
  onSuccess: () => void;
};
