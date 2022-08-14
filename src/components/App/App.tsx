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
import { BigNumber, ethers } from "ethers";

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
  const strBalance = balance.toString();
  const walletBalance = `${strBalance} ${symbol}`;

  const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS!;
  const TOKEN_ABI = [
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount)",
  ];

  const handleSubmit = async (address: string, amount: string) => {
    if (!provider) return;
    const signer = provider.getSigner();
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

    try {
      await token.transfer(address, ethers.utils.parseUnits(amount, 0));
      // await token.transfer(address, BigNumber.from(amount));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSuccess = () => {
    setShowModal(false);
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
                showModal={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={(addr, amt) => handleSubmit(addr, amt)}
                onSuccess={handleSuccess}
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
