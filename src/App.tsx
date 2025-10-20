import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import TestPreparation from './pages/TestPreparation';
import AdmissionGuidance from './pages/AdmissionGuidance';
import VisaAssistance from './pages/VisaAssistance';
import FinancialAssistance from './pages/FinancialAssistance';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPost';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ScrollToTop from './hooks/ScrollToTop';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop/>
        
        <Routes>
          {/* Admin routes - no header/footer */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Regular routes - with header/footer */}
          <Route path="/*" element={
            <div className="min-h-screen pt-[var(--header-height)]">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test-preparation" element={<TestPreparation />} />
                <Route path="/admission-guidance" element={<AdmissionGuidance />} />
                <Route path="/visa-assistance" element={<VisaAssistance />} />
                <Route path="/financial-assistance" element={<FinancialAssistance />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destinations/:country" element={<DestinationDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
