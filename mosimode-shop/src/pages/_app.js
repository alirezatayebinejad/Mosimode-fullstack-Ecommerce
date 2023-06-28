import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { store } from "../store/store";
import { Provider } from "react-redux";
import MessagePopup from '@/components/Popups/MessagePopup';
import { SessionProvider } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '../components/Loading/Loading';
import { Vazirmatn } from "next/font/google"
import { League_Spartan } from "next/font/google"

const vazirmatn = Vazirmatn({
  subsets: ['latin', 'arabic'],

})
const league_Spartan = League_Spartan({
  subsets: ['latin'],

})

function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (

    <SessionProvider>
      <Provider store={store}>
        <div dir={router.locale === "en" ? "lrt" : "rtl"} className={router.locale === "fa" ? vazirmatn.className : league_Spartan.className}>
          {loading ? <Loading spinnerType={"spinner1"} /> : null}
          <Component {...pageProps} />
          <MessagePopup />
        </div>
      </Provider>
    </SessionProvider >

  )
}
export default appWithTranslation(App);