import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BigNumber } from "ethers";
import {
  Button,
  Card,
  Center,
  Footer,
  Header,
  Navbar,
  Page,
} from "decentraland-ui";
import { getDummyContract } from "../../utils/contractHelpers";
import { UPDATE_BALANCE } from "../../modules/wallet/actions";
import { TransferModal } from "../modals/TransferModal";
import { Props } from "./App.types";
import "./App.css";

const App: React.FC<Props> = ({
  provider,
  address,
  symbol,
  balance,
  isConnected,
  onConnect,
  isConnecting,
  error,
}) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const walletBalance = `${balance.toString()} ${symbol}`;

  const signer = provider?.getSigner();
  const dummyContract = getDummyContract(signer);

  const handleSubmit = async (recipient: string, amount: string) => {
    if (!dummyContract) return;
    try {
      const tx = await dummyContract.transfer(recipient, amount);
      await tx.wait();
      const balance: BigNumber = await dummyContract.balanceOf(address);
      dispatch({ type: UPDATE_BALANCE, payload: { balance } });
      setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <Page className="App">
        <Center>
          {!isConnected ? (
            <>
              <Button primary onClick={onConnect} loading={isConnecting}>
                Connect
              </Button>
              {error ? <p className="error">{error}</p> : null}
            </>
          ) : (
            <>
              <Card>
                <Header>Wallet</Header>
                <p>
                  <strong>Address:</strong>&nbsp;
                  {address.slice(0, 6) + "..." + address.slice(-4)}
                </p>
                <p>
                  <strong>Balance:</strong>&nbsp; {walletBalance}
                  <Button basic onClick={() => setShowModal(true)}>
                    Transfer
                  </Button>
                </p>
              </Card>
              <TransferModal
                dummyBalance={balance.toString()}
                dummySymbol={symbol}
                showModal={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={(addr, amt) => handleSubmit(addr, amt)}
              />
            </>
          )}
        </Center>
      </Page>
      <Footer />
    </>
  );
};

export default App;
