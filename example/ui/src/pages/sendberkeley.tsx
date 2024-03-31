
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import GradientBG from '../components/GradientBG.js';
import styles from '../styles/Home.module.css';
import { ZkShield } from 'zkshield';
import UnshieldedHeader from "@/components/UnshieldedHeader";
import React from 'react';
import AuthenticatedSection from '@/components/AuthenticatedSection';
import { PrivateKey } from 'o1js';

export default function Home() {
  const privateKey = PrivateKey.fromBase58(process.env.NEXT_PUBLIC_LOCAL_ACCOUNT_KEY!);

  return (
    <>
      
      <GradientBG>
      <UnshieldedHeader showConnect={false} />

      <ZkShield  mainContainerClassName={styles.main} 
                innerContainerClassName={styles.center} 
                selectNetworkClassName={styles.selectNetworkContainer}
                selectProviderClassName={styles.selectProviderContainer}
                headerText={"Loading things"} 
                ignoreConnectForTesting={false}
                localAccount={privateKey.toBase58()}
                autoLaunch={true}>

        <AuthenticatedSection />
            
        </ZkShield>
      </GradientBG>
    </>
  );
}
