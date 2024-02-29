# ZK Shield (soon to be zkonnect)

## Introduction

ZK Shield is a simple React component that allows you to quickly and easily integrate your zkApp with a browser based wallet on the Mina Protocol. It provides wrapper component that hides sub-components until it is connected to a wallet. Data about the connected wallet is made available to all sub-components, along with many other features listed below.

## Installation

Install zkshield via npm or your favorite package manager

```bash
npm i zkshield

yarn add zkshield

pnpm add zkshield
```



## Usage

Add zkshield to your component or page, and that's it your zkApp will automatically attempt to connect to an available and supported browser wallet. Currently only [Auro Wallet](https://www.aurowallet.com/) is supported, with a bundled local blockchain wallet on the way. Of course you can always [write your own wallet provider](#writing-a-new-wallet-provider)!

```jsx static
import React from 'react';
import { ZkShield } from 'zkshield';
import ConnectedComponent from '@/components/ConnectedComponent';

export default function ParentComponent() {
 
  return (
    <ZkShield>
 		<ConnectedComponent />
  	</ZkShield>
  );
}
```

Use the data from the connected wallet in your wrapped components

```jsx static
import React from 'react';
import { AuthContext } from "zkshield";

const ConnectedComponent = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  return (
    <>
    <div>
      <h1>{authState.userAuthenticated && <> Connected as {authState.userAddress} on network {authState.connectedNetwork} </> }</h1>
    </div>
    </>  );
}
export default ConnectedComponent;

```

### Additional components (Coming Soon)

- Choose network dropdown - place it anywhere on your page, it will hide itself after connected... can it be hidden?
- Connect button - initiates the connection to a wallet and hides itself after ... can it be hidden?

## Demo

You can see a simple demo of the available features at [zkonnect.onrender.com](https://zkonnect.onrender.com/)

## Props and configuration

ZK Shield offers a number of props that can be set to customize your experience.

| Prop                      | Description                                                  | Type              |
| ------------------------- | ------------------------------------------------------------ | ----------------- |
| `ignoreConnectForTesting` | Disables connecting to wallet, useful for testing none blockchain components | `bool`            |
| `autoLaunch`              | Automatically launch the connect workflow, can be used engage the user with other content before connecting to the zkApp. May replace `ignoreConnectForTesting` in future. | `bool`            |
| `minaWalletProvider`      | Provide your own implementation of a wallet provider for wallets that are not yet supported by ZK Shield | `IWalletProvider` |
| `localAccounts`           | PublicKey accounts to be attached to the local blockchain instance | `string[]`        |
| `children`                | Components that are hidden until the wallet is connected that will have access to the data for the connected wallet | `node`            |
| `mainContainerClassName`  | The class to apply to the main container                     | `string`          |
| `innerContainerClassName` | The class to apply to the inner container                    | `string`          |
| `selectNetworkClassName`  | The class to apply to the select network container           | `string`          |
| `selectProviderClassName` | The class to apply to the select provider container          | `string`          |
| `headerClassName`         | The class to apply to the select header container            | `string`          |
| `statusClassName`         | The class to apply to the select status container            | `string`          |
| `headerText`              | The text for the header                                      | `string`          |
| `walletNotFoundText`      | The text for wallet not found                                | `string`          |
| `createWalletText`        | The text for create your wallet                              | `string`          |
| `requestingAccountText`   | The text for requesting account                              | `string`          |
| `fundAccountText`         | The text for funding account                                 | `string`          |



## SDK Methods

ZK Shield makes some methods available to interact with the wallet component programmatically. This will allow you to decouple the wallet connection code from the contract interaction.

- `window.zkshield.launch()` - initiate a connection to a wallet when `autoLaunch` is set to `false`
- `window.zkshield.getSupportedNetworks()` - coming soon
- `window.zkshield.chooseNetwork(network)` - coming soon
- `window.zkshield.sendZkTransaction()` - coming soon
- `window.zkshield.signTransaction(message)` - coming soon
- `window.zkshield.onAccountChanged` - ?



## Writing a new Wallet Provider

**(Work in progress, has bugs)** Currently only **Auro Wallet** is supported, a custom Local Blockchain wallet will be bundled in a future release to support interacting with the local blockchain from a zkApp. To write a new wallet provider you have to implement `IWalletProvider` and pass an instance as a prop to ZK Shield. 

``` typescript
import { IWalletProvider, ChainSelectedResult, SignedMessageResult, WalletConnectResult, WalletTransactionResult } from "zkshield";
export class AwesomeWalletProvider implements IWalletProvider {
   
    name: string = "Awesome Wallet";
    description: string = "An awesome wallet to behold.";

    hasWallet(): boolean {
        throw new Error("Method not implemented.");
    }
    connect(): Promise<WalletConnectResult> {
        throw new Error("Method not implemented.");
    }
    sendZkTransaction(json: string, fee: number, memo: string): Promise<WalletTransactionResult> {
        throw new Error("Method not implemented.");
    }
    signMessage(message: string): Promise<SignedMessageResult> {
        throw new Error("Method not implemented.");
    }
    selectChain(chainID: string): Promise<ChainSelectedResult> {
        throw new Error("Method not implemented.");
    }
}
```

Pass an instance of `AwesomeWalletProvider` to ZK Shield and you're off!

```jsx

import React from 'react';
import { AwesomeWalletProvider } from '@/modules/AwesomeWalletProvider.js';

export default function Home() {

  	const provider = new AwesomeWalletProvider();
    return (
        <>
            <ZkShield minaWalletProvider={provider}>
                // Child components...
            </ZkShield>
        </>);
}
    
```

