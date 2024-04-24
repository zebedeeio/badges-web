'use client';

import { ZBDLogo } from "./icons/zbd"

export const Header = () => {
  return (
    <header className="max-w-[800px] mx-auto my-4">
      <div className="flex flex-row items-center">
        <ZBDLogo />
        <span className="ml-3 pt-1 text-lg font-bold uppercase tracking-tight">Badges</span>
      </div>
    </header>
  )
}