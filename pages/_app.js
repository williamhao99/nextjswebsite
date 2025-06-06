import { Noto_Sans, Noto_Serif } from 'next/font/google';
import '../styles/globals.css'

const noto_sans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-base',
  display: 'swap',
});

const noto_serif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${noto_sans.variable} ${noto_serif.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
