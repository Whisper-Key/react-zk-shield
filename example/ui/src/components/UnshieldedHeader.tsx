// midway iteration
import { useContext, useRef, useState } from "react";
import { Bool, CircuitString, Field, PublicKey, Struct } from 'o1js';
// import { AuthContext } from "./Shield/AuthPage";
import { AuthContext } from "zkshield";
import React from 'react';
import Router from 'next/router';
import styles from '../styles/Home.module.css';

export interface UnshieldedHeaderProps {
  showConnect?: boolean;
}
const UnshieldedHeader: React.FC<UnshieldedHeaderProps> = ({ showConnect }) => {

  return (
    <>
      <div className={styles.header}>
        <a href="/" className={styles.logo}>ZK Shield</a>
        <div className={styles["header-right"]}>
          <a  href="/disableconnect">Disable Connect</a>
          <a href="/launch">Launch</a>
          <a href="/style">Style</a>
          <a href="/text">Text</a>
          {showConnect && <a href="#" className={styles.active} onClick={() => (window as any).zkshield.launch()}>Connect wallet</a>}
        </div>
      </div>

    </>);
}
export default UnshieldedHeader;