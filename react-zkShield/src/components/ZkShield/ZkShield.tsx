
import {Authentication} from './Authentication.js';
import { useEffect, useState, createContext } from "react";

import {
  PublicKey,
  PrivateKey,
  Field,
} from 'o1js'
import NetworkWorkerClient from './Network/NetworkWorkerClient.js';
import React from 'react';


export interface ZkShieldProps {
  validate: boolean;
  children: React.ReactElement;
}
export interface ZkShieldInternalState {
  hasWallet: boolean,
    hasBeenSetup:boolean,
    accountExists:boolean,// authentication.accountExists,
    creatingTransaction: boolean,
    o1jsLoaded: boolean,//authentication.o1jsLoaded,
    showRequestingAccount: boolean,
    showCreateWallet: boolean,
    showFundAccount: boolean,
    showLoadingContracts: boolean,
    userAddress: string,
}
export type ZkShieldState = {
  userAuthenticated: boolean;
  userAddress: string;
}

const AuthContext = createContext<ZkShieldState>({userAuthenticated: false, userAddress: ''} as ZkShieldState);

const ZkShield = (props: ZkShieldProps) => {
  let [state, setState] = useState<ZkShieldInternalState>({
    hasWallet: false,
    hasBeenSetup: props.validate,
    accountExists:false,
    creatingTransaction: false,
    o1jsLoaded: false,
    showRequestingAccount: false,
    showCreateWallet: false,
    showFundAccount: false,
    showLoadingContracts: false,
    userAddress: '',
    
  });

  let [authState, setAuthState] = useState({
    userAuthenticated: false,
    userAddress: '',
  });

  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [firstFetchAccount, setFirstFetchAccount] = useState(false);

  useEffect(() => {

    function timeout(seconds: number) {
      return new Promise(function (resolve: any) {
        setTimeout(function () {
          resolve();
        }, seconds * 1000);
      });
    }


    (async () => {
      const network = new NetworkWorkerClient();
      const authentication = new Authentication((window as any).mina , network);

      if (!authentication.loggedIn) {
        if (!state.hasBeenSetup) {
          await timeout(15);
          try {
            const loadedSnarky = await authentication.loadO1js();
          } catch (e) {
            console.log("error loading o1js", e);
          }
          
          const hasWallet = await authentication.checkForWallet();
          if (!hasWallet) {
            setState({ ...state, hasWallet: false, o1jsLoaded: true });
            return;
          }
          else {
            setState({ ...state, hasWallet: true, o1jsLoaded: true, showRequestingAccount: true });
          }
          console.log("requesting account");
          const loginResult = await authentication.login();
          console.log("login result", loginResult);

          if (loginResult.error == "user reject") {
          console.log("You cancelled connection with Mina wallet!", loginResult);
          }
          else if (loginResult.error == "please create or restore wallet first") {
            console.log("please create or restore wallet first");
            setState({ ...state, showCreateWallet: true, hasWallet: true, o1jsLoaded: true, showRequestingAccount: false });
          }

          console.log("checking account");
          const accountExists = await authentication.doesAccountExist();
          if (!accountExists) {
            setState({ ...state, showFundAccount: true, showCreateWallet: false, hasWallet: true, o1jsLoaded: true, showRequestingAccount: false });
          }
          else {
            setState({ ...state, showLoadingContracts: true, showFundAccount: false, showCreateWallet: false, hasWallet: true, o1jsLoaded: true, showRequestingAccount: false, userAddress: authentication.address! });
            const hasBeenSetup = true;
            setUserAuthenticated(true);
            setUserAddress(authentication.address);
            
            setState({ ...state, hasBeenSetup: hasBeenSetup, showLoadingContracts: false, showFundAccount: false, showCreateWallet: false, hasWallet: true, o1jsLoaded: true, showRequestingAccount: false, userAddress: authentication.address });

            setAuthState({ ...authState, userAuthenticated: true, userAddress: authentication.address });

          }

        }
      }
    })();
  }, []);

  
  return (

    <div>

          {!state.hasBeenSetup ?
           <main>
           <div className='rankproof-page'>
   
             <div className='rankproof-content-wrap'>
   
              <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                  <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Getting things ready</h1>
                    <div className='pt-20'>
                      <div className={`${!state.o1jsLoaded || state.showRequestingAccount || state.showLoadingContracts ? 'loading-snarky' : ''}`} data-reveal-delay="400">
                        <div style={{ display: state.o1jsLoaded ? "none" : "block" }}>
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

                        {state.showLoadingContracts &&
                          <div>Loading contracts...</div>}



                      </div>
                    </div>

                    <div className='pt-20'>
                      <span className="loading loading-bars loading-lg"></span>

                    </div>
                  </div>
                </div>
              </div>
              </div>

</div>
</main>

              :
              <div>
                <AuthContext.Provider value={ authState }>
                  {props.children}
                </AuthContext.Provider>
              </div>}

         
              </div>
  

  );

}

export { AuthContext, ZkShield };