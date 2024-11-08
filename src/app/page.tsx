import { SmartAccountAddress } from './_components/SmartAccountAddress';
import { CardFlip } from '@/components/CardFlip';
import { RegisterForm } from './_components/RegisterForm';
import { LoginForm } from './_components/LoginForm';

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-8 p-8">
      <CardFlip front={<RegisterForm />} back={<LoginForm />} />
      <div className="flex flex-col gap-4"></div>
      <SmartAccountAddress />
    </div>
  );
}
