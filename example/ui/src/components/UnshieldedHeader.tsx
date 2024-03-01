// midway iteration
import { useContext, useRef, useState } from "react";
import { Bool, CircuitString, Field, PublicKey, Struct } from 'o1js';
// import { AuthContext } from "./Shield/AuthPage";
import { AuthContext } from "zkshield";
import React from 'react';
import Router from 'next/router';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export interface UnshieldedHeaderProps {
  showConnect?: boolean;
}
const UnshieldedHeader: React.FC<UnshieldedHeaderProps> = ({ showConnect }) => {

  return (
    <>
      <div className={styles.header}>
      <Link href="/" className={styles.logo}>ZK Shield</Link>
        <div className={styles["header-right"]}>
          <Link  href="/disableconnect">Disable Connect</Link>
          <Link href="/launch">Launch</Link>
          <Link href="/style">Style</Link>
          <Link href="/text">Text</Link>
          {showConnect &&  <Link href="#" className={styles.active} onClick={() => (window as any).zkshield.launch()}>Connect wallet</Link>}
        </div>
      </div>

    </>);
}
export default UnshieldedHeader;