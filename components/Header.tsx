import React from 'react';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-white h-14 border-b border-gray-200 px-4 flex items-center justify-between sticky top-0 z-30 shrink-0">
      <div className="flex items-center flex-1">
        <span className="text-gray-400 cursor-pointer mr-5 hover:text-indigo-600 p-2">
          <i className="fas fa-outdent text-lg"></i>
        </span>
        <div className="flex items-center bg-[#f5f7fa] rounded px-3 py-1.5 w-full max-w-md border border-gray-100">
          <select className="bg-transparent border-none text-xs font-bold text-gray-600 focus:ring-0 cursor-pointer pr-2">
            <option>手机号</option>
            <option>姓名</option>
            <option>资源ID</option>
          </select>
          <div className="w-px h-4 bg-gray-300 mx-3"></div>
          <input 
            type="text" 
            placeholder="请输入搜索关键词" 
            className="bg-transparent border-none text-xs w-full focus:ring-0 outline-none placeholder:text-gray-400"
          />
          <i className="fas fa-search text-gray-400 cursor-pointer hover:text-indigo-500 text-sm ml-2"></i>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <p className="text-xs font-bold text-gray-500 px-2">测试门店</p>

        <div className="flex items-center cursor-pointer group px-2 border-l border-gray-100">
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/manager/100/100" 
              alt="Avatar" 
              className="w-8 h-8 rounded border border-gray-200"
            />
          </div>
          <div className="ml-3 text-left">
            <p className="text-[11px] font-bold text-gray-800 leading-tight">门店管理员(mc6yhe)</p>
            <p className="text-[9px] text-gray-400 mt-0.5 leading-none">部门: 管理层 | 角色: 负责人</p>
          </div>
          <i className="fas fa-chevron-right text-[8px] text-gray-300 ml-4 rotate-90 group-hover:text-indigo-500 transition-colors"></i>
          
          <button 
            onClick={onLogout}
            className="ml-6 text-gray-400 hover:text-red-500 transition-colors"
            title="退出登录"
          >
            <i className="fas fa-power-off text-sm"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
