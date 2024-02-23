import ShieldedHeading from "@/components/ShieldedHeading";
import { ZkShield } from "zkshield";
import styles from '../styles/Home.module.css';

export default function CssTest() {

    return (
        <>
            <ZkShield
                headerText={"Loading things"}
                walletNotFoundText={"Where's your wallet?"}
                createWalletText={"You should create a wallet"}
                requestingAccountText={"Initiating Account Request"}
                fundAccountText={"You need some funds"}
                >
                <ShieldedHeading />
            </ZkShield>
        </>);
}