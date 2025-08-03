import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './components/Register/context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';
import { TaskProvider } from './components/Register/context/TaskContext.jsx'
import { EncuestasProvider } from './context/EncuestasContext';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>

    <AuthProvider>
      <TaskProvider>
        <EncuestasProvider>
          <App />
        </EncuestasProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0086E7',
              color: '#fff',
              borderRadius: '8px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: 'white',
                secondary: '#0086E7',
              },
            },
          }}
        />
      </TaskProvider>
    </AuthProvider>
  </BrowserRouter>
)
