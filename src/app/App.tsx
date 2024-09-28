import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { CREATE_INVOICE_PATH, HOME_PATH } from '@/routes';
import { Header, CreateInvoice, ViewInvoices } from '@/components';

// App component which renders the main app structure
const App: React.FC = () => {
  return (
    <Router>
      {/* Main app container */}
      <div className="min-h-screen bg-white text-neutral-900 overflow-hidden">
        {/* Header component */}
        <Header />
        {/* Routes for the app */}
        <Routes>
          {/* Home route */}
          <Route path={HOME_PATH} element={<ViewInvoices />} />
          {/* Create Invoice route */}
          <Route path={CREATE_INVOICE_PATH} element={<CreateInvoice />} />
        </Routes>
      </div>
      {/* Toaster component */}
      <Toaster />
    </Router>
  );
};

export default App;