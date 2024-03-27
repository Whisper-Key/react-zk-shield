
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import GradientBG from '../components/GradientBG.js';
import styles from '../styles/Home.module.css';
import { ZkShield } from 'zkshield';
import UnshieldedHeader from "@/components/UnshieldedHeader";
import React from 'react';
import AuthenticatedSection from '@/components/AuthenticatedSection';

export default function Home() {

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
                autoLaunch={true}>

        <AuthenticatedSection />
            
        </ZkShield>
      </GradientBG>
    </>
  );
}
