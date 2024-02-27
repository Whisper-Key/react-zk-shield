import ShieldedHeading from "@/components/ShieldedHeading";
import { ZkShield } from "zkshield";
import styles from '../styles/Home.module.css';
import UnshieldedHeader from "@/components/UnshieldedHeader";

export default function CssTest() {

    return (
        <>
            <ZkShield
                mainContainerClassName={styles.main} 
                innerContainerClassName={styles.center}
                selectNetworkClassName={styles.selectNetworkContainer}
                selectProviderClassName={styles.selectProviderContainer}
                autoLaunch={false}
                >
                <UnshieldedHeader />
                <ShieldedHeading />
            </ZkShield>
        </>);
}