
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import GradientBG from '../components/GradientBG.js';
import styles from '../styles/Home.module.css';
import { ZkShield } from 'zkshield';
import UnshieldedHeader from "@/components/UnshieldedHeader";
import React from 'react';
import ShieldedHeading from '@/components/ShieldedHeading';

export default function Home() {

  return (
    <>
      
      <GradientBG>
      <UnshieldedHeader />

      <ZkShield  mainContainerClassName={styles.main} 
                innerContainerClassName={styles.center} 
                headerText={"Loading things"} 
                ignoreConnectForTesting={true}
                >

        <ShieldedHeading />
            
        </ZkShield>
      </GradientBG>
    </>
  );
}
