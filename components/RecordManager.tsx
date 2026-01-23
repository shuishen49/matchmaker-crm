import React, { useState } from 'react';

interface RecordManagerProps {
  activeSubPage: string;
}

const RecordManager: React.FC<RecordManagerProps> = ({ activeSubPage }) => {
  const isFollowUpNotes = activeSubPage === '跟进小记';
  const timeFilters = ['全部', '今天', '昨天', '本周', '上周', '本月', '上月', '今年', '去年'];

  const SearchItem = ({ label, children, width = "25%", labelWidth = "75px" }: { label: string, children?: React.ReactNode, width?: string, labelWidth?: string }) => (
    <div className="flex items-center mb-4" style={{ width }}>
      <label className="text-[13px] text-gray-500 text-right mr-3 shrink-0" style={{ width: labelWidth }}>{label}</label>
      <div className="flex-1 pr-4">{children}</div>
    </div>
  );

  const RadioQuery = ({ label, items, activeIdx = 0, labelWidth = "75px" }: { label: string, items: any[], activeIdx?: number, labelWidth?: string }) => (
    <div className="flex items-start mb-4 border-b border-gray-50 pb-2 last:border-0">
      <label className="text-[13px] text-gray-500 text-right mr-3 shrink-0 pt-1.5" style={{ width: labelWidth }}>{label}</label>
      <div className="flex flex-wrap gap-1">
        {items.map((item, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 text-[13px] rounded transition-all ${
              idx === activeIdx 
              ? 'bg-indigo-600 text-white font-bold' 
              : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full -m-4 bg-[#f0f2f5] overflow-hidden">
      {/* 页签标题 */}
      <div className="flex items-center bg-white border-b border-gray-200 h-12 px-4 space-x-1 shrink-0">
        <div className="flex-1 flex items-center overflow-x-auto no-scrollbar space-x-1">
          {['跟进小记', '导入记录', '导出记录'].map(tab => (
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
        {/* 搜索过滤区 */}
        {isFollowUpNotes && (
          <div className="bg-white shadow-sm border border-gray-100 p-6 rounded-lg">
            <div className="flex flex-wrap">
              <SearchItem label="数据范围">
                <input type="text" readOnly placeholder="请选择" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none bg-gray-50 cursor-pointer" />
              </SearchItem>
              <SearchItem label="资源手机">
                <input type="number" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none focus:border-indigo-400" />
              </SearchItem>
              <SearchItem label="编号/昵称">
                <input type="text" placeholder="资源ID/线上ID/昵称/姓名" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" />
              </SearchItem>
              <SearchItem label="关键词">
                <input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" />
              </SearchItem>
            </div>

            <div className="flex items-center justify-end space-x-3 mb-6">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded text-sm font-bold shadow-md shadow-indigo-100">
                <i className="fas fa-search mr-2"></i>查询
              </button>
              <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded text-sm font-bold">
                <i className="fas fa-sync-alt mr-2"></i>重置
              </button>
            </div>

            <div className="space-y-1 mt-4">
              <RadioQuery label="跟进类型" items={['全部', '销售', '服务']} />
            </div>

            <div className="flex items-center mt-4">
              <label className="text-[13px] text-gray-500 text-right mr-3 shrink-0 w-[75px]">时间筛选</label>
              <div className="flex bg-gray-100 p-1 border border-gray-200 rounded-l overflow-x-auto no-scrollbar shrink-0">
                {timeFilters.map((f, i) => (
                  <button key={f} className={`px-3 py-1 text-xs rounded transition-colors whitespace-nowrap ${i === 0 ? 'bg-white text-indigo-600 shadow-sm font-bold' : 'text-gray-500'}`}>{f}</button>
                ))}
              </div>
              <div className="flex items-center border border-gray-200 border-l-0 rounded-r px-3 py-1.5 text-xs text-gray-400 bg-white min-w-[330px]">
                 <i className="far fa-clock mr-3 ml-2"></i>
                 <span className="whitespace-nowrap flex-1">开始时间 至 结束时间</span>
              </div>
            </div>
          </div>
        )}

        {/* 数据表格区域 */}
        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col min-h-[400px]">
           <div className="flex items-center justify-end p-3 border-b border-gray-50">
              <span className="iconfont icon-a-1 text-gray-400 cursor-pointer hover:text-indigo-600 fz17"></span>
           </div>
           
           <div className="flex-1 overflow-x-auto custom-scrollbar">
             <table className="w-full text-left border-collapse table-fixed min-w-[1292px]">
               <thead>
                 <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold">
                   <th className="px-4 py-4 w-[80px] text-center sticky left-0 bg-[#f8f9fb] z-10 border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">ID</th>
                   <th className="px-4 py-4 w-[273px]">资源</th>
                   <th className="px-4 py-4 w-[120px]">跟进人</th>
                   <th className="px-4 py-4 w-[100px]">类型</th>
                   <th className="px-4 py-4 w-[329px]">跟进内容</th>
                   <th className="px-4 py-4 w-[200px]">附件</th>
                   <th className="px-4 py-4 w-[190px] sticky right-0 bg-[#f8f9fb] z-10 border-l border-gray-50 shadow-[-4px_0_8px_rgba(0,0,0,0.03)]">跟进时间</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50/50">
                    <td colSpan={7} className="py-32 text-center">
                      <div className="flex flex-col items-center">
                        <img src="https://scrm.oss-cn-beijing.aliyuncs.com/assets/no_data-78230080.png" className="w-40 opacity-60" alt="No data" />
                        <p className="text-gray-400 text-base font-medium mt-4">暂无数据</p>
                      </div>
                    </td>
                  </tr>
               </tbody>
             </table>
           </div>
        </div>

        {/* 分页区域 */}
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded shadow-sm border border-gray-100">
           <div className="text-sm text-gray-400">共 0 条</div>
           <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center border border-gray-200 rounded px-3 py-1.5 bg-white cursor-pointer hover:border-indigo-400">
                 <span>20条/页</span>
                 <i className="fas fa-chevron-down ml-3 text-[10px] text-gray-300"></i>
              </div>
              <div className="flex items-center space-x-1">
                 <button className="w-8 h-8 rounded border border-gray-100 flex items-center justify-center text-gray-300 cursor-not-allowed hover:bg-gray-50"><i className="fas fa-chevron-left text-xs"></i></button>
                 <button className="w-8 h-8 rounded bg-indigo-600 text-white font-bold flex items-center justify-center">1</button>
                 <button className="w-8 h-8 rounded border border-gray-100 flex items-center justify-center text-gray-300 cursor-not-allowed hover:bg-gray-50"><i className="fas fa-chevron-right text-xs"></i></button>
              </div>
              <div className="flex items-center">
                 <span>前往</span>
                 <input type="text" className="w-10 border border-gray-200 mx-2 py-1 text-center rounded focus:border-indigo-400 outline-none" defaultValue="1" />
                 <span>页</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RecordManager;