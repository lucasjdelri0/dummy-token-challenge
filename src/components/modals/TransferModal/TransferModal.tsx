import { useState } from "react";
import { Button, Close, Field, Modal } from "decentraland-ui";
import { Props } from "./TransferModal.types";
import { isAddress } from "ethers/lib/utils";

const TransferModal: React.FC<Props> = ({
  dummyBalance,
  dummySymbol,
  showModal = false,
  onClose,
  onSubmit,
}) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidAmount = +amount >= 0;
  const isEnoughBalance = +amount <= +dummyBalance;
  const wrongAmount = !isValidAmount || !isEnoughBalance;
  const wrongAddress = address !== "" && !isAddress(address);

  const transferTokens = async () => {
    if (!onSubmit) {
      return;
    }
    setIsLoading(true);
    try {
      await onSubmit(address, amount);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      size="small"
      open={showModal}
      closeIcon={<Close />}
      onClose={onClose}
    >
      <Modal.Header style={{ textAlign: "center" }}>Transfer</Modal.Header>
      <Modal.Content>
        <p style={{ textAlign: "center" }}>Send DUMMY to an account</p>
        <Field
          label="Amount"
          placeholder="100"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          disabled={isLoading}
          message={`Balance: ${dummyBalance} ${dummySymbol}`}
          error={wrongAmount}
        />
      </Modal.Content>
      <Modal.Content>
        <Field
          type="address"
          label="Address"
          placeholder="0x..."
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          disabled={isLoading}
          error={wrongAddress}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          primary
          onClick={transferTokens}
          loading={isLoading}
          disabled={+amount <= 0 || !isAddress(address)}
        >
          Send
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TransferModal;
