import "@/styles/globals.css";
import Common from "../../component/common";
import Analytic from "../../component/analytic";
import Ads from "../../component/ads";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Common />
      <Analytic />
      <Ads />
      <Component {...pageProps} />
    </>
  );
};

export default App;
