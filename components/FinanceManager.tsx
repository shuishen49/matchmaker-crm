import React, { useState } from 'react';

interface FinanceManagerProps {
  activeSubPage: string;
}

const FinanceManager: React.FC<FinanceManagerProps> = ({ activeSubPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePerformanceTab, setActivePerformanceTab] = useState('销售业绩');
  
  const isContractManagement = activeSubPage === '合同管理';
  const isCollectionManagement = activeSubPage === '收款管理';
  const isRefundManagement = activeSubPage === '退款管理';
  const isPerformance = activeSubPage === '红娘业绩';

  const timeFilters = ['全部', '今天', '昨天', '本周', '上周', '本月', '上月', '今年', '去年'];

  const SearchItem = ({ label, children, width = "25%", labelWidth = "80px" }: { label: string, children?: React.ReactNode, width?: string, labelWidth?: string }) => (
    <div className="flex items-center mb-4" style={{ width }}>
      <label className="text-[13px] text-gray-500 text-right mr-3 shrink-0" style={{ width: labelWidth }}>{label}</label>
      <div className="flex-1 pr-4">{children}</div>
    </div>
  );

  const RadioQuery = ({ label, items, activeIdx = 0, labelWidth = "80px" }: { label: string, items: any[], activeIdx?: number, labelWidth?: string }) => (
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
      {/* 1. 顶部二级页签 */}
      <div className="flex items-center bg-white border-b border-gray-200 h-12 px-4 space-x-1 shrink-0">
        <div className="flex-1 flex items-center overflow-x-auto no-scrollbar space-x-1">
          {['合同管理', '收款管理', '退款管理', '红娘业绩'].map(tab => (
            <div 
              key={tab}
              onClick={() => {}} // This is handled by parent but kept for UI
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
        {/* 2. 业绩模块特有的顶部切换 */}
        {isPerformance && (
          <div className="bg-white rounded-t-lg border-b border-gray-100 px-6 pt-4 h-12 flex items-center shrink-0">
            {['销售业绩', '服务业绩'].map(tab => (
              <span 
                key={tab}
                onClick={() => setActivePerformanceTab(tab)}
                className={`mr-8 pb-3 text-sm cursor-pointer relative transition-all ${
                  activePerformanceTab === tab ? 'text-indigo-600 font-bold border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        )}

        {/* 3. 业绩模块的进度统计区 */}
        {isPerformance && (
          <div className="bg-white p-7 rounded-b-lg border border-t-0 border-gray-100 flex items-center">
            <div className="w-60 mr-8">
              <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full w-[0%] transition-all duration-1000"></div>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-600">0%</div>
              </div>
            </div>
            <div className="flex items-center space-x-12">
               <div className="flex items-center text-[13px] text-gray-500 pr-8 border-r border-gray-100">
                 本月目标：<span className="text-indigo-600 font-bold ml-1 text-sm">￥ 0.00</span>
               </div>
               <div className="flex items-center text-[13px] text-gray-500 pr-8 border-r border-gray-100">
                 当前已完成：<span className="text-emerald-500 font-bold ml-1 text-sm">￥ 0.00</span>
               </div>
               <div className="flex items-center text-[13px] text-gray-500">
                 距离目标还差：<span className="text-orange-500 font-bold ml-1 text-sm">￥ 0.00</span>
               </div>
            </div>
          </div>
        )}

        {/* 4. 搜索与筛选 (非业绩展示原版，业绩展示新版) */}
        {!isPerformance ? (
          <div className="bg-white shadow-sm border border-gray-100 p-6 rounded-lg">
            <div className="flex flex-wrap">
              {isContractManagement && (
                <>
                  <SearchItem label="合同编号" labelWidth="90px"><input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" /></SearchItem>
                  <SearchItem label="签约红娘" labelWidth="90px"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                  <SearchItem label="面谈红娘" labelWidth="90px"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                  <SearchItem label="协作红娘" labelWidth="90px"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                </>
              )}
              {isCollectionManagement && (
                <>
                  <SearchItem label="合同编号"><input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" /></SearchItem>
                  <SearchItem label="收款编号"><input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" /></SearchItem>
                  <SearchItem label="签约红娘"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                  <SearchItem label="面谈红娘"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                </>
              )}
              {isRefundManagement && (
                <>
                  <SearchItem label="合同编号"><input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" /></SearchItem>
                  <SearchItem label="退款编号"><input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" /></SearchItem>
                  <SearchItem label="签约红娘"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                  <SearchItem label="面谈红娘"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                </>
              )}
              {isExpanded && (
                <>
                   {/* ... (此处省略部分展开逻辑) */}
                   <SearchItem label="编号/昵称"><input type="text" placeholder="资源ID/线上ID/昵称/姓名" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" /></SearchItem>
                </>
              )}
            </div>
            <div className="flex items-center justify-end space-x-3 mb-6">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded text-sm font-bold shadow-md shadow-indigo-100">查询</button>
              <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded text-sm font-bold">重置</button>
              <button onClick={() => setIsExpanded(!isExpanded)} className="text-indigo-600 text-sm font-bold flex items-center">{isExpanded ? '收起' : '展开'} <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} ml-1`}></i></button>
            </div>
            <div className="flex items-center mt-4">
              <label className={`text-[13px] text-gray-500 text-right mr-3 shrink-0 ${isContractManagement ? 'w-[90px]' : 'w-[80px]'}`}>时间筛选</label>
              <select className={`text-[13px] border border-gray-200 rounded-l px-3 py-1.5 outline-none bg-gray-50 mr-0 ${isRefundManagement ? 'w-[120px]' : 'w-28'}`}>
                 <option>{isRefundManagement ? '创建时间' : (isCollectionManagement ? '收款时间' : '签约时间')}</option>
                 <option>录入时间</option>
              </select>
              <div className="flex bg-gray-100 p-1 border-y border-gray-200 overflow-x-auto no-scrollbar shrink-0">
                {timeFilters.map((f, i) => (<button key={f} className={`px-3 py-1 text-xs rounded transition-colors whitespace-nowrap ${i === 0 ? 'bg-white text-indigo-600 shadow-sm font-bold' : 'text-gray-500'}`}>{f}</button>))}
              </div>
              <div className="flex items-center border border-gray-200 border-l-0 rounded-r px-3 py-1.5 text-xs text-gray-400 bg-white min-w-[330px]">
                 <i className="far fa-calendar-alt mr-3 ml-2"></i><span className="whitespace-nowrap flex-1">开始日期 至 结束日期</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 px-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <label className="text-sm text-gray-500 mr-3">部门</label>
                <select className="text-[13px] border border-gray-200 rounded px-3 py-1.5 w-[200px] outline-none bg-white"><option>请选择</option></select>
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-500 mr-3">红娘</label>
                <select className="text-[13px] border border-gray-200 rounded px-3 py-1.5 w-[200px] outline-none bg-white"><option>请选择</option></select>
              </div>
              <div className="flex items-center">
                <label className="text-sm text-gray-500 mr-3">选择月份</label>
                <div className="relative w-[180px]">
                   <input type="text" placeholder="请选择" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none pr-8 bg-white" />
                   <i className="far fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"></i>
                </div>
              </div>
            </div>
            <div className="flex items-center text-gray-400">
               <span className="iconfont icon-a-1 cursor-pointer hover:text-indigo-600 fz17"></span>
            </div>
          </div>
        )}

        {/* 5. 汇总条 (业绩模块不展示汇总条) */}
        {!isPerformance && (
          <div className="bg-white p-4 rounded shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-10 text-[13px]">
               {isContractManagement && (
                 <>
                   <p className="flex items-center text-gray-500">合同总额：<span className="text-indigo-600 font-bold ml-1 text-sm">￥ 0.00</span></p>
                   <div className="w-px h-4 bg-gray-100"></div>
                   <p className="flex items-center text-gray-500">已收款：<span className="text-emerald-500 font-bold ml-1 text-sm">￥ 0.00</span></p>
                   <div className="w-px h-4 bg-gray-100"></div>
                   <p className="flex items-center text-gray-500">待收款：<span className="text-orange-500 font-bold ml-1 text-sm">￥ 0.00</span></p>
                   <div className="w-px h-4 bg-gray-100"></div>
                   <p className="flex items-center text-gray-500">已退款：<span className="text-rose-500 font-bold ml-1 text-sm">￥ 0.00</span></p>
                 </>
               )}
               {isCollectionManagement && (
                 <>
                   <p className="flex items-center text-gray-500">已收款：<span className="text-emerald-500 font-bold ml-1 text-sm">￥ 0.00</span></p>
                   <div className="w-px h-4 bg-gray-100"></div>
                   <p className="flex items-center text-gray-500">待收款：<span className="text-orange-500 font-bold ml-1 text-sm">￥ 0.00</span></p>
                 </>
               )}
               {isRefundManagement && (
                 <>
                   <p className="flex items-center text-gray-500">已退款：<span className="text-emerald-500 font-bold ml-1 text-sm">￥ 0.00</span></p>
                   <div className="w-px h-4 bg-gray-100"></div>
                   <p className="flex items-center text-gray-500">待退款：<span className="text-orange-500 font-bold ml-1 text-sm">￥ 0.00</span></p>
                 </>
               )}
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 flex items-center cursor-pointer hover:text-indigo-600">默认排序 <i className="fas fa-sort-amount-down ml-2 text-gray-300"></i></span>
              <span className="iconfont icon-a-1 ml-6 text-gray-400 cursor-pointer fz17"></span>
            </div>
          </div>
        )}

        {/* 6. 数据表格区域 */}
        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col min-h-[400px]">
           {isPerformance ? (
             <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1860px] table-fixed">
                  <thead>
                    <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold">
                      <th className="px-4 py-3 w-[120px] text-center border-r border-gray-50 sticky left-0 bg-[#f8f9fb] z-20" rowSpan={2}>红娘</th>
                      <th className="px-4 py-3 w-[150px] text-center border-r border-gray-50" rowSpan={2}>累计业绩(元)</th>
                      <th className="px-4 py-3 w-[130px] text-center border-r border-gray-50" rowSpan={2}>本月目标(元)</th>
                      <th className="px-4 py-3 w-[230px] text-center border-r border-gray-50" rowSpan={2}>完成度</th>
                      <th className="px-4 py-2 text-center border-b border-gray-50" colSpan={3}>收款金额</th>
                      <th className="px-4 py-3 w-[140px] text-center border-r border-gray-50" rowSpan={2}>签约合同(份)</th>
                      <th className="px-4 py-3 w-[140px] text-center border-r border-gray-50" rowSpan={2}>签约金额</th>
                      <th className="px-4 py-3 w-[140px] text-center border-r border-gray-50" rowSpan={2}>待回款金额</th>
                      <th className="px-4 py-2 text-center border-b border-gray-50" colSpan={3}>退费金额</th>
                      <th className="px-4 py-3 w-[100px] text-center sticky right-0 bg-[#f8f9fb] z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-50" rowSpan={2}>操作</th>
                    </tr>
                    <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-500 text-[12px]">
                      <th className="px-4 py-2 w-[130px] text-center border-r border-gray-50">销售</th>
                      <th className="px-4 py-2 w-[120px] text-center border-r border-gray-50">面谈</th>
                      <th className="px-4 py-2 w-[120px] text-center border-r border-gray-50">协作</th>
                      <th className="px-4 py-2 w-[120px] text-center border-r border-gray-50">销售</th>
                      <th className="px-4 py-2 w-[120px] text-center border-r border-gray-50">面谈</th>
                      <th className="px-4 py-2 w-[120px] text-center border-r border-gray-50">协作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50/50">
                      <td className="px-4 py-4 text-center text-sm font-medium text-gray-700 sticky left-0 bg-white z-10 border-r border-gray-50">门店管理员</td>
                      <td className="px-4 py-4 text-center font-bold text-rose-500 text-[13px]">￥ 0.00</td>
                      <td className="px-4 py-4 text-center text-gray-600 text-[13px]">￥ 0.00</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center px-2">
                           <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden flex-1">
                              <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full w-[0%]"></div>
                              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-600">0%</div>
                           </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600">￥ 0.00</td>
                      <td className="px-4 py-4 text-center text-gray-600">￥ 0.00</td>
                      <td className="px-4 py-4 text-center text-gray-600">￥ 0.00</td>
                      <td className="px-4 py-4 text-center text-gray-600">0</td>
                      <td className="px-4 py-4 text-center text-gray-600">￥ 0.00</td>
                      <td className="px-4 py-4 text-center text-gray-600">￥ 0.00</td>
                      <td className="px-4 py-4 text-center text-gray-600">￥ 0.00</td>
                      <td className="px-4 py-4 text-center text-gray-600">￥ 0.00</td>
                      <td className="px-4 py-4 text-center text-gray-600">￥ 0.00</td>
                      <td className="px-4 py-4 text-center sticky right-0 bg-white z-10 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-50">
                        <button className="text-indigo-600 text-sm font-bold hover:underline">查看</button>
                      </td>
                    </tr>
                    {/* 其他红娘行数据... */}
                  </tbody>
                </table>
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center">
                <img src="https://scrm.oss-cn-beijing.aliyuncs.com/assets/no_data-78230080.png" className="w-40 opacity-60" alt="No data" />
                <p className="text-gray-400 text-base font-medium mt-4">暂无数据</p>
             </div>
           )}
        </div>

        {/* 7. 分页 */}
        {!isPerformance && (
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded shadow-sm border border-gray-100">
             <div className="text-sm text-gray-400">共 0 条</div>
             <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center border border-gray-200 rounded px-3 py-1.5 bg-white cursor-pointer hover:border-indigo-400">
                   <span>20条/页</span>
                   <i className="fas fa-chevron-down ml-3 text-[10px] text-gray-300"></i>
                </div>
                <div className="flex items-center space-x-1">
                   <button className="w-8 h-8 rounded border border-gray-100 flex items-center justify-center text-gray-300"><i className="fas fa-chevron-left text-xs"></i></button>
                   <button className="w-8 h-8 rounded bg-indigo-600 text-white font-bold flex items-center justify-center">1</button>
                   <button className="w-8 h-8 rounded border border-gray-100 flex items-center justify-center text-gray-300"><i className="fas fa-chevron-right text-xs"></i></button>
                </div>
                <div className="flex items-center">
                   <span>前往</span>
                   <input type="text" className="w-10 border border-gray-200 mx-2 py-1 text-center rounded focus:border-indigo-400 outline-none" defaultValue="1" />
                   <span>页</span>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceManager;