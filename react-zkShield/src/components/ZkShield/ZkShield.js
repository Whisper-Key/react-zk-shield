import { Authentication } from './Authentication.js';
import SelectProvider from './SelectProvider.js';
import NetworkWorkerClient from './Network/NetworkWorkerClient.js';
import { AuroWalletProvider } from './Wallet/WalletProviders/AuroWalletProvider.js';
import { useEffect, useState, createContext } from "react";
import React from 'react';

import PropTypes from 'prop-types';

import {
  PublicKey,
  PrivateKey,
  Field,
} from 'o1js'
import SelectNetwork from './SelectNetwork.js';

const AuthContext = createContext();
const ZkShield = ({
  mainContainerClassName,
  innerContainerClassName,
  headerClassName,
  headerText,
  statusClassName,
  walletNotFoundText,
  createWalletText,
  requestingAccountText,
  fundAccountText,
  ignoreConnectForTesting,
  minaWalletProvider, 
  autoLaunch,
  selectNetworkClassName,
  selectProviderClassName,
  children }) => {
    

  let [state, setState] = useState({
    authentication: null,
    hasWallet: null,//Authentication.hasWallet,
    hasBeenSetup: ignoreConnectForTesting ?? false,//validate ? Authentication.hasBeenSetup : true,
    accountExists: false,//Authentication.accountExists,
    currentNum: null,
    publicKey: null,
    zkappPublicKey: null,
    creatingTransaction: false,
    snarkyLoaded: false,//Authentication.sn,
    showRequestingAccount: false,
    showCreateWallet: false,
    showFundAccount: false,
    showLoadingContracts: false,
    userAddress: null,
    authentication: null,
    providerSelected: false,
    networkSelected: false,
    network: null,
    launch: true
  });

  let [authState, setAuthState] = useState({
    userAuthenticated: false,
    userAddress: '',
    firstFetchAccount: false,
    alertAvailable: false,
    alertMessage: '',
    alertNeedsSpinner: false,
    creator: null,
    connectedNetwork:'',
  });

  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [firstFetchAccount, setFirstFetchAccount] = useState(false);

  function timeout(seconds) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, seconds * 1000);
    });
  }

  useEffect(() => {

    window.zkshield = {
      launch: () => {
        console.log("launching");
        setState({ ...state, launch: true });
      }
    };

    const launchState = autoLaunch ?? state.launch;
    setState({ ...state, launch: launchState });

    (async () => {

      if (autoLaunch && minaWalletProvider) {
        const network = new NetworkWorkerClient();
        const walletProvider = minaWalletProvider ?? new AuroWalletProvider(window.mina);
        const authentication = new Authentication(walletProvider, network);
        setState({ ...state, providerSelected: true });

        await providerSetup(authentication);
      }
    })();
  }, []);

  const providerSetup = async (authentication) => {
    setState({ ...state, providerSelected: true });

    if (!authentication.loggedIn) {
      if (!state.hasBeenSetup) {
        console.log("setting up");
        await timeout(5);
        console.log("loading snarky");
        try {
          const loadedSnarky = await authentication.loadO1js(state.network);
        } catch (e) {
          console.log("error loading snarky", e);
        }

        console.log("loadedSnarky");
        const hasWallet = await authentication.checkForWallet();
        console.log("hasWallet", hasWallet);
        if (!hasWallet) {
          setState({ ...state, hasWallet: false, snarkyLoaded: true, providerSelected: true });
          return;
        }
        else {
          setState({ ...state, hasWallet: true, snarkyLoaded: true, showRequestingAccount: true, providerSelected: true });
          console.log("has wallet");
        }
        console.log("requesting account");
        const loginResult = await authentication.login();
        console.log("login result", loginResult);

        if (!loginResult.connected) {
          console.log(loginResult.friendlyErrorMessage);
          setState({ ...state, showCreateWallet: true, hasWallet: true, snarkyLoaded: true, showRequestingAccount: false, providerSelected: true });
        }

        console.log("checking account");
        const accountExists = await authentication.doesAccountExist();
        if (!accountExists) {
          setState({ ...state, showFundAccount: true, showCreateWallet: false, hasWallet: true, snarkyLoaded: true, showRequestingAccount: false, providerSelected: true });
        }
        else {
          setState({ ...state, showLoadingContracts: true, showFundAccount: false, showCreateWallet: false, hasWallet: true, snarkyLoaded: true, showRequestingAccount: false, userAddress: true, providerSelected: true });
          const hasBeenSetup = true;
          setUserAuthenticated(true);
          setUserAddress(authentication.address);
          setState({ ...state, hasBeenSetup: hasBeenSetup, showLoadingContracts: false, showFundAccount: false, showCreateWallet: false, hasWallet: true, snarkyLoaded: true, showRequestingAccount: false, userAddress: authentication.address, authentication: authentication, providerSelected: true });

          setAuthState({ ...authState, userAuthenticated: true, userAddress: authentication.address, firstFetchAccount: true, alertAvailable: true, alertMessage: 'Successfully logged in', connectedNetwork: state.network });

        }

      }
    }
  }

  const providerSelected = async (provider) => {
    console.log("provider selected in ZK Shield", provider);
    const network = new NetworkWorkerClient();
    const walletProvider = provider ?? new AuroWalletProvider(window.mina);
    const authentication = new Authentication(walletProvider, network);
    setState({ ...state, providerSelected: true });

    await providerSetup(authentication);
  }

  const networkSelected = async (network) => {
    console.log("network selected in ZK Shield", network);
    setState({ ...state, networkSelected: true, network: network });
  }


  return (
    <>


      {state.launch && !state.hasBeenSetup ?


        <div className={mainContainerClassName ?? "zkshield-main-container"}>
          <div className={innerContainerClassName ?? "zkshield-inner-container"}>
            {minaWalletProvider == null && !state.providerSelected && 
            <div>
            {!state.networkSelected && 
              <div className={selectNetworkClassName ?? "zkshield-select-network-container"}>
                <SelectNetwork networkSelectedHandler={networkSelected} /> 
              </div>
            }
            {state.networkSelected && 
              <div className={selectProviderClassName ?? "zkshield-select-provider-container"}>
                <SelectProvider providerSelectedHandler={providerSelected} /> 
              </div>
            }
            </div>
            }
            {state.providerSelected &&
              <div>
                <h1 className={headerClassName ?? ""}>{headerText ?? "Getting things ready"}</h1>
                <div className={statusClassName ?? ""}>
                  <div className={`${!state.snarkyLoaded || state.showRequestingAccount || state.showLoadingContracts ? 'loading-snarky' : ''}`} data-reveal-delay="400">
                    <div style={{ display: state.snarkyLoaded ? "none" : "block" }}>
                      Loading <span className="text-color-primary">o1js</span>...
                    </div>
                    {state.hasWallet != null && !state.hasWallet &&
                      <div className='text-color-warning'>
                        {walletNotFoundText ?? "Could not find a wallet. Install Auro wallet here"}
                        <div className='pt-4'>
                          <a className='btn btn-accent' href='https://www.aurowallet.com/' target="_blank" rel="noreferrer">Auro wallet</a>
                        </div>
                      </div>}

                    {state.showRequestingAccount &&
                      <div>{requestingAccountText ?? "Requesting account"}</div>
                    }

                    {state.showCreateWallet &&
                      <div className='text-color-warning'>
                        {createWalletText ?? "Please create or restore a wallet first!"}
                      </div>}
                    {state.showFundAccount &&
                      <div className='text-color-warning'>
                        {fundAccountText ?? "Your account does not exist, visit thefaucet to fund your account"}
                        <div className='pt-4'>
                          <a className='btn btn-accent'
                            href="https://faucet.minaprotocol.com/" target="_blank" rel="noreferrer">Faucet</a></div>
                      </div>
                    }




                  </div>
                </div>

                <div className='pt-20'>
                  <span className="loading loading-bars loading-lg"></span>

                </div>
              </div>
            }
          </div>
        </div>

        :
        <div>
          <AuthContext.Provider value={[authState, setAuthState]}>
            {children}
          </AuthContext.Provider>
        </div>}


    </>

  );

}

ZkShield.propTypes = {
  mainContainerClassName: PropTypes.string,
  innerContainerClassName: PropTypes.string,
  selectNetworkClassName: PropTypes.string,
  selectProviderClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  headerText: PropTypes.string,
  statusClassName: PropTypes.string,
  walletNotFoundText: PropTypes.string,
  createWalletText: PropTypes.string,
  requestingAccountText: PropTypes.string,
  fundAccountText: PropTypes.string,
  ignoreConnectForTesting: PropTypes.bool,
  autoLaunch: PropTypes.bool,
  children: PropTypes.node.isRequired,
  minaWalletProvider: PropTypes.object
};

export { AuthContext, ZkShield };