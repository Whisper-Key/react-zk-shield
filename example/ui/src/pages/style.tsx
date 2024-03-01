import ShieldedHeading from "@/components/ShieldedHeading";
import { ZkShield } from "zkshield";
import styles from '../styles/Home.module.css';
import UnshieldedHeader from "@/components/UnshieldedHeader";
import GradientBG from '../components/GradientBG.js';

export default function CssTest() {

    return (
        <>
            <GradientBG>
                <UnshieldedHeader />
                <ZkShield
                    mainContainerClassName={styles.main}
                    innerContainerClassName={styles.center}
                    headerClassName={styles.headerShield}
                    statusClassName={styles.statusShield}
                >
                    <ShieldedHeading />
                </ZkShield>
            </GradientBG>
        </>);
}