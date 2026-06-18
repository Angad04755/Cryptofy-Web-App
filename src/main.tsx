import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux"
import { store } from './redux/store';

import App from './App.tsx';
import Navbar from './components/layout/Navbar.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Provider store={store}>
      <Toaster position="top-center" />
      <Navbar />
      <App />
      </Provider>
    </BrowserRouter>
);