// midway iteration
import { useContext, useRef, useState } from "react";
import { Bool, CircuitString, Field, PublicKey, Struct } from 'o1js';
import React from 'react';
import Router from 'next/router';

const SignMessageComponent = () => {
  const signMessage = async () =>  {
    const json = document.getElementById("json") as HTMLInputElement;
    console.log("json", json.value);  
    const result = await (window as any).zkshield.walletProvider.signMessage(json.value);
    const resultDiv = document.getElementById("signResult");
    resultDiv!.innerHTML = JSON.stringify(result.data);
    console.log("json", json.value);
  }

  return (
    <>
    <div style={{textAlign: "center", marginTop: "20px"}}>
    {(window as any)!.zkshield!.connected! && <> 
      <h1> Sign a message </h1>
      
      <div>
        <p>
        <textarea id="json" placeholder="Enter a message" style={{width: "80%", height: "200px"}}></textarea></p>
        <p><button onClick={signMessage}>Sign</button></p>
        <div id="signResult"></div>
        </div>
      </> }
      <h1>{!(window as any)!.zkshield!.connected! && "Not connected to a wallet!" }</h1>
    </div>
    </>  );
}
export default SignMessageComponent;