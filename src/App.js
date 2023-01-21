import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
      <ToastContainer
        position="top-right"
        theme="light"
        autoClose={3000}
        // hideProgressBar={true}
        newestOnTop="true"
        closeOnClick
        rtl="true"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
}
