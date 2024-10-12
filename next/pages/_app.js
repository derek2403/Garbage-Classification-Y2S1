import UserWidget from '@/components/UserWidget';
import { UserProvider } from '../context/UserContext'; // Import the UserProvider
import styles from '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <UserWidget />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
