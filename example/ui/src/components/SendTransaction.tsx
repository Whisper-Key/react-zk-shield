// midway iteration
import { useContext, useEffect, useRef, useState } from "react";
import { AccountUpdate, Bool, CircuitString, Field, Mina, PrivateKey, PublicKey, Struct } from 'o1js';
// import { AuthContext } from "./Shield/AuthPage";
import { AuthContext } from "zkshield";
import React from 'react';
import Router from 'next/router';
import ZkappWorkerClient from "@/pages/zkappWorkerClient";
import { Add } from "../../../contracts/build/src/Add.js";
let transactionFee = 0.1;

const SendTransaction = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [displayText, setDisplayText] = useState('');
  const [transactionlink, setTransactionLink] = useState('');

  useEffect(() => {
    async function timeout(seconds: number): Promise<void> {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, seconds * 1000);
      });
    }
    (async () => {
      if (authState.userAuthenticated) {
        setDisplayText('Loading web worker...');
        console.log('Loading web worker...');
        const zkappWorkerClient = new ZkappWorkerClient();
        await timeout(5);
        setDisplayText('Done loading web worker');
        console.log('Done loading web worker');
        console.log('Setting local account...');
        await zkappWorkerClient.setLocal(authState.localAccount!);
        console.log('Local account set', authState.localAccount);
        await zkappWorkerClient.loadContract();

        console.log('Compiling zkApp...');
        setDisplayText('Compiling zkApp...');
        await zkappWorkerClient.compileContract();
        console.log('zkApp compiled');
        setDisplayText('zkApp compiled...');

        const zkappPublicKey = PrivateKey.fromBase58(authState.localAccount).toPublicKey();
        console.log('zkApp public key');
try {
        await zkappWorkerClient.initZkappInstance(zkappPublicKey);
        console.log('zkApp initialized');
}
catch (e) {
  console.log('error', e);
}
        console.log('Getting zkApp state...');
        setDisplayText('Getting zkApp state...');
        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey });
        const currentNum = await zkappWorkerClient.getNum();
        console.log(`Current state in zkApp: ${currentNum.toString()}`);
        setDisplayText('');
      }
    })();
  }, []);



  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {authState.userAuthenticated && <>
          <h1> Send ZK Transaction </h1>

        </>}
        <h1>{!authState.userAuthenticated && "Not connected to a wallet!"}</h1>
      </div>
    </>);
}
export default SendTransaction;