// midway iteration
import { useContext, useRef, useState } from "react";
import { Bool, CircuitString, Field, PublicKey, Struct } from 'o1js';
// import { AuthContext } from "./Shield/AuthPage";
import { AuthContext } from "zkshield";
import React from 'react';
import Router from 'next/router';

const ShieldedHeading = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  console.log("authState", authState);
  const shortenAddress = (address: string) =>  {
    
    const prefix = address.slice(0, 6);
    const suffix = address.slice(-6);
    
    return `${prefix} ... ${suffix}`;
}
  return (
    <>
    <div style={{textAlign: "center"}}>
    {authState.userAuthenticated && <>
      <h1> Connected as {shortenAddress(authState.userAddress)} </h1>
      <h3>on network - {authState.connectedNetwork} </h3>
      </> }
      <h1>{!authState.userAuthenticated && "Not connected to a wallet!" }</h1>
    </div>
    </>  );
}
export default ShieldedHeading;