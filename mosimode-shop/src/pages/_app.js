import '@/styles/globals.css'
import { store } from "../store/store";
import { Provider } from "react-redux";
import MessagePopup from '@/components/Popups/MessagePopup';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <MessagePopup />
    </Provider>
  )
}
