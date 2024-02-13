
// import Authentication from './Authentication';
// import { useEffect, useState, createContext } from "react";

// import {
//   PublicKey,
//   PrivateKey,
//   Field,
// } from 'o1js'

// const AuthContext = createContext();
// const ZkShield = ({ validate, children }) => {
//   const network = new NetworkWorkerClient();
//   const authentication = new Authentication(window.mina, NetworkWorkerClient);
//   let [state, setState] = useState({
//     hasWallet: authentication.hasWallet,
//     hasBeenSetup: validate ? authentication.hasBeenSetup : true,
//     accountExists: authentication.accountExists,
//     currentNum: null,
//     publicKey: null,
//     zkappPublicKey: null,
//     creatingTransaction: false,
//     o1jsLoaded: authentication.o1jsLoaded,
//     showRequestingAccount: false,
//     showCreateWallet: false,
//     showFundAccount: false,
//     showLoadingContracts: false,
//     userAddress: null,
//   });

//   let [authState, setAuthState] = useState({
//     userAuthenticated: false,
//     userAddress: '',
//     firstFetchAccount: false,
//     alertAvailable: false,
//     alertMessage: '',
//     alertNeedsSpinner: false,
//     creator: null,
//   });

//   const [userAuthenticated, setUserAuthenticated] = useState(false);
//   const [userAddress, setUserAddress] = useState('');
//   const [firstFetchAccount, setFirstFetchAccount] = useState(false);

//   useEffect(() => {

//     function timeout(seconds) {
//       return new Promise(function (resolve) {
//         setTimeout(function () {
//           resolve();
//         }, seconds * 1000);
//       });
//     }


//     (async () => {
//       if (!authentication.loggedIn) {
//         if (!state.hasBeenSetup) {
//           await timeout(15);
//           console.log("loading snarky");
//           try {
//             const loadedSnarky = await authentication.loadSnarky();
//           } catch (e) {
//             console.log("error loading snarky", e);
//           }

//           console.log("loadedSnarky");
//           const hasWallet = await authentication.checkForWallet();
//           if (!hasWallet) {
//             setState({ ...state, hasWallet: false, o1jsLoaded: true });
//             return;
//           }
//           else {
//             setState({ ...state, hasWallet: true, o1jsLoaded: true, showRequestingAccount: true });
//             console.log("has wallet");
//           }
//           console.log("requesting account");
//           const loginResult = await authentication.login();
//           console.log("login result", loginResult);

//           if (loginResult.error == "user reject") {
//             Snackbar("You cancelled connection with Mina wallet!", 1500);
//           }
//           else if (loginResult.error == "please create or restore wallet first") {
//             console.log("please create or restore wallet first");
//             setState({ ...state, showCreateWallet: true, hasWallet: true, o1jsLoaded: true, showRequestingAccount: false });
//           }

//           console.log("checking account");
//           const accountExists = await authentication.doesAccountExist();
//           if (!accountExists) {
//             setState({ ...state, showFundAccount: true, showCreateWallet: false, hasWallet: true, o1jsLoaded: true, showRequestingAccount: false });
//           }
//           else {
//             setState({ ...state, showLoadingContracts: true, showFundAccount: false, showCreateWallet: false, hasWallet: true, o1jsLoaded: true, showRequestingAccount: false, userAddress: true });
//             const hasBeenSetup = await authentication.setupContracts();
//             setUserAuthenticated(true);
//             setUserAddress(authentication.address);
//             //const hasBeenSetup = authentication.setupBjjPromoteContracts();
//             setState({ ...state, hasBeenSetup: hasBeenSetup, showLoadingContracts: false, showFundAccount: false, showCreateWallet: false, hasWallet: true, o1jsLoaded: true, showRequestingAccount: false, userAddress: authentication.address, authentication: authentication });

            
//             console.log('fetching account');
//             authentication.zkClient?.fetchAccount({ publicKey: PublicKey.fromBase58(authentication.contractAddress) });
//             console.log('fetching account done');
//             setFirstFetchAccount(true);

//             setAuthState({ ...authState, userAuthenticated: true, userAddress: authentication.address, firstFetchAccount: true, alertAvailable:true, alertMessage: 'Successfully logged in' });
//             // console.log('fetching storage root');
//             // let root = await authentication.zkClient.getNum();
//             // console.log("storage root", root.toString());
//           }

//         }
//       }
//     })();
//   }, []);



//   const loginClicked = async () => {
//     try {
//       const loggedIn = await authentication.login();
//       if (loggedIn) {
//         Router.push('/dashboard');
//       }
//     }
//     catch (e) {
//       console.log("Login Failed", e.message);
//       if (e.message == "user reject") {
//         Snackbar("You cancelled connection with Mina wallet!", 1500);
//       }
//     }
//     // const loggedIn = authentication.login();
//     // if (authentication.loggedIn) {
//     //   Router.push('/dashboard')
//     // }
//   }
//   return (
//     <>
//       <Head>
//         <title>Whisper Key</title>
//         <link rel="icon" href="/assets/favicon.ico" />
//       </Head>
    

//           {!state.hasBeenSetup ?
//            <main>
//            <div className='rankproof-page'>
   
//              <div className='rankproof-content-wrap'>
   
//               <div className="hero min-h-screen bg-base-200">
//                 <div className="hero-content text-center">
//                   <div className="max-w-md">
//                     <h1 className="text-5xl font-bold">Getting things ready</h1>
//                     <div className='pt-20'>
//                       <div className={`${!state.o1jsLoaded || state.showRequestingAccount || state.showLoadingContracts ? 'loading-snarky' : ''}`} data-reveal-delay="400">
//                         <div style={{ display: state.o1jsLoaded ? "none" : "block" }}>
//                           Loading <span className="text-color-primary">o1js</span>...
//                         </div>
//                         {state.hasWallet != null && !state.hasWallet &&
//                           <div className='text-color-warning'>
//                             Could not find a wallet. Install Auro wallet here 
//                             <div className='pt-4'>
//                             <a className='btn btn-accent' href='https://www.aurowallet.com/' target="_blank" rel="noreferrer">Auro wallet</a>
//                             </div>
//                           </div>}

//                         {state.showRequestingAccount &&
//                           <div>Requesting account</div>}

//                         {state.showCreateWallet &&
//                           <div className='text-color-warning'>Please create or restore a wallet first!</div>}
//                         {state.showFundAccount &&
//                           <div className='text-color-warning'>Your account does not exist, visit thefaucet to fund your account
//                           <div className='pt-4'>
//                             <a className='btn btn-accent' 
//                            href="https://faucet.minaprotocol.com/" target="_blank" rel="noreferrer">Faucet</a></div>
//                            </div>
//                            }

//                         {state.showLoadingContracts &&
//                           <div>Loading contracts...</div>}



//                       </div>
//                     </div>

//                     <div className='pt-20'>
//                       <span className="loading loading-bars loading-lg"></span>

//                     </div>
//                   </div>
//                 </div>
//               </div>
//               </div>

// </div>
// </main>

//               :
//               <div>
//                 <AuthContext.Provider value={[authState, setAuthState]}>
//                   {children}
//                 </AuthContext.Provider>
//               </div>}

         
//     </>

//   );

// }

// export { AuthContext, ZkShield };