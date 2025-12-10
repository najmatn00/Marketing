'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current route is an admin route
  const isAdminRoute = pathname?.startsWith('/admin');

  // If it's an admin route, render children without Header and Footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For all other routes, render with Header and Footer
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
