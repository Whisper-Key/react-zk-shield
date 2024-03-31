// // midway iteration
// import { useContext, useEffect, useRef, useState } from "react";
// import { AccountUpdate, Bool, CircuitString, Field, Mina, PrivateKey, PublicKey, Struct } from 'o1js';
// // import { AuthContext } from "./Shield/AuthPage";
// import { AuthContext } from "zkshield";
// import React from 'react';
// import Router from 'next/router';
// import ZkappWorkerClient from "@/pages/zkappWorkerClient";
// import { Add } from "../../../contracts/build/src/Add.js";
// let transactionFee = 0.1;

// const SendZkTransactionComponent = () => {
//   const [authState, setAuthState] = useContext(AuthContext);
//   const [displayText, setDisplayText] = useState('');
//   const [transactionlink, setTransactionLink] = useState('');

//   // const [state, setState] = useState({
//   //   zkappWorkerClient: null as null | ZkappWorkerClient,
//   //   currentNum: null as null | Field,
//   //   publicKey: null as null | PublicKey,
//   //   zkappPublicKey: null as null | PublicKey,
//   //   creatingTransaction: false
//   // });

//   useEffect(() => {
//     async function timeout(seconds: number): Promise<void> {
//       return new Promise<void>((resolve) => {
//         setTimeout(() => {
//           resolve();
//         }, seconds * 1000);
//       });
//     }
//     (async () => {
//         if(authState.userAuthenticated) {
//         //   await localDeploy();
//         //   setDisplayText('Loading web worker...');
//         // console.log('Loading web worker...');
//         // const zkappWorkerClient = new ZkappWorkerClient();
//         // await timeout(5);

//         // await zkappWorkerClient.loadContract();
//         // console.log('Compiling zkApp...');
//         // setDisplayText('Compiling zkApp...');
//         // await zkappWorkerClient.compileContract();
//         // console.log('zkApp compiled');
//         // setDisplayText('zkApp compiled...');

//         // // const zkappPublicKey = PublicKey.fromBase58(ZKAPP_ADDRESS);

//         // await zkappWorkerClient.initZkappInstance(state.zkappPublicKey!);

//         // console.log('Getting zkApp state...');
//         // setDisplayText('Getting zkApp state...');
//         // await zkappWorkerClient.fetchAccount({ publicKey: state.zkappPublicKey! });
//         // const currentNum = await zkappWorkerClient.getNum();
//         // console.log(`Current state in zkApp: ${currentNum.toString()}`);
//         // setDisplayText('');

//         // setState({
//         //   ...state,
//         //   zkappWorkerClient,
//         //   currentNum
//         // });
//         }
//     })();
//   }, []);

//   async function localDeploy() {
//     const zkAppPrivateKey = PrivateKey.random();
//     const zkAppAddress = zkAppPrivateKey.toPublicKey();
//     setState({ ...state, zkappPublicKey: zkAppAddress });
//     const zkApp = new Add(zkAppAddress);
//     const deployerKey = PrivateKey.fromBase58(authState.localAccount);
//     const deployerAccount = deployerKey.toPublicKey();
//     const txn = await Mina.transaction(deployerAccount, () => {
//       AccountUpdate.fundNewAccount(deployerAccount);
//       zkApp.deploy();
//     });
//     await txn.prove();
//     // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
//     await txn.sign([deployerKey, zkAppPrivateKey]).send();

//   }

//   const onSendTransaction = async () => {
//     setState({ ...state, creatingTransaction: true });

//     setDisplayText('Creating a transaction...');
//     console.log('Creating a transaction...');

//     await state.zkappWorkerClient!.fetchAccount({
//       publicKey: state.publicKey!
//     });

//     await state.zkappWorkerClient!.createUpdateTransaction();

//     setDisplayText('Creating proof...');
//     console.log('Creating proof...');
//     await state.zkappWorkerClient!.proveUpdateTransaction();

//     console.log('Requesting send transaction...');
//     setDisplayText('Requesting send transaction...');
//     const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON();

//     setDisplayText('Getting transaction JSON...');
//     console.log('Getting transaction JSON...');
//     const { hash } = await (window as any).mina.sendTransaction({
//       transaction: transactionJSON,
//       feePayer: {
//         fee: transactionFee,
//         memo: ''
//       }
//     });

//     const transactionLink = `https://berkeley.minaexplorer.com/transaction/${hash}`;
//     console.log(`View transaction at ${transactionLink}`);

//     setTransactionLink(transactionLink);
//     setDisplayText(transactionLink);

//     setState({ ...state, creatingTransaction: false });
//   };

//   const onRefreshCurrentNum = async () => {
//     console.log('Getting zkApp state...');
//     setDisplayText('Getting zkApp state...');

//     await state.zkappWorkerClient!.fetchAccount({
//       publicKey: state.zkappPublicKey!
//     });
//     const currentNum = await state.zkappWorkerClient!.getNum();
//     setState({ ...state, currentNum });
//     console.log(`Current state in zkApp: ${currentNum.toString()}`);
//     setDisplayText('');
//   };

//   return (
//     <>
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         {authState.userAuthenticated && <>
//           <h1> Send a JSON Transaction </h1>

//           {/* <div style={{ justifyContent: 'center', alignItems: 'center' }}>
//             <div style={{ padding: 0 }}>
//               Current state in zkApp: {state.currentNum!.toString()}{' '}
//             </div>
//             <button
//               onClick={onSendTransaction}
//               disabled={state.creatingTransaction}
//             >
//               Send Transaction
//             </button>
//             <button onClick={onRefreshCurrentNum}>
//               Get Latest State
//             </button>
//             <div style={{ padding: 0 }}>
//               {displayText}
//             </div>
//           </div> */}
//         </>}
//         <h1>{!authState.userAuthenticated && "Not connected to a wallet!"}</h1>
//       </div>
//     </>);
// }
// export default SendZkTransactionComponent;