
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import GradientBG from '../components/GradientBG.js';
import styles from '../styles/Home.module.css';
import { ZkShield } from 'zkshield';
import UnshieldedHeader from "@/components/UnshieldedHeader";
import React from 'react';
import ShieldedHeading from '@/components/ShieldedHeading';
import { AccountUpdate, Mina, PrivateKey, PublicKey } from 'o1js';
import SendZkJsonComponent from '@/components/SendZkJsonComponent';
import SendTransaction from '@/components/SendTransaction';
import { Add } from '../../../contracts/build/src/Add.js';
// import { WalletImage } from '../modules/WalletImage.js';

export default function Home() {
  const privateKey = PrivateKey.fromBase58(process.env.NEXT_PUBLIC_LOCAL_ACCOUNT_KEY!);
  let deployerAccount: PublicKey,
  deployerKey: PrivateKey,
  senderAccount: PublicKey,
  senderKey: PrivateKey,
  zkAppAddress: PublicKey,
  zkAppPrivateKey: PrivateKey,
  zkApp: Add,
  proofsEnabled: boolean = false;

//   useEffect(() => {

//     (async () => {
        
//   const Local = Mina.LocalBlockchain({ proofsEnabled });
//     Mina.setActiveInstance(Local);
//     ({ privateKey: deployerKey, publicKey: deployerAccount } =
//       Local.testAccounts[0]);
//     ({ privateKey: senderKey, publicKey: senderAccount } =
//       Local.testAccounts[1]);
//     zkAppPrivateKey = PrivateKey.random();
//     zkAppAddress = zkAppPrivateKey.toPublicKey();
//     zkApp = new Add(zkAppAddress);

//     console.log("transaction creating");
//     const txn = await Mina.transaction(deployerAccount, () => {
//       AccountUpdate.fundNewAccount(deployerAccount);
//       zkApp.deploy();
//     });
//     console.log("transaction created");

//     await txn.prove();
//     console.log("transaction proved");

//     // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
//     await txn.sign([deployerKey, zkAppPrivateKey]).send();
//     console.log("transaction signed and sent");
    

//     })();
// }, []);
  return (
    <>
      <div id="zkshield-connect">
      <GradientBG>
      <UnshieldedHeader />

      <h1>Browser hangs on local blockchain deploy contract, after compile step.</h1>
      <ZkShield  mainContainerClassName={styles.main} 
                innerContainerClassName={styles.center} 
                selectNetworkClassName={styles.selectNetworkContainer}
                selectProviderClassName={styles.selectProviderContainer}
                headerText={"Loading things"} 
                ignoreConnectForTesting={false}
                localAccount={privateKey.toBase58()}
                >

<h1>Content</h1>
        <SendTransaction />
        </ZkShield>
      </GradientBG>
      </div>
    </>
  );
}
