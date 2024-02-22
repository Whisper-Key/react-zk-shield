// midway iteration
import { useContext, useRef, useState } from "react";
import { Bool, CircuitString, Field, PublicKey, Struct } from 'o1js';
// import { AuthContext } from "./Shield/AuthPage";
import { AuthContext } from "zkshield";
import React from 'react';
import Router from 'next/router';


const ShieldedHeading = () => {
  const [authState, setAuthState] = useContext(AuthContext);


  return (
    <>
    <div>
      <h1>{authState.userAuthenticated && authState.userAddress }</h1>
    </div>
    </>  );
}
export default ShieldedHeading;