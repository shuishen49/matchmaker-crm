import React, { useState } from 'react';

interface ServiceManagerProps {
  activeSubPage: string;
}

const ServiceManager: React.FC<ServiceManagerProps> = ({ activeSubPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeClosedTab, setActiveClosedTab] = useState('关单资源');
  
  const isToBeAssigned = activeSubPage === '待分配客户';
  const isMyCustomer = activeSubPage === '我的客户';
  const isMeeting = activeSubPage === '约见管理';
  const isClosed = activeSubPage === '关单库';
  const isGuest = activeSubPage === '嘉宾库';
  const isContract = activeSubPage === '我的合同';

  const timeFilters = ['全部', '今天', '昨天', '本周', '上周', '本月', '上月', '今年', '去年'];
  const futureTimeFilters = ['全部', '今天', '明天', '昨天', '本周', '下周', '上周', '本月', '下月', '上月', '今年', '去年'];

  const SearchItem = ({ label, children, width = "25%", labelWidth = "80px" }: { label: string, children?: React.ReactNode, width?: string, labelWidth?: string }) => (
    <div className="flex items-center mb-4" style={{ width }}>
      <label className="text-[13px] text-gray-500 text-right mr-3 shrink-0" style={{ width: labelWidth }}>{label}</label>
      <div className="flex-1 pr-4">{children}</div>
    </div>
  );

  const RadioQuery = ({ label, items, activeIdx = 0, labelWidth = "85px" }: { label: string, items: any[], activeIdx?: number, labelWidth?: string }) => (
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
      {/* 1. 顶部一级页签切换 */}
      <div className="flex items-center bg-white border-b border-gray-200 h-12 px-4 space-x-1 shrink-0">
        <div className="flex-1 flex items-center overflow-x-auto no-scrollbar space-x-1">
          {['待分配客户', '我的客户', '约见管理', '关单库', '嘉宾库', '我的合同'].map(tab => (
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

      {/* 2. 关单库专用的二级页签 */}
      {isClosed && (
        <div className="bg-white h-10 flex items-center px-4 border-b border-gray-100 shrink-0 sticky top-0 z-30 shadow-sm">
          {['关单资源', '关单申请'].map(ctab => (
            <span 
              key={ctab}
              onClick={() => setActiveClosedTab(ctab)}
              className={`mx-4 text-sm cursor-pointer relative transition-all ${
                activeClosedTab === ctab ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {ctab}
              {activeClosedTab === ctab && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></span>
              )}
            </span>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
        {/* 3. 搜索表单区域 */}
        <div className={`bg-white shadow-sm border border-gray-100 p-6 ${isClosed ? 'rounded-b-lg' : 'rounded-lg'}`}>
          <div className="flex flex-wrap">
            {isMeeting ? (
              <>
                <SearchItem label="数据范围" labelWidth="85px">
                  <input type="text" readOnly placeholder="请选择" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none bg-gray-50 cursor-pointer" />
                </SearchItem>
                <SearchItem label="搜索类型" labelWidth="110px">
                  <select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>服务客户</option></select>
                </SearchItem>
              </>
            ) : (
              <SearchItem label="数据范围" labelWidth={isContract ? "90px" : "80px"}>
                <input type="text" readOnly placeholder="请选择" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none bg-gray-50 cursor-pointer" />
              </SearchItem>
            )}

            {isContract && (
              <>
                <SearchItem label="合同分类" labelWidth="90px"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="合同编号" labelWidth="90px"><input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" /></SearchItem>
              </>
            )}

            <SearchItem label="手机号" labelWidth={isMeeting ? "85px" : (isContract ? "90px" : "80px")}>
              <input type="number" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none focus:border-indigo-400" />
            </SearchItem>
            <SearchItem label="编号/昵称" labelWidth={isMeeting ? "110px" : (isContract ? "90px" : "80px")}>
              <input type="text" placeholder="资源ID/线上ID/昵称/姓名" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" />
            </SearchItem>

            {isClosed && (
              <SearchItem label="资源来源"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
            )}

            {isContract && (
              <>
                <SearchItem label="合同类型" labelWidth="90px"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="是否有退款" labelWidth="90px"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
              </>
            )}

            {isToBeAssigned && (
              <SearchItem label="服务级别"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
            )}

            {!isMeeting && !isContract && !isClosed && !isGuest && (
               <SearchItem label={isMyCustomer ? "服务级别" : "销售红娘"}><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
            )}

            {(isExpanded || isClosed || isGuest) && (
              <>
                <SearchItem label="标签" labelWidth={isContract ? "90px" : "80px"}><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="性别" labelWidth={isContract ? "90px" : "80px"}><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="婚况" labelWidth={isContract ? "90px" : "80px"}><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="居住地" labelWidth={isContract ? "90px" : "80px"}><input type="text" readOnly placeholder="请选择" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white" /></SearchItem>
                <SearchItem label="户籍地" labelWidth={isContract ? "90px" : "80px"}><input type="text" readOnly placeholder="请选择" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white" /></SearchItem>
                <SearchItem label="学历" labelWidth={isContract ? "90px" : "80px"}><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="职业" labelWidth={isContract ? "90px" : "80px"}><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="年收入" labelWidth={isContract ? "90px" : "80px"}><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="年龄" labelWidth={isContract ? "90px" : "80px"}>
                   <div className="flex items-center space-x-1">
                      <select className="flex-1 text-[13px] border border-gray-200 rounded px-1 py-1.5 bg-white"><option>最小</option></select>
                      <span className="text-gray-400">~</span>
                      <select className="flex-1 text-[13px] border border-gray-200 rounded px-1 py-1.5 bg-white"><option>最大</option></select>
                   </div>
                </SearchItem>
                <SearchItem label="民族" labelWidth={isContract ? "90px" : "80px"}><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="线上用户" labelWidth={isContract ? "90px" : "80px"}><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="备注内容" labelWidth={isContract ? "90px" : "80px"}><input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" /></SearchItem>
              </>
            )}
          </div>

          <div className="flex items-center justify-end space-x-3 mb-6">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded text-sm font-bold shadow-md shadow-indigo-100">查询</button>
            <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded text-sm font-bold">重置</button>
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-indigo-600 text-sm font-bold flex items-center">
              {isExpanded ? '收起' : '展开'} <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} ml-1`}></i>
            </button>
          </div>

          <div className="space-y-1 mt-4">
            {isContract && (
              <>
                <RadioQuery label="合同状态" labelWidth="90px" items={['全部', '待审核', '通过', '不通过', '草稿', '作废']} />
                <RadioQuery label="到期状态" labelWidth="90px" items={['全部', '未到期', '已到期']} />
                <RadioQuery label="收款状态" labelWidth="90px" items={['全部', '待收款', '部分收款', '全部收款', '部分退款', '全部退款']} />
              </>
            )}
            {isGuest && (
              <>
                <RadioQuery label="跟进状态" items={['全部', '到期未跟进', '今天需跟进', '今天已跟进', '明日需跟进', '3天未跟进', '7天未跟进']} />
                <RadioQuery label="情感状态" items={['全部', '寻找中', '交往中', '未找到', '暂停', '已找到']} />
                <RadioQuery label="见面状态" items={['全部', '有安排', '未安排']} />
                <RadioQuery label="优才协议" items={['全部', '已签署', '未签署']} />
              </>
            )}
            {isMyCustomer && (
              <>
                <RadioQuery label="跟进状态" items={['全部', '到期未跟进', '今天需跟进', '今天已跟进', '明日需跟进', '3天未跟进', '7天未跟进', '15天未跟进']} />
                <RadioQuery label="见面状态" items={['全部', '有安排', '未安排']} />
                <RadioQuery label="合同状态" items={['全部', '待开始', '服务中', '已到期']} />
                <RadioQuery label="客户阶段" items={['全部', '0类-新分', '1类-正常跟进', '2类-推荐匹配', '3类-安排约会', '4类-恋爱', '5类-暂停服务', '6类-到期待续费', '7类-关单', '8类-退费']} />
              </>
            )}
            {isMeeting && (
              <RadioQuery label="约见状态" labelWidth="85px" items={['全部', '待服务', '服务中', '暂停', '已见面', '已拒绝', '已取消']} />
            )}
            {isClosed && (
              <RadioQuery label="情感状态" items={['全部', '寻找中', '交往中', '未找到', '暂停', '已找到']} />
            )}
          </div>

          <div className="flex items-center mt-4">
            <label className={`text-[13px] text-gray-500 text-right mr-3 shrink-0 ${isContract ? 'w-[90px]' : (isMeeting ? 'w-[85px]' : 'w-20')}`}>时间筛选</label>
            <select className="text-[13px] border border-gray-200 rounded-l px-3 py-1.5 outline-none bg-gray-50 w-28 mr-0">
               <option>{isContract ? '录入时间' : (isMeeting ? '创建时间' : (isMyCustomer ? '分配时间' : '签约时间'))}</option>
               <option>录入时间</option>
            </select>
            <div className="flex bg-gray-100 p-1 border-y border-gray-200 overflow-x-auto no-scrollbar shrink-0">
              {(isMeeting || isContract ? futureTimeFilters : timeFilters).map((f, i) => (
                <button key={f} className={`px-3 py-1 text-xs rounded transition-colors whitespace-nowrap ${i === 0 ? 'bg-white text-indigo-600 shadow-sm font-bold' : 'text-gray-500'}`}>{f}</button>
              ))}
            </div>
            <div className="flex items-center border border-gray-200 border-l-0 rounded-r px-3 py-1.5 text-xs text-gray-400 bg-white min-w-[330px]">
               <i className="far fa-calendar-alt mr-3 ml-2"></i>
               <span className="whitespace-nowrap flex-1">开始日期 至 结束日期</span>
            </div>
          </div>
        </div>

        {/* 4. 汇总条 (仅合同展示) */}
        {isContract && (
           <div className="bg-white p-4 rounded shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-10 text-[13px]">
                 <p className="flex items-center text-gray-500">合同总额：<span className="text-indigo-600 font-bold ml-1 text-sm">￥ 0.00</span></p>
                 <div className="w-px h-4 bg-gray-100"></div>
                 <p className="flex items-center text-gray-500">已收款：<span className="text-emerald-500 font-bold ml-1 text-sm">￥ 0.00</span></p>
                 <div className="w-px h-4 bg-gray-100"></div>
                 <p className="flex items-center text-gray-500">待收款：<span className="text-orange-500 font-bold ml-1 text-sm">￥ 0.00</span></p>
                 <div className="w-px h-4 bg-gray-100"></div>
                 <p className="flex items-center text-gray-500">已退款：<span className="text-rose-500 font-bold ml-1 text-sm">￥ 0.00</span></p>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 flex items-center cursor-pointer hover:text-indigo-600">
                  默认排序 <i className="fas fa-sort-amount-down ml-2 text-gray-300"></i>
                </span>
                <span className="iconfont icon-a-1 ml-6 text-gray-400 cursor-pointer fz17"></span>
              </div>
           </div>
        )}

        {/* 5. 表格工具栏 (非合同展示) */}
        {!isContract && (
          <div className={`bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center justify-between sticky top-0 z-20`}>
            <div className="flex items-center space-x-2">
              <button className={`px-4 py-1.5 bg-indigo-500 text-white text-sm rounded opacity-50 cursor-not-allowed flex items-center`}>
                <i className="iconfont icon-fenpeirenwu-xianxing mr-1"></i> 分配
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 flex items-center cursor-pointer hover:text-indigo-600">
                默认排序 <i className="fas fa-sort-amount-down ml-2 text-gray-300"></i>
              </span>
              <span className="iconfont icon-a-1 ml-6 text-gray-400 cursor-pointer fz17"></span>
            </div>
          </div>
        )}

        {/* 6. 数据表格 */}
        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col min-h-[400px]">
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className={`w-full text-left border-collapse table-fixed ${isContract ? 'min-w-[1292px]' : (isGuest ? 'min-w-[2005px]' : 'min-w-[1555px]')}`}>
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#f8f9fb] border-b border-gray-100">
                  {!isMeeting && !isClosed && <th className="px-4 py-4 w-[45px] text-center sticky left-0 bg-[#f8f9fb] z-20"><input type="checkbox" className="rounded" disabled /></th>}
                  
                  {isContract ? (
                    <>
                      <th className="px-4 py-4 w-[370px] font-bold text-gray-600 sticky left-[45px] bg-[#f8f9fb] z-20 border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">资源信息</th>
                      <th className="px-4 py-4 w-[180px] font-bold text-gray-600">手机</th>
                      <th className="px-4 py-4 w-[130px] font-bold text-gray-600">标签</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">合同状态</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">销售红娘</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">合同总额</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">已收金额</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">录入时间</th>
                      <th className="px-4 py-4 w-[70px] font-bold text-gray-600 text-center sticky right-0 bg-[#f8f9fb] z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-100">操作</th>
                    </>
                  ) : isClosed ? (
                    <>
                      <th className="px-4 py-4 w-[356px] font-bold text-gray-600 sticky left-0 bg-[#f8f9fb] z-20 border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">资源信息</th>
                      <th className="px-4 py-4 w-[182px] font-bold text-gray-600">手机</th>
                      <th className="px-4 py-4 w-[121px] font-bold text-gray-600">服务红娘</th>
                      <th className="px-4 py-4 w-[110px] font-bold text-gray-600">情感状态</th>
                      <th className="px-4 py-4 w-[130px] font-bold text-gray-600">标签</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">关单编号</th>
                      <th className="px-4 py-4 w-[141px] font-bold text-gray-600">关单时间 <i className="fas fa-caret-down text-[10px]"></i></th>
                      <th className="px-4 py-4 w-[132px] font-bold text-gray-600 text-center sticky right-0 bg-[#f8f9fb] z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-100">操作</th>
                    </>
                  ) : isGuest ? (
                    <>
                      <th className="px-4 py-4 w-[350px] font-bold text-gray-600 sticky left-[45px] bg-[#f8f9fb] z-20 border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">资源信息</th>
                      <th className="px-4 py-4 w-[180px] font-bold text-gray-600">手机</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">服务红娘</th>
                      <th className="px-4 py-4 w-[80px] font-bold text-gray-600">已约见</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">优才协议</th>
                      <th className="px-4 py-4 w-[180px] font-bold text-gray-600">最后跟进时间</th>
                      <th className="px-4 py-4 w-[180px] font-bold text-gray-600">转嘉宾时间</th>
                      <th className="px-4 py-4 w-[180px] font-bold text-gray-600">下次跟进</th>
                      <th className="px-4 py-4 w-[110px] font-bold text-gray-600">情感状态</th>
                      <th className="px-4 py-4 w-[110px] font-bold text-gray-600">见面状态</th>
                      <th className="px-4 py-4 w-[200px] font-bold text-gray-600">备注</th>
                      <th className="px-4 py-4 w-[150px] font-bold text-gray-600 text-center sticky right-0 bg-[#f8f9fb] z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-100">操作</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-4 w-[350px] font-bold text-gray-600 sticky left-[45px] bg-[#f8f9fb] z-20 border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">资源信息</th>
                      <th className="px-4 py-4 w-[180px] font-bold text-gray-600">手机</th>
                      <th className="px-4 py-4 w-[135px] font-bold text-gray-600">销售红娘</th>
                      <th className="px-4 py-4 w-[135px] font-bold text-gray-600">面谈红娘</th>
                      <th className="px-4 py-4 w-[130px] font-bold text-gray-600">标签</th>
                      <th className="px-4 py-4 w-[200px] font-bold text-gray-600">备注</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">服务级别</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">签约时间</th>
                      <th className="px-4 py-4 w-[100px] font-bold text-gray-600 text-center sticky right-0 bg-[#f8f9fb] z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-100">操作</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 <tr>
                    <td colSpan={50} className="py-32 text-center">
                      <div className="flex flex-col items-center">
                        <img src="https://scrm.oss-cn-beijing.aliyuncs.com/assets/no_data.png" className="w-40 opacity-60" alt="No data" />
                        <p className="text-gray-400 text-base font-medium mt-4">暂无数据</p>
                      </div>
                    </td>
                 </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 7. 分页 */}
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
      </div>
    </div>
  );
};

export default ServiceManager;
