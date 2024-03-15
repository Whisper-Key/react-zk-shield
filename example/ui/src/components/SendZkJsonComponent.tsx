// midway iteration
import { useContext, useRef, useState } from "react";
import { Bool, CircuitString, Field, PublicKey, Struct } from 'o1js';
// import { AuthContext } from "./Shield/AuthPage";
import { AuthContext } from "zkshield";
import React from 'react';
import Router from 'next/router';

const SendZkJsonComponent = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  console.log("authState", authState);
  const sendJson = async () =>  {
    const json = document.getElementById("json") as HTMLInputElement;
    const result = await (window as any).zkshield.walletProvider.sendZkTransaction(json.value);
    const resultDiv = document.getElementById("sendJsonResult");
    resultDiv!.innerHTML = JSON.stringify(result);
    console.log("json", json.value);
  }

  return (
    <>
    <div style={{textAlign: "center", marginTop: "20px"}}>
    {authState.userAuthenticated && <>
      <h1> Send a JSON Transaction </h1>
      
      <div>
        <p>
        <textarea id="json" placeholder="Enter JSON Transaction" style={{width: "80%", height: "200px"}}></textarea></p>
        <p><button onClick={sendJson}>Send</button></p>
        <div id="sendJsonResult"></div>
        </div>
      </> }
      <h1>{!authState.userAuthenticated && "Not connected to a wallet!" }</h1>
    </div>
    </>  );
}
export default SendZkJsonComponent;