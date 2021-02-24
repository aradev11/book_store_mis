import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

// import { AuthContext } from './context/auth-context';

import Router from './router/routes';
import FooterComponent from './components/footer/footer';

import {
  Layout
} from 'antd';

// Ant Design Css 
import 'antd/dist/antd.css';


const App = () => {
  // const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
 
  return (
    <StrictMode>
      <BrowserRouter>
        <Layout className="App" style={{ height: "100%" }}>
          <Router />
          <FooterComponent />
        </Layout>
      </BrowserRouter>
    </StrictMode>
    
  );
}

export default App;
