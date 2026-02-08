import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function PhoneFrame({ children }: Props) {
  return (
    <div className="relative w-[390px] h-[660px] bg-gov-surface border border-gov-border rounded-phone shadow-gov overflow-hidden flex flex-col">
      {children}
    </div>
  );
}
