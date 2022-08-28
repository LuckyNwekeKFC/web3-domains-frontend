import React, { useEffect, useState } from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import {ethers} from "ethers";

// Constants
const TWITTER_HANDLE = 'LuckyNwekeKFC';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
// Add the domain you will be minting
const tld = '.hav';
const CONTRACT_ADDRESS = '0x4f70C70469FA714CA230fc4a89a285787135023a';

const App = () => {
	const [currentAccount, setCurrentAccount] = useState('');
	// Add some state data properties
	const [domain, setDomain] = useState('');
	const [record, setRecord] = useState('');
	// Implement your connectWallet method here
	const connectWallet = async () => {
		try {
		  	const { ethereum } = window;
	
		  	if (!ethereum) {
				alert("Get MetaMask -> https://metamask.io/");
				return;
		  	}
	
		  	// Method to request access to account.
		  	const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		
		  	// Boom! This should print out public address once we authorize Metamask.
		  	console.log("Connected", accounts[0]);
		  	setCurrentAccount(accounts[0]);
		} 	catch (error) {
		  	console.log(error)
		}
	}

	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;
	
		if (!ethereum) {
		  console.log('Make sure you have metamask!');
		  return;
		} else {
		  console.log('We have the ethereum object', ethereum);
		}
	
		const accounts = await ethereum.request({ method: 'eth_accounts' });
	
		if (accounts.length !== 0) {
		  const account = accounts[0];
		  console.log('Found an authorized account:', account);
		  setCurrentAccount(account);
		} else {
		  console.log('No authorized account found');
		}
	};


	// Render Methods
	const renderNotConnectedContainer = () => (
		<div className="connect-wallet-container">
		  <img src="https://media.giphy.com/media/3ohhwytHcusSCXXOUg/giphy.gif" alt="Havilah donut gif" />
		  {/* Call the connectWallet function we just wrote when the button is clicked */}
		  <button onClick={connectWallet} className="cta-button connect-wallet-button">
			Connect Wallet
		  </button>
		</div>
	);

	// Form to enter domain name and data
	const renderInputForm = () =>{
		return (
			<div className="form-container">
				<div className="first-row">
					<input
						type="text"
						value={domain}
						placeholder='domain'
						onChange={e => setDomain(e.target.value)}
					/>
					<p className='tld'> {tld} </p>
				</div>

				<input
					type="text"
					value={record}
					placeholder='What is your tribal name?'
					onChange={e => setRecord(e.target.value)}
				/>

				<div className="button-container">
					<button className='cta-button mint-button' disabled={null} onClick={null}>
						Mint
					</button>  
					<button className='cta-button mint-button' disabled={null} onClick={null}>
						Set data
					</button>  
				</div>

			</div>
		);
	}

  	// This runs our function when the page loads.
 	useEffect(() => {
    	checkIfWalletIsConnected();
  	}, [])

  	return (
    
		<div className="App">
			<div className="container">
				<div className="header-container">
					<header>
					<div className="left">
						<p className="title">🐱‍👤 Havilah Name Service</p>
						<p className="subtitle">Your royal API on the blockchain!</p>
					</div>
					</header>
				</div>

        		{!currentAccount && renderNotConnectedContainer()}
				{/* Render the input form if an account is connected */}
				{currentAccount && renderInputForm()}

        		<div className="footer-container">
          			<img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          		<a className="footer-text" 
            	href={TWITTER_LINK} 
            	target="_blank"
            	rel="noreferrer">
              	{`built with @${TWITTER_HANDLE}`}
          		</a>
        		</div>
      		</div>
    	</div>
  	);
};

export default App;