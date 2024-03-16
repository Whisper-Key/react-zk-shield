// midway iteration
import { useContext, useRef, useState } from "react";
import { Bool, CircuitString, Field, PublicKey, Struct } from 'o1js';
// import { AuthContext } from "./Shield/AuthPage";
import { AuthContext } from "zkshield";
import React from 'react';
import Router from 'next/router';

const SignMessageComponent = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  console.log("authState", authState);
  const signMessage = async () =>  {
    const json = document.getElementById("json") as HTMLInputElement;
    const result = await (window as any).zkshield.walletProvider.signMessage(json.value);
    const resultDiv = document.getElementById("signResult");
    resultDiv!.innerHTML = JSON.stringify(result.data.toJSON());
    console.log("json", json.value);
  }

  return (
    <>
    <div style={{textAlign: "center", marginTop: "20px"}}>
    {authState.userAuthenticated && <>
      <h1> Sign a message </h1>
      
      <div>
        <p>
        <textarea id="json" placeholder="Enter a message" style={{width: "80%", height: "200px"}}></textarea></p>
        <p><button onClick={signMessage}>Sign</button></p>
        <div id="signResult"></div>
        </div>
      </> }
      <h1>{!authState.userAuthenticated && "Not connected to a wallet!" }</h1>
    </div>
    </>  );
}
export default SignMessageComponent;