import React from 'react';
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

      {/* Main Content Area with Viewport Offset & Non-Static Positioning */}
      <main
        style={{
          position: 'relative',
          paddingTop: 'calc(4.75rem + env(safe-area-inset-top, 0px))',
        }}
        className="relative flex-1"
      >
        {renderActivePage()}
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
