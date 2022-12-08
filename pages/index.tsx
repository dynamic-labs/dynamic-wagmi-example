import { DynamicWidget } from '@dynamic-labs/sdk-react';
import { useAccount, useNetwork } from 'wagmi';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <DynamicWidget />
        <div>
          <p>Wagmi is connected: {isConnected ? 'Yes' : 'No'}</p>
          <p>Wagmi address: {address}</p>
          <p>Wagmi chain: {chain?.id}</p>
        </div>
      </main>
    </div>
  );
}
