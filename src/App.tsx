import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShowroomStore } from './store/useShowroomStore';
import { NavbarPill } from './components/common/NavbarPill';
import { Footer } from './components/common/Footer';
import { ToastNotification } from './components/common/ToastNotification';
import { MobileBottomDock } from './components/common/MobileBottomDock';
import { TestDriveBookingModal } from './components/contact/TestDriveBookingModal';
import { DevCacheResetButton } from './components/common/DevCacheResetButton';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { CarDetailPage } from './pages/CarDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  const { activeTab } = useShowroomStore();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'inventory':
        return <InventoryPage />;
      case 'detail':
        return <CarDetailPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      style={{ position: 'relative' }}
      className="min-h-screen flex flex-col bg-canvas text-charcoal font-body antialiased pb-28 sm:pb-36 md:pb-0 relative"
    >
      {/* Floating Pill Fixed Top App Bar */}
      <NavbarPill />

      {/* Main Content Area with Viewport Offset & Zero-Flicker AnimatePresence */}
      <main
        style={{
          position: 'relative',
          paddingTop: 'calc(5.5rem + env(safe-area-inset-top, 0px))',
        }}
        className="relative flex-1"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
            style={{ position: 'relative' }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Smart Mobile Action Dock (Auto-Hide on Scroll Down / Collapsible) */}
      <MobileBottomDock />

      {/* Global Modals, Floating Toasts & Dev Utility Dock */}
      <TestDriveBookingModal />
      <ToastNotification />
      <DevCacheResetButton />
    </div>
  );
};

export default App;
