import ShieldedHeading from "@/components/ShieldedHeading";
import { ZkShield } from "zkshield";
import styles from '../styles/Home.module.css';

export default function CssTest() {

    return (
        <>
            <ZkShield
                mainContainerClassName={styles.main} 
                innerContainerClassName={styles.center}
                headerClassName={styles.headerShield}
                statusClassName={styles.statusShield}
                >
                <ShieldedHeading />
            </ZkShield>
        </>);
}