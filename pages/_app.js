import "../styles/globals.css";
import { LocProvider } from "../context/locationProvider";

function App({ Component, pageProps }) {
  return (
    <LocProvider>
      <Component {...pageProps} />
    </LocProvider>
  );
}

export default App;
