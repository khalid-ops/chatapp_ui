import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/setup';


export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
