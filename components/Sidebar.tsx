import React, { useState } from 'react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page, subPage?: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, isCollapsed, onToggleCollapse }) => {
  const [activeSalesSubMenu, setActiveSalesSubMenu] = useState('待分配资源');
  const [activeServiceSubMenu, setActiveServiceSubMenu] = useState('待分配客户');
  const [activeFinanceSubMenu, setActiveFinanceSubMenu] = useState('合同管理');
  const [activeRecordsSubMenu, setActiveRecordsSubMenu] = useState('跟进小记');
  const [activeManageSubMenu, setActiveManageSubMenu] = useState('部门管理');

  const primaryMenu = [
    { id: Page.DASHBOARD, label: '数据', icon: 'fa-chart-bar' },
    { id: Page.RESOURCES, label: '销售', icon: 'fa-shopping-bag' },
    { id: Page.SERVICE, label: '服务', icon: 'fa-hand-holding-heart' },
    { id: Page.FINANCE, label: '财务', icon: 'fa-file-invoice-dollar' },
    { id: Page.RECORDS, label: '记录', icon: 'fa-list-alt' },
    { id: Page.MANAGE, label: '管理', icon: 'fa-tasks' },
    { id: 'settings', label: '设置', icon: 'fa-cog' },
  ];

  const salesSubMenu = [
    '待分配资源', '我的资源', '到店预测', '到店登记', 
    '我的面谈', '我的协作', '公海资源', '回收站', 
    '我的合同', '我的收款', '短信记录'
  ];

  const serviceSubMenu = [
    '待分配客户', '我的客户', '约见管理', '关单库', '嘉宾库', '我的合同'
  ];

  const financeSubMenu = [
    '合同管理', '收款管理', '退款管理', '红娘业绩'
  ];

  const recordsSubMenu = [
    '跟进小记', '导入记录', '导出记录'
  ];

  const manageSubMenu = [
    '部门管理', '角色管理', '红娘管理'
  ];

  const handlePrimaryClick = (id: any) => {
    if (Object.values(Page).includes(id as Page)) {
      let sub;
      if (id === Page.RESOURCES) sub = activeSalesSubMenu;
      else if (id === Page.SERVICE) sub = activeServiceSubMenu;
      else if (id === Page.FINANCE) sub = activeFinanceSubMenu;
      else if (id === Page.RECORDS) sub = activeRecordsSubMenu;
      else if (id === Page.MANAGE) sub = activeManageSubMenu;
      onPageChange(id as Page, sub);
    }
  };

  const handleSubMenuClick = (page: Page, sub: string) => {
    if (page === Page.RESOURCES) setActiveSalesSubMenu(sub);
    else if (page === Page.SERVICE) setActiveServiceSubMenu(sub);
    else if (page === Page.FINANCE) setActiveFinanceSubMenu(sub);
    else if (page === Page.RECORDS) setActiveRecordsSubMenu(sub);
    else if (page === Page.MANAGE) setActiveManageSubMenu(sub);
    onPageChange(page, sub);
  };

  const isModulePage = (page: Page) => [Page.RESOURCES, Page.SERVICE, Page.FINANCE, Page.RECORDS, Page.MANAGE].includes(page);

  return (
    <div className="flex h-full shadow-lg z-20 shrink-0">
      {/* Menu-A: Primary Navigation */}
      <div className="w-[104px] bg-[#1a1c2d] text-white flex flex-col items-center shrink-0">
        <div className="py-5 mb-2">
          <div className="w-[72px] h-[32px] flex items-center justify-center">
             <i className="fas fa-dove text-2xl text-pink-400"></i>
          </div>
        </div>
        
        <div className="flex-1 w-full overflow-y-auto custom-scrollbar">
          {primaryMenu.map((item) => (
            <div
              key={item.id}
              onClick={() => handlePrimaryClick(item.id)}
              className={`w-full py-4 flex flex-col items-center cursor-pointer transition-all relative group ${
                currentPage === item.id ? 'bg-[#2a2d42] text-white' : 'text-gray-400 hover:text-white hover:bg-[#2a2d42]/50'
              }`}
            >
              <i className={`fas ${item.icon} text-lg mb-1`}></i>
              <span className="text-[11px] font-medium">{item.label}</span>
              {currentPage === item.id && (
                <span className="absolute right-0 top-0 bottom-0 w-1 bg-pink-500"></span>
              )}
            </div>
          ))}
        </div>

        <div className="py-8 w-full border-t border-gray-800 text-center">
           <div className="cursor-pointer group">
              <p className="text-white text-xs mb-1">
                <i className="fas fa-sync-alt text-[10px] mr-1"></i>切换
              </p>
              <span className="text-[10px] text-gray-400 group-hover:text-white">运营中心</span>
           </div>
        </div>
      </div>

      {/* Menu-B: Secondary Navigation */}
      {!isCollapsed && isModulePage(currentPage) && (
        <div className="w-40 bg-white flex flex-col border-r border-gray-100 animate-fadeIn">
          <div className="p-4 pt-6 pb-4">
            <h1 className="text-base font-bold text-gray-800">
              {currentPage === Page.RESOURCES ? '销售' : 
               currentPage === Page.SERVICE ? '服务' : 
               currentPage === Page.FINANCE ? '财务' : 
               currentPage === Page.RECORDS ? '记录' : '管理'}
            </h1>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <ul className="py-1">
              {(currentPage === Page.RESOURCES ? salesSubMenu : 
                currentPage === Page.SERVICE ? serviceSubMenu : 
                currentPage === Page.FINANCE ? financeSubMenu : 
                currentPage === Page.RECORDS ? recordsSubMenu : manageSubMenu).map((sub) => (
                <li
                  key={sub}
                  onClick={() => handleSubMenuClick(currentPage, sub)}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                    (currentPage === Page.RESOURCES ? activeSalesSubMenu : 
                     currentPage === Page.SERVICE ? activeServiceSubMenu : 
                     currentPage === Page.FINANCE ? activeFinanceSubMenu : 
                     currentPage === Page.RECORDS ? activeRecordsSubMenu : activeManageSubMenu) === sub 
                    ? 'text-indigo-600 bg-indigo-50 font-bold border-r-4 border-indigo-500' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {sub}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;