import { WalletCreation } from './_components/WalletCreation';

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-8 p-8">
      <WalletCreation />
    </div>
  );
}
