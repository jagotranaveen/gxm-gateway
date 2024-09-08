
import { PrimeReactProvider } from "primereact/api";
import Layout from "./Layout";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import './i18n';

const App = () => {
  return (
    <PrimeReactProvider>
        <BrowserRouter>
            <Layout>
              <Router /> 
            </Layout>
      </BrowserRouter>
    </PrimeReactProvider>
  );
};

export default App;
