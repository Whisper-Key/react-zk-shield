
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import GradientBG from '../components/GradientBG.js';
import styles from '../styles/Home.module.css';
import { ZkShield } from 'zkshield';
import UnshieldedHeader from "@/components/UnshieldedHeader";
import React from 'react';
import ShieldedHeading from '@/components/ShieldedHeading';
import { PrivateKey, Mina, PublicKey, fetchAccount } from 'o1js';
// import { WalletImage } from '../modules/WalletImage.js';

export default function Home() {
  const privateKey = PrivateKey.fromBase58(process.env.NEXT_PUBLIC_LOCAL_ACCOUNT_KEY!);
  useEffect(() => {

    (async () => {
try {
      const Berkeley = Mina.Network(
        'https://api.minascan.io/node/berkeley/v1/graphql'
      );
      console.log('Berkeley Instance Created');
      Mina.setActiveInstance(Berkeley);
      
      const publicKey = PublicKey.fromBase58("B62qoQDqsgFc7aEToXe4wjxTeNCeNmzESXFiPd3sYs1MD7oZbyiPYEg");
    const fetcher = await fetchAccount({ publicKey });
    console.log(fetcher.account?.balance.toBigInt());
      }
      catch(e) {
        console.log("error", e);
      }

    })();
  }, []);

  return (
    <>
      <div id="zkshield-connect">
        <GradientBG>
          <UnshieldedHeader />

          <ZkShield mainContainerClassName={styles.main}
            innerContainerClassName={styles.center}
            selectNetworkClassName={styles.selectNetworkContainer}
            selectProviderClassName={styles.selectProviderContainer}
            headerText={"Loading things"}
            ignoreConnectForTesting={false}
            localAccount={privateKey.toBase58()}
          >

            <ShieldedHeading />

          </ZkShield>
        </GradientBG>
      </div>
    </>
  );
}
