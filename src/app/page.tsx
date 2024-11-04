import { LoginButton } from '@/app/_components/LoginButton';
import { RegisterButton } from '@/app/_components/RegisterButton';
import Image from 'next/image';
import { SmartAccountAddress } from './_components/SmartAccountAddress';
import { UsernameContextProvider } from '@/context/UsernameContext';
import { UsernameInput } from './_components/UsernameInput';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">
        <h1 className="font-bold text-4xl">Ink Chain AA</h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by typing a username for your passkey.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <UsernameContextProvider>
          <div className="flex flex-col gap-4">
            <UsernameInput />

            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <RegisterButton />
              <LoginButton />
            </div>

            <SmartAccountAddress />
          </div>
        </UsernameContextProvider>
      </main>
    </div>
  );
}
