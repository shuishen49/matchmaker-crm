import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ResourceManager from './components/ResourceManager';
import ServiceManager from './components/ServiceManager';
import FinanceManager from './components/FinanceManager';
import RecordManager from './components/RecordManager';
import ManageManager from './components/ManageManager';
import SettingsManager from './components/SettingsManager';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LOGIN);
  const [activeSubPage, setActiveSubPage] = useState('待分配资源');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handlePageChange = (page: Page, subPage?: string) => {
    setCurrentPage(page);
    if (subPage) setActiveSubPage(subPage);
  };

  if (currentPage === Page.LOGIN) {
    return <Login onLogin={() => setCurrentPage(Page.DASHBOARD)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header onLogout={() => setCurrentPage(Page.LOGIN)} />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full p-4 overflow-hidden">
            {currentPage === Page.DASHBOARD && (
              <div className="h-full overflow-y-auto custom-scrollbar">
                <Dashboard />
              </div>
            )}
            {currentPage === Page.RESOURCES && (
              <div className="h-full">
                <ResourceManager activeSubPage={activeSubPage} />
              </div>
            )}
            {currentPage === Page.SERVICE && (
              <div className="h-full">
                <ServiceManager activeSubPage={activeSubPage} />
              </div>
            )}
            {currentPage === Page.FINANCE && (
              <div className="h-full">
                <FinanceManager activeSubPage={activeSubPage} />
              </div>
            )}
            {currentPage === Page.RECORDS && (
              <div className="h-full">
                <RecordManager activeSubPage={activeSubPage} />
              </div>
            )}
            {currentPage === Page.MANAGE && (
              <div className="h-full">
                <ManageManager activeSubPage={activeSubPage} />
              </div>
            )}
            {currentPage === Page.SETTINGS && (
              <div className="h-full">
                <SettingsManager activeSubPage={activeSubPage} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;