
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import GradientBG from '../components/GradientBG.js';
import styles from '../styles/Home.module.css';
// import { AuthPage } from '../components/Shield/AuthPage.js';
import { FakeConsoleWalletProvider, SignedMessageResult, WalletConnectResult, WalletTransactionResult, ZkShield } from 'zkshield';

import heroMinaLogo from '../../public/assets/hero-mina-logo.svg';
import arrowRightSmall from '../../public/assets/arrow-right-small.svg';
import React from 'react';
import ShieldedHeading from '@/components/ShieldedHeading';
import { AwesomeWalletProvider } from '@/modules/AwesomeWalletProvider';

export default function Home() {

  const provider = new AwesomeWalletProvider();

  return (
    <>

      <GradientBG>
      <ZkShield  mainContainerClassName={styles.main} 
                innerContainerClassName={styles.center} 
                headerText={"Loading things"} 
                ignoreConnectForTesting={false}
                minaWalletProvider={provider}>
          <main className={styles.main}>
            <div className={styles.center}>
            <ShieldedHeading />

              
            </div>
          </main>
        </ZkShield>
      </GradientBG>
    </>
  );
}
