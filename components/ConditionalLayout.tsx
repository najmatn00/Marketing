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

  // Check if current route is an admin or visitor route
  const isAdminRoute = pathname?.startsWith('/admin');
  const isVisitorRoute = pathname?.startsWith('/visitor');

  // If it's an admin or visitor route, render children without Header and Footer
  if (isAdminRoute || isVisitorRoute) {
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
