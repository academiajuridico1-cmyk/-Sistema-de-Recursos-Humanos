import type {Metadata} from 'next';
import './globals.css';
import { inter, spaceGrotesk } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Gestão de Recursos Humanos',
  description: 'Sistema de Gestão de RH',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-slate-900 bg-slate-50">
        {children}
      </body>
    </html>
  );
}
