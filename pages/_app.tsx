import '../styles/global.css';
import { ThemeProvider } from '../components/ThemeContext';

export default function App({ Component, pageProps }: any) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
