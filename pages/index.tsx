import { DynamicWidget } from '@dynamic-labs/sdk-react';
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <DynamicWidget />
        <WagmiComponents />
      </main>
    </div>
  );
}

const WagmiComponents = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <div>
      <h2>useAccount & useNetwork</h2>
      <p data-cy='wagmi-connected'>
        wagmi connected: {isConnected ? 'true' : 'false'}
      </p>
      <p data-cy='wagmi-address'>wagmi address: {address}</p>
      <p data-cy='wagmi-network'>wagmi network: {chain?.id}</p>
      <hr />
      <WagmiNetworkSwitcher />
      <hr />
      <WagmiBalance address={address} />
    </div>
  );
};

const WagmiBalance = ({ address }: { address: `0x${string}` | undefined }) => {
  const { data, isError, isLoading } = useBalance({
    address,
    chainId: 1,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div data-cy='wagmi-balance'>
      <h2>useBalance</h2>
      wagmi balance: {data?.formatted} {data?.symbol}
    </div>
  );
};

const WagmiNetworkSwitcher = () => {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <>
      <h2>useNetwork & useSwitchNetwork</h2>
      {chain && <div>Connected to {chain.name}</div>}

      {chains.map((x) => (
        <button
          data-cy={`wagmi-network-switch-${x.name.toLowerCase()}`}
          disabled={!switchNetwork || x.id === chain?.id}
          key={x.id}
          onClick={() => switchNetwork?.(x.id)}
        >
          {x.name}
          {isLoading && pendingChainId === x.id && ' (switching)'}
        </button>
      ))}

      <div>{error && error.message}</div>
    </>
  );
};
