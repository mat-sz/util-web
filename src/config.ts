import { BrowserRouter, HashRouter } from 'react-router-dom';

export const Router: any = process.env.REACT_APP_USE_BROWSER_ROUTER
  ? BrowserRouter
  : HashRouter;
