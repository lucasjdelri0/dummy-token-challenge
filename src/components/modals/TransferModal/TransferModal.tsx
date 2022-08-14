import { Button, Close, Field, Modal } from "decentraland-ui";
import { useState } from "react";
import { Props } from "./TransferModal.types";

const TransferModal: React.FC<Props> = ({ showModal, onClose }) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const transferTokens = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(`About to send ${amount} tokens to ${address}`);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Modal
      size="small"
      open={showModal}
      closeIcon={<Close />}
      onClose={onClose}
    >
      <Modal.Header>Transfer</Modal.Header>
      <Modal.Content>
        <p>Send tokens to an account</p>
        <Field
          label="Amount"
          placeholder="100"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <Field
          type="address"
          label="Address"
          placeholder="0x..."
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={transferTokens} loading={isLoading}>
          Send
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TransferModal;