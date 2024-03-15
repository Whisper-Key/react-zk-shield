
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import GradientBG from '../components/GradientBG.js';
import styles from '../styles/Home.module.css';
import { ZkShield } from 'zkshield';
import UnshieldedHeader from "@/components/UnshieldedHeader";
import React from 'react';
import ShieldedHeading from '@/components/ShieldedHeading';
import { PrivateKey } from 'o1js';
import SendZkJsonComponent from '@/components/SendZkJsonComponent';
// import { WalletImage } from '../modules/WalletImage.js';

export default function Home() {
  const privateKey = PrivateKey.random();
  return (
    <>
      <div id="zkshield-connect">
      <GradientBG>
      <UnshieldedHeader />

      <ZkShield  mainContainerClassName={styles.main} 
                innerContainerClassName={styles.center} 
                selectNetworkClassName={styles.selectNetworkContainer}
                selectProviderClassName={styles.selectProviderContainer}
                headerText={"Loading things"} 
                ignoreConnectForTesting={false}
                localAccount={privateKey.toBase58()}
                >

        <SendZkJsonComponent />
            
        </ZkShield>
      </GradientBG>
      </div>
    </>
  );
}
