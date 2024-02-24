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

  return (
    <>
    <div>
      <h1>{authState.userAuthenticated && authState.userAddress }</h1>
      <h1>{!authState.userAuthenticated && "Not connected to a wallet!" }</h1>
    </div>
    </>  );
}
export default ShieldedHeading;