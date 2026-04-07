import React, { useState } from 'react';

interface ManageManagerProps {
  activeSubPage: string;
}

const ManageManager: React.FC<ManageManagerProps> = ({ activeSubPage }) => {
  const isDeptManage = activeSubPage === '部门管理';
  const isRoleManage = activeSubPage === '角色管理';
  const isStaffManage = activeSubPage === '红娘管理';

  const DeptRow = ({ depth = 0, id, name, manager = "--", phone = "--", count = 0, time, hasChildren = false }: any) => {
    return (
      <div className="w-full">
        <div className="flex items-center hover:bg-indigo-50/30 transition-colors group">
          <div className="flex-1 py-3 flex items-center" style={{ paddingLeft: `${depth * 24}px` }}>
            <i className={`fas ${hasChildren ? 'fa-caret-down text-gray-400' : 'fa-circle text-[6px] text-gray-200'} mr-2 w-4 text-center`}></i>
            <span className="text-sm text-gray-700">
              {name}&nbsp;
              <span className="text-[11px] text-gray-400 font-normal">(ID:{id})</span>
            </span>
          </div>
          <div className="flex items-center w-[750px] shrink-0">
            <span className="w-24 text-center text-[13px] text-gray-500">{manager}</span>
            <span className="w-32 text-center text-[13px] text-gray-500">{phone}</span>
            <span className="w-20 text-center text-[13px] text-gray-500 font-medium">{count}</span>
            <span className="w-44 text-center text-[13px] text-gray-400">{time}</span>
            <div className="flex-1 flex items-center justify-center space-x-3 pr-4">
               <button className="text-indigo-600 text-[13px] font-bold hover:underline">添加子部门</button>
               <button className="text-indigo-600 text-[13px] font-bold hover:underline">编辑</button>
               <button className="text-rose-500 text-[13px] font-bold hover:underline">删除</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const roles = [
    { id: '2159', name: '负责人', scope: '门店数据', desc: '--', time: '2026-01-16 13:53' },
    { id: '2160', name: '店长', scope: '本人+部门数据', desc: '--', time: '2026-01-16 13:53' },
    { id: '2161', name: '销售红娘', scope: '本人数据', desc: '--', time: '2026-01-16 13:53' },
    { id: '2162', name: '服务红娘', scope: '本人数据', desc: '--', time: '2026-01-16 13:53' },
    { id: '2163', name: '运营', scope: '本人数据', desc: '--', time: '2026-01-16 13:53' },
  ];

  const staff = [
    { id: 'RM-301', name: '王薇', dept: '销售部', role: '销售红娘', phone: '138****1023', status: '在职', entry: '2025-05-16' },
    { id: 'RM-302', name: '林冉', dept: '销售部', role: '销售红娘', phone: '139****7741', status: '在职', entry: '2025-09-08' },
    { id: 'RM-303', name: '赵辰', dept: '服务部', role: '服务红娘', phone: '137****6652', status: '在职', entry: '2024-11-03' },
    { id: 'RM-304', name: '李念', dept: '服务部', role: '服务红娘', phone: '186****2309', status: '在职', entry: '2025-02-19' },
    { id: 'RM-305', name: '陈若', dept: '财务部', role: '运营', phone: '133****5820', status: '试用', entry: '2026-01-22' },
    { id: 'RM-306', name: '周可', dept: '运营部', role: '店长', phone: '136****4418', status: '在职', entry: '2024-07-11' },
  ];

  return (
    <div className="flex flex-col h-full -m-4 bg-[#f0f2f5] overflow-hidden">
      {/* 顶部标签栏 */}
      <div className="flex items-center bg-white border-b border-gray-200 h-12 px-4 space-x-1 shrink-0">
        <div className="flex-1 flex items-center overflow-x-auto no-scrollbar space-x-1">
          {['部门管理', '角色管理', '红娘管理'].map(tab => (
            <div 
              key={tab}
              className={`flex items-center h-8 px-4 text-xs cursor-pointer border rounded-t-md transition-all whitespace-nowrap ${
                activeSubPage === tab 
                  ? 'bg-white text-indigo-600 border-gray-200 border-b-white z-10 font-bold shadow-[0_-2px_5px_rgba(0,0,0,0.02)]' 
                  : 'text-gray-500 border-transparent bg-gray-50/50 hover:bg-gray-100'
              }`}
              style={activeSubPage === tab ? { marginBottom: '-1px' } : {}}
            >
              <span className="mt-0.5">{tab}</span>
              <i className="fas fa-times ml-2 text-[9px] text-gray-400"></i>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
        {/* 部门管理特有工具栏 */}
        {isDeptManage && (
          <>
            <div className="bg-white rounded-t shadow-sm border border-gray-100 flex items-center justify-between px-4 h-12 sticky top-0 z-20">
              <div className="flex items-center space-x-3">
                  <button className="px-4 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded text-[13px] font-bold hover:bg-indigo-100">添加部门</button>
                  <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 rounded text-[13px] flex items-center">
                    <i className="fas fa-reply rotate-90 mr-2 text-xs"></i> 全部收起
                  </button>
              </div>
              <span className="iconfont icon-a-1 text-gray-400 cursor-pointer hover:text-indigo-600 fz17"></span>
            </div>
            <div className="bg-white rounded-b shadow-sm border border-gray-100 border-t-0 overflow-hidden min-h-[500px]">
              <div className="bg-[#f8f9fb] border-b border-gray-100 flex items-center h-11 px-4 sticky top-12 z-10">
                  <div className="flex-1 pl-4 text-[13px] font-bold text-gray-600">部门名称</div>
                  <div className="flex items-center w-[750px] shrink-0">
                    <span className="w-24 text-center text-[13px] font-bold text-gray-600">负责人</span>
                    <span className="w-32 text-center text-[13px] font-bold text-gray-600">手机号</span>
                    <span className="w-20 text-center text-[13px] font-bold text-gray-600">红娘数</span>
                    <span className="w-44 text-center text-[13px] font-bold text-gray-600">添加时间</span>
                    <span className="flex-1 text-center text-[13px] font-bold text-gray-600 pr-4">操作</span>
                  </div>
              </div>
              <div className="divide-y divide-gray-50 px-4 pt-4">
                  <DeptRow id="2163" name="管理层" count={1} time="2026-01-16 13:53" hasChildren={true} />
                  <div className="pb-4">
                    <DeptRow depth={1} id="2164" name="财务部" count={0} time="2026-01-16 13:53" />
                    <DeptRow depth={1} id="2165" name="销售部" count={0} time="2026-01-16 13:53" />
                    <DeptRow depth={1} id="2166" name="服务部" count={0} time="2026-01-16 13:53" />
                    <DeptRow depth={1} id="2167" name="运营部" count={0} time="2026-01-16 13:53" />
                  </div>
              </div>
            </div>
          </>
        )}

        {/* 角色管理 */}
        {isRoleManage && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded text-[13px] hover:border-indigo-400 transition-colors">
                 <i className="fas fa-user-plus mr-2 text-indigo-500"></i> 添加角色
              </button>
              <span className="iconfont icon-a-1 text-gray-400 cursor-pointer hover:text-indigo-600 fz17"></span>
            </div>
            
            <div className="flex-1 overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse table-fixed min-w-[1302px]">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold">
                    <th className="px-4 py-4 w-[55px] text-center"><input type="checkbox" className="rounded" /></th>
                    <th className="px-4 py-4 w-[60px]">ID</th>
                    <th className="px-4 py-4 w-[248px]">角色名称</th>
                    <th className="px-4 py-4 w-[248px]">数据范围</th>
                    <th className="px-4 py-4 w-[211px]">描述</th>
                    <th className="px-4 py-4 w-[240px]">添加时间</th>
                    <th className="px-4 py-4 w-[240px] sticky right-0 bg-[#f8f9fb] text-center border-l border-gray-50 shadow-[-4px_0_8px_rgba(0,0,0,0.03)]">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {roles.map(role => (
                    <tr key={role.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-4 text-center"><input type="checkbox" className="rounded" /></td>
                      <td className="px-4 py-4 text-sm text-gray-500">{role.id}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-800">{role.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{role.scope}</td>
                      <td className="px-4 py-4 text-sm text-gray-400">{role.desc}</td>
                      <td className="px-4 py-4 text-sm text-gray-400">{role.time}</td>
                      <td className="px-4 py-4 text-center sticky right-0 bg-white border-l border-gray-50 shadow-[-4px_0_8px_rgba(0,0,0,0.03)]">
                        <button className="text-indigo-600 text-[13px] font-bold hover:underline mx-2">编辑</button>
                        <button className="text-rose-500 text-[13px] font-bold hover:underline mx-2">删除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 红娘管理 */}
        {isStaffManage && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="text-sm text-gray-500">共 {staff.length} 位红娘/成员</div>
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">新增成员</button>
            </div>
            <div className="flex-1 overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse table-fixed min-w-[980px]">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold">
                    <th className="px-4 py-4 w-[120px]">成员ID</th>
                    <th className="px-4 py-4 w-[120px]">姓名</th>
                    <th className="px-4 py-4 w-[160px]">部门</th>
                    <th className="px-4 py-4 w-[140px]">角色</th>
                    <th className="px-4 py-4 w-[150px]">手机号</th>
                    <th className="px-4 py-4 w-[140px]">状态</th>
                    <th className="px-4 py-4 w-[150px]">入职时间</th>
                    <th className="px-4 py-4">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {staff.map(person => (
                    <tr key={person.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-4 text-sm text-gray-500">{person.id}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-800">{person.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{person.dept}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{person.role}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{person.phone}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${person.status === '在职' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {person.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">{person.entry}</td>
                      <td className="px-4 py-4 text-sm">
                        <button className="text-indigo-600 font-bold hover:underline mr-4">编辑</button>
                        <button className="text-rose-500 font-bold hover:underline">停用</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageManager;