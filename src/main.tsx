import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';
import { EducationRoutes } from './Routes.tsx';

import { createCtx } from '@reatom/framework';
import { reatomContext } from '@reatom/npm-react';

import { ThemeProvider } from '@gravity-ui/uikit';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import './style.css';

const ctx = createCtx();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme='light'>
    <reatomContext.Provider value={ctx}>
      <Router>
        <EducationRoutes />
      </Router>
    </reatomContext.Provider>
  </ThemeProvider>
);
