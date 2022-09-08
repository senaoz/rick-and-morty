import "../styles/globals.css";
import { LocProvider } from "../context/locationProvider";
import Layout from "../components/layout";

function App({ Component, pageProps }) {
  return (
    <LocProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LocProvider>
  );
}

export default App;
