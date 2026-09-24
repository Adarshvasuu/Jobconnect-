import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './routes/AppRoutes';
import HeroBackground from './components/landing/HeroBackground';
import './styles/global.css';

// Inject global keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoleProvider>
          <NotificationProvider>
            {/* Global Smooth Three.js WebGL Wave Background across all pages */}
            <HeroBackground color1="#3B82F6" color2="#F0F9FF" speed={0.8} />

            {/* Application Main Router */}
            <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <AppRoutes />
            </div>
          </NotificationProvider>
        </RoleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
