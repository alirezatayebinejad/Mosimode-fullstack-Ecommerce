import '@/styles/globals.css';
import { store } from "../store/store";
import { Provider } from "react-redux";
import MessagePopup from '@/components/Popups/MessagePopup';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Component {...pageProps} />
        <MessagePopup />
      </Provider>
    </SessionProvider>
  )
}
