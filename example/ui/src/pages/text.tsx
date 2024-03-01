import ShieldedHeading from "@/components/ShieldedHeading";
import { ZkShield } from "zkshield";
import styles from '../styles/Home.module.css';
import UnshieldedHeader from "@/components/UnshieldedHeader";
import GradientBG from '../components/GradientBG.js';

export default function CssTest() {

    return (
        <>
            <GradientBG>
                <UnshieldedHeader showConnect={false} />
                <ZkShield
                    mainContainerClassName={styles.main} 
                    innerContainerClassName={styles.center} 
                    selectNetworkClassName={styles.selectNetworkContainer}
                    selectProviderClassName={styles.selectProviderContainer}
                    headerText={"Loading things"}
                    walletNotFoundText={"Where's your wallet?"}
                    createWalletText={"You should create a wallet"}
                    requestingAccountText={"Initiating Account Request"}
                    fundAccountText={"You need some funds"}
                >
                    <ShieldedHeading />
                </ZkShield>
            </GradientBG>
        </>);
}