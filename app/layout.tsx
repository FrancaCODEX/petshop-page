import type { Metadata } from 'next';
import { business } from '@/config/business';
import './globals.css';
export const metadata: Metadata = {
  title: `${business.name} — ${business.demo ? 'demonstração de pet shop' : 'Pet shop'}`,
  description: business.description,
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
