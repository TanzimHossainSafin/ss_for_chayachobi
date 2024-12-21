import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";


export function AirDrop(){
  
    const wallet=useWallet();
    const { connection } = useConnection();
    let LAMPORTS_PER_SOL=1000000000;
    async function requestAirdrop(){
        let amount = document.getElementById("amount").value;
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert(`${amount} is send to address ${wallet.publicKey.toBase58()}`)
    }
    async function getbalance(){
        if(wallet.connected){
            const balance=await connection.getBalance(wallet.publicKey);
            alert(`Your Balance Is ${balance/LAMPORTS_PER_SOL} SOL`);
        }
         
    }
    return (
        <div>
          <input id="amount" type="text" placeholder="Amount" />
          <button onClick={requestAirdrop}>request Airdrop</button>
          <br/>
          <button onClick={getbalance}>Get Balance</button>
        </div>
    )
}