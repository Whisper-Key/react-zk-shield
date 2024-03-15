// // midway iteration
// import { useContext, useRef, useState } from "react";
// import { Bool, CircuitString, Field, PublicKey, Struct } from 'o1js';
// // import { AuthContext } from "./Shield/AuthPage";
// import { AuthContext } from "zkshield";
// import React from 'react';
// import Router from 'next/router';

// const AddInteraction = () => {
//   const [authState, setAuthState] = useContext(AuthContext);
//   console.log("authState", authState);
//   const shortenAddress = (address: string) =>  {
    
//     const prefix = address.slice(0, 6);
//     const suffix = address.slice(-6);
    
//     return `${prefix} ... ${suffix}`;
// }
//   return (
//     <>
//    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
//         <div style={{ padding: 0 }}>
//           Current state in zkApp: {state.currentNum!.toString()}{' '}
//         </div>
//         <button
          
//           onClick={onSendTransaction}
//           disabled={state.creatingTransaction}
//         >
//           Send Transaction
//         </button>
//         <button className={styles.card} onClick={onRefreshCurrentNum}>
//           Get Latest State
//         </button>
//       </div>
//     </>  );
// }
// export default AddInteraction;