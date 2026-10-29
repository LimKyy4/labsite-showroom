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
    <div className="min-h-screen flex flex-col bg-canvas text-charcoal font-body antialiased pb-16 md:pb-0">
      {/* Floating Pill Fixed Top App Bar */}
      <NavbarPill />

      {/* Main Content Area with Viewport Offset Padding */}
      <main className="flex-1 pt-20 sm:pt-24">
        {renderActivePage()}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Mobile Floating Action Dock (Thumb Zone) */}
      <MobileBottomDock />

      {/* Global Modals, Floating Toasts & Dev Utility Dock */}
      <TestDriveBookingModal />
      <ToastNotification />
      <DevCacheResetButton />
    </div>
  );
};

export default App;
