// midway iteration
import { useContext, useRef, useState } from "react";
import { Bool, CircuitString, Field, PublicKey, Struct } from 'o1js';
import React from 'react';
import Router from 'next/router';
import SendTransaction from "./SendTransaction";

const AuthenticatedSection = () => {
  const shortenAddress = (address: string) =>  {
    
    const prefix = address.slice(0, 6);
    const suffix = address.slice(-6);
    
    return `${prefix} ... ${suffix}`;
}
  return (
    <>
    <div style={{textAlign: "center", marginTop: "20px"}}>
    {(window as any)!.zkshield!.connected! && <>
      <SendTransaction />

      </> }
      <h1>{!(window as any)!.zkshield!.connected!&& "Not connected to a wallet!" }</h1>
    </div>
    </>  );
}
export default AuthenticatedSection;