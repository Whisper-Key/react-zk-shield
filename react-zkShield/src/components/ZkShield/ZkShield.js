import { Authentication } from './Authentication.js';
import NetworkWorkerClient from './Network/NetworkWorkerClient.js';

import { useEffect, useState, createContext } from "react";
import React from 'react';

import {
  PublicKey,
  PrivateKey,
  Field,
} from 'o1js'

const AuthContext = createContext();
const ZkShield = ({ validate, children }) => {

  let [state, setState] = useState({
    authentication: null,
    hasWallet: null,//Authentication.hasWallet,
    hasBeenSetup: false,//validate ? Authentication.hasBeenSetup : true,
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
  });

  let [authState, setAuthState] = useState({
    userAuthenticated: false,
    userAddress: '',
    firstFetchAccount: false,
    alertAvailable: false,
    alertMessage: '',
    alertNeedsSpinner: false,
    creator: null,
  });

  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [firstFetchAccount, setFirstFetchAccount] = useState(false);

  useEffect(() => {

    function timeout(seconds) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, seconds * 1000);
      });
    }


    (async () => {

      const network = new NetworkWorkerClient();
      const authentication = new Authentication(window.mina, network);
      if (!authentication.loggedIn) {
        if (!state.hasBeenSetup) {
          console.log("setting up");
          await timeout(15);
          console.log("loading snarky");
          try {
            const loadedSnarky = await authentication.loadSnarky();
          } catch (e) {
            console.log("error loading snarky", e);
          }

          console.log("loadedSnarky");
          const hasWallet = await authentication.checkForWallet();
          if (!hasWallet) {
            setState({ ...state, hasWallet: false, snarkyLoaded: true });
            return;
          }
          else {
            setState({ ...state, hasWallet: true, snarkyLoaded: true, showRequestingAccount: true });
            console.log("has wallet");
          }
          console.log("requesting account");
          const loginResult = await authentication.login();
          console.log("login result", loginResult);

          if (loginResult.error == "user reject") {
            Snackbar("You cancelled connection with Mina wallet!", 1500);
          }
          else if (loginResult.error == "please create or restore wallet first") {
            console.log("please create or restore wallet first");
            setState({ ...state, showCreateWallet: true, hasWallet: true, snarkyLoaded: true, showRequestingAccount: false });
          }

          console.log("checking account");
          const accountExists = await authentication.doesAccountExist();
          if (!accountExists) {
            setState({ ...state, showFundAccount: true, showCreateWallet: false, hasWallet: true, snarkyLoaded: true, showRequestingAccount: false });
          }
          else {
            setState({ ...state, showLoadingContracts: true, showFundAccount: false, showCreateWallet: false, hasWallet: true, snarkyLoaded: true, showRequestingAccount: false, userAddress: true });
            const hasBeenSetup = true;
            setUserAuthenticated(true);
            setUserAddress(authentication.address);
            setState({ ...state, hasBeenSetup: hasBeenSetup, showLoadingContracts: false, showFundAccount: false, showCreateWallet: false, hasWallet: true, snarkyLoaded: true, showRequestingAccount: false, userAddress: authentication.address, authentication: authentication });

            setAuthState({ ...authState, userAuthenticated: true, userAddress: authentication.address, firstFetchAccount: true, alertAvailable: true, alertMessage: 'Successfully logged in' });

          }

        }
      }
    })();
  }, []);



  return (
    <>


      {!state.hasBeenSetup ?


          <div className="shield-main-container">
            <div className="shield-inner-container">
              <h1 className="">Getting things ready</h1>
              <div className="">
                <div className={`${!state.snarkyLoaded || state.showRequestingAccount || state.showLoadingContracts ? 'loading-snarky' : ''}`} data-reveal-delay="400">
                  <div style={{ display: state.snarkyLoaded ? "none" : "block" }}>
                    Loading <span className="text-color-primary">o1js</span>...
                  </div>
                  {state.hasWallet != null && !state.hasWallet &&
                    <div className='text-color-warning'>
                      Could not find a wallet. Install Auro wallet here
                      <div className='pt-4'>
                        <a className='btn btn-accent' href='https://www.aurowallet.com/' target="_blank" rel="noreferrer">Auro wallet</a>
                      </div>
                    </div>}

                  {state.showRequestingAccount &&
                    <div>Requesting account</div>}

                  {state.showCreateWallet &&
                    <div className='text-color-warning'>Please create or restore a wallet first!</div>}
                  {state.showFundAccount &&
                    <div className='text-color-warning'>Your account does not exist, visit thefaucet to fund your account
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

export { AuthContext, ZkShield };