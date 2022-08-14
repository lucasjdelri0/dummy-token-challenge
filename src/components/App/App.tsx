import React, { useState } from "react";
import {
  Button,
  Card,
  Center,
  Footer,
  Header,
  Navbar,
  Page,
} from "decentraland-ui";
import { TransferModal } from "../modals/TransferModal";
import { Props } from "./App.types";
import "./App.css";

const App: React.FC<Props> = ({
  address,
  symbol,
  balance,
  isConnected,
  onConnect,
  isConnecting,
  error,
}) => {
  const [showModal, setShowModal] = useState(false);
  const strBalance = balance.toString();
  const walletBalance = `${strBalance} ${symbol}`;

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
                  <Button basic onClick={() => setShowModal(!showModal)}>
                    Transfer
                  </Button>
                </p>
              </Card>
              <TransferModal
                showModal={showModal}
                onClose={() => setShowModal(!showModal)}
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
