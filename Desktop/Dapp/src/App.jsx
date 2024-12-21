
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { AirDrop } from './AirDrop';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';


function App() {
  
  return (
    <div>
      <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/cHoM2bnzBlP2k9MAYnYPtBDAzaEjJqnK"}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                  <AirDrop></AirDrop>
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>

    </div>
      
  );
}

export default App
