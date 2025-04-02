import 'dotenv/config'
import {ethers} from "ethers";
import { BrowserProvider,parseUnits,parseEther,formatEther,Contract} from "ethers";
import { HDNodeWallet } from "ethers/wallet";
// If no %%url%% is provided, it connects to the default
// http://localhost:8545, which most nodes use.
const provider = new ethers.JsonRpcProvider(process.env.URL);
// console.log("Private Key:", process.env.PRIVATE_KEY);

// Get write access as an account by getting the signer
const Signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


// console.log('````````````````````')
// console.log(provider)
// console.log('````````````````````')
//const signer = await provider.getSigner(process.env.PUBLIC_KEY)
const eth = parseEther("1.0")
// console.log(formatEther(eth));
// console.log('````````````````````')
// console.log(eth)
const getHash=await provider.getBlockNumber()
// console.log(getHash);
// console.log('++++++++++++')
// converts ether to wei.
const tx = await Signer.sendTransaction({
    to: "0x6E8A8908EEEdcF6B81C3B6C406969E2F60d3571E",
    value: ethers.parseEther("0.00002"),
  });
// console.log(tx)
const abi =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "add",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
  
// Create a contract with the signer
const contract = new Contract("0x3dC366a692710348C362347146bFa50cefd75388", abi, Signer);
console.log(contract)
const tnx = await contract.add(3,2);
console.log("Transaction sent:", tnx.hash);

const receipt = await tnx.wait();
console.log("Transaction mined:", receipt.blockNumber);

const sum = await contract.getSum();
console.log("Updated sum:", sum.toString());