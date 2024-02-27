// midway iteration
import { useContext, useRef, useState } from "react";
import { Bool, CircuitString, Field, PublicKey, Struct } from 'o1js';
// import { AuthContext } from "./Shield/AuthPage";
import { AuthContext } from "zkshield";
import React from 'react';
import Router from 'next/router';


const UnshieldedHeader = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  console.log("authState", authState);

  return (
    <>
  {!authState.userAuthenticated &&   <div>
      
      {!authState.userAuthenticated &&
      <button onClick={() => (window as any).zkshield.launch()}>Connect wallet</button>
}
    </div>
}
    </>  );
}
export default UnshieldedHeader;