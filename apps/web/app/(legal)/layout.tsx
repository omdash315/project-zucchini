import React from "react";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="font-inria bg-black text-white">
      <div className="pt-20">{children}</div>
    </main>
  );
}
