import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// Pages
import Home from '../pages/home/Home';
import ComingSoon from '../pages/coming-soon/ComingSoon';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<ComingSoon />} errorElement={<div>Error</div>} />,
    <Route path="/home" element={<Home />} />,
    <Route path="*" element={<div>Error</div>} />,
  ])
);

export default router;
