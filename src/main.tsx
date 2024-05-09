import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';
import { EducationRoutes } from './Routes.tsx';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import { ThemeProvider } from '@gravity-ui/uikit';

import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme='light'>
    <Router>
      <EducationRoutes />
    </Router>
  </ThemeProvider>
);
