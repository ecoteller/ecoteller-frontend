import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// Pages
import ComingSoon from '../pages/coming-soon/ComingSoon';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<ComingSoon />} errorElement={<div>Error</div>} />,
    <Route path="*" element={<div>Error</div>} />,
  ])
);

export default router;
