import { BrowserRouter } from 'react-router-dom';

import { Router } from './router';

import { FooterComponent, NavbarComponent } from './components';

import {
  Layout
} from 'antd';




// Ant Design Css 
import 'antd/dist/antd.css';


function App() {
const { Header, Footer } = Layout;

  return (
    <BrowserRouter>
      <div className="App">
        
        <Header>
          <NavbarComponent />
        </Header>

        <Router />
        
        <FooterComponent />
      </div>
    </BrowserRouter>
    
  );
}

export default App;
