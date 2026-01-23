
import React, { useState } from 'react';

interface ResourceManagerProps {
  activeSubPage: string;
}

const ResourceManager: React.FC<ResourceManagerProps> = ({ activeSubPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Page type flags
  const isMyResource = activeSubPage === '我的资源';
  const isPrediction = activeSubPage === '到店预测';
  const isToBeAssigned = activeSubPage === '待分配资源';
  const isRegistration = activeSubPage === '到店登记';
  const isInterview = activeSubPage === '我的面谈';
  const isCollaboration = activeSubPage === '我的协作';
  const isPublicSea = activeSubPage === '公海资源';
  const isRecycleBin = activeSubPage === '回收站';
  const isContract = activeSubPage === '我的合同';
  const isCollection = activeSubPage === '我的收款';
  const isSmsRecord = activeSubPage === '短信记录';

  const timeFilters = ['全部', '今天', '昨天', '本周', '上周', '本月', '上月', '今年', '去年'];
  const predictionTimeFilters = ['全部', '今天', '明天', '昨天', '本周', '下周', '上周', '本月', '下月', '上月', '今年', '去年'];

  // Sub-components for UI elements
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
      {/* 1. Header Navigation Tabs */}
      <div className="flex items-center bg-white border-b border-gray-200 h-12 px-4 space-x-1 shrink-0">
        <div className="flex-1 flex items-center overflow-x-auto no-scrollbar space-x-1">
          {['门店仪表盘', '我的仪表盘', '资源分析', '销售漏斗', '我的资源', '待分配资源', '到店预测', '到店登记', '我的面谈', '我的协作', '公海资源', '回收站', '我的合同', '我的收款', '短信记录'].map(tab => (
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
              {tab !== '门店仪表盘' && <i className="fas fa-times ml-2 text-[9px] text-gray-400"></i>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
        {/* 2. Top Search Area */}
        <div className="bg-white rounded p-6 shadow-sm border border-gray-100">
          <div className="flex flex-wrap">
            {(isMyResource || isPrediction || isInterview || isCollaboration || isPublicSea || isContract || isCollection || isSmsRecord) && (
              <SearchItem label="数据范围" labelWidth={isContract ? "90px" : (isSmsRecord ? "75px" : "80px")}>
                <input type="text" readOnly placeholder="请选择" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none bg-gray-50 cursor-pointer" />
              </SearchItem>
            )}
            
            {isContract && (
               <SearchItem label="合同分类" labelWidth="90px">
                  <select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select>
               </SearchItem>
            )}

            {(isContract || isCollection) && (
              <SearchItem label="合同编号" labelWidth={isContract ? "90px" : "80px"}>
                <input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" />
              </SearchItem>
            )}

            {isCollection && (
              <SearchItem label="收款编号">
                <input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" />
              </SearchItem>
            )}

            <SearchItem label={isSmsRecord ? "资源手机" : "手机号"} labelWidth={isContract ? "90px" : (isSmsRecord ? "75px" : "80px")}>
              <input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none focus:border-indigo-400" />
            </SearchItem>

            <SearchItem label={isSmsRecord ? "资源ID" : "编号/昵称"} labelWidth={isContract ? "90px" : (isSmsRecord ? "75px" : "80px")}>
              <input type="text" placeholder={isRecycleBin || isSmsRecord ? "请输入" : "资源ID/昵称/姓名"} className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" />
            </SearchItem>
            
            {(isPrediction || isRegistration || isInterview) && (
               <SearchItem label="邀约单号">
                  <input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" />
               </SearchItem>
            )}

            {isSmsRecord && (
              <>
                <SearchItem label="发送类型" labelWidth="75px"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="发送状态" labelWidth="75px"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="有无回复" labelWidth="75px"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="关键词" labelWidth="75px"><input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" /></SearchItem>
              </>
            )}

            {(isCollaboration || isPublicSea || isRecycleBin) && (
              <SearchItem label="资源来源">
                 <select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none bg-white"><option>请选择</option></select>
              </SearchItem>
            )}

            {!isPrediction && !isRegistration && !isInterview && !isCollaboration && !isPublicSea && !isRecycleBin && !isContract && !isCollection && !isSmsRecord && (
              <>
                <SearchItem label="是否白板">
                   <select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none bg-white"><option>请选择</option></select>
                </SearchItem>
                <SearchItem label="导入批次">
                   <select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none bg-white"><option>请选择</option></select>
                </SearchItem>
              </>
            )}

            {isContract && (
               <>
                 <SearchItem label="合同类型" labelWidth="90px">
                    <select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select>
                 </SearchItem>
                 <SearchItem label="是否有退款" labelWidth="90px">
                    <select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select>
                 </SearchItem>
               </>
            )}

            {(isExpanded || isRecycleBin) && !isContract && !isCollection && !isSmsRecord && (
              <SearchItem label="标签"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
            )}

            {(isPrediction || isInterview) && (
               <SearchItem label="备注内容">
                  <input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" />
               </SearchItem>
            )}

            {isExpanded && !isContract && !isCollection && !isSmsRecord && (
              <>
                {isCollaboration && <SearchItem label="有无帮约"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>}
                <SearchItem label="录入红娘"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="性别"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="婚况"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                <SearchItem label="居住地"><input type="text" readOnly placeholder="请选择" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white" /></SearchItem>
                <SearchItem label="户籍地"><input type="text" readOnly placeholder="请选择" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white" /></SearchItem>
                <SearchItem label="学历"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                {(isCollaboration || isPublicSea || isRecycleBin) && (
                  <>
                    <SearchItem label="年收入"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                    <SearchItem label="线上用户"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                    <SearchItem label="头像"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                    <SearchItem label="职业"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                  </>
                )}
                {(isPublicSea || isRecycleBin) && (
                  <>
                    <SearchItem label="放弃红娘"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                    <SearchItem label="坠海原因"><select className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 bg-white"><option>请选择</option></select></SearchItem>
                  </>
                )}
                <SearchItem label="年龄">
                   <div className="flex items-center space-x-1">
                      <select className="flex-1 text-[13px] border border-gray-200 rounded px-1 py-1.5 bg-white"><option>最小</option></select>
                      <span className="text-gray-400">~</span>
                      <select className="flex-1 text-[13px] border border-gray-200 rounded px-1 py-1.5 bg-white"><option>最大</option></select>
                   </div>
                </SearchItem>
                {!isPrediction && !isRegistration && !isInterview && <SearchItem label="备注内容"><input type="text" placeholder="请输入" className="w-full text-[13px] border border-gray-200 rounded px-3 py-1.5 outline-none" /></SearchItem>}
              </>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-end space-x-3 mb-6">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded text-sm font-bold shadow-md shadow-indigo-100">查询</button>
            <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded text-sm font-bold">重置</button>
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-indigo-600 text-sm font-bold flex items-center">
              {isExpanded ? '收起' : '展开'} <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} ml-1`}></i>
            </button>
          </div>

          {/* Radio Queries */}
          {(isMyResource || isCollaboration || isPublicSea) && (
            <div className="space-y-1 mt-4">
              <RadioQuery 
                label="资源标记" 
                items={['全部', <span><i className="fas fa-flag text-red-500 mr-1"></i>重点资源</span>, <span><i className="fas fa-flag text-gray-300 mr-1"></i>普通资源</span>, ...(isCollaboration || isPublicSea ? [] : ['白板资源', '公海领取', '帮约'])]} 
              />
              {!isPublicSea && (
                <>
                  <RadioQuery 
                    label="跟进状态" 
                    items={['全部', '到期未跟进', '今天需跟进', '今天已跟进', '明日需跟进', '3天未跟进', '7天未跟进', '今天坠海', '明天坠海', '近7天坠海']} 
                  />
                  <RadioQuery 
                    label="销售阶段" 
                    items={['全部', '0类-新分', '1类-未接听待跟进', '2类-已沟通', '3类-意向客户', '4类-确定到店', '5类-已到店', '6类-爽约', '7类-待继续跟进', '10类-已签约']} 
                  />
                </>
              )}
            </div>
          )}

          {isContract && (
            <div className="space-y-1 mt-4">
               <RadioQuery label="合同状态" labelWidth="90px" items={['全部', '待审核', '通过', '不通过', '草稿', '作废']} />
               <RadioQuery label="到期状态" labelWidth="90px" items={['全部', '未到期', '已到期']} />
               <RadioQuery label="收款状态" labelWidth="90px" items={['全部', '待收款', '部分收款', '全部收款', '部分退款', '全部退款']} />
            </div>
          )}

          {isCollection && (
             <div className="space-y-1 mt-4">
                <RadioQuery label="款项类型" items={['全部', '正常收款', '合同预付款', '合同尾款', '合同全款', '合同续费']} />
                <RadioQuery label="审核状态" items={['全部', '待审核', '通过', '不通过', '作废']} />
             </div>
          )}

          {isRecycleBin && (
             <div className="space-y-1 mt-4">
                <RadioQuery label="回收类型" items={['全部', '黑名单', '无效']} />
             </div>
          )}

          {(isPrediction || isInterview) && (
            <div className="space-y-1 mt-4">
              <RadioQuery label="签约状态" items={['全部', '已签约', '未签约']} />
              <RadioQuery label="到店状态" items={['全部', '待到店', '已到店', '爽约', '取消']} />
              {isPrediction && <RadioQuery label="回访状态" items={['全部', '已回访', '待回访']} />}
            </div>
          )}

          {isRegistration && (
             <div className="space-y-1 mt-4">
               <RadioQuery label="到店状态" items={['全部', '待到店', '已到店', '爽约', '取消']} />
             </div>
          )}

          {/* Time Filter Row */}
          <div className="flex items-center mt-4">
            <label className={`text-[13px] text-gray-500 text-right mr-3 shrink-0 ${isContract ? 'w-[90px]' : (isSmsRecord ? 'w-[75px]' : 'w-20')}`}>时间筛选</label>
            <select className="text-[13px] border border-gray-200 rounded-l px-3 py-1.5 outline-none bg-gray-50 w-28">
              <option>{isPrediction || isInterview ? '到店时间' : (isRegistration ? '预约时间' : (isPublicSea ? '坠海时间' : (isRecycleBin ? '回收时间' : (isContract || isCollection || isSmsRecord ? '录入时间' : '分配时间'))))}</option>
              <option>录入时间</option>
              {(isMyResource || isCollaboration) && <option>跟进时间</option>}
            </select>
            <div className="flex bg-gray-100 p-1 border-y border-gray-200 overflow-x-auto no-scrollbar shrink-0">
              {(isPrediction || isRegistration || isInterview || isSmsRecord ? predictionTimeFilters : timeFilters).map((f, i) => (
                <button key={f} className={`px-3 py-1 text-xs rounded transition-colors whitespace-nowrap ${i === 0 ? 'bg-white text-indigo-600 shadow-sm font-bold' : 'text-gray-500'}`}>{f}</button>
              ))}
            </div>
            <div className="flex items-center border border-gray-200 border-l-0 rounded-r px-3 py-1.5 text-xs text-gray-400 bg-white min-w-[280px]">
               <i className="far fa-calendar-alt mr-3 ml-2"></i>
               <span className="whitespace-nowrap flex-1">开始日期 至 结束日期</span>
            </div>
          </div>
        </div>

        {/* 3. Summary Stats Bar (Contract/Collection Specific) */}
        {(isContract || isCollection) && (
           <div className="bg-white p-4 rounded shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-10 text-[13px]">
                 {isContract && <p className="flex items-center text-gray-500">合同总额：<span className="text-indigo-600 font-bold ml-1 text-sm">￥ 0.00</span></p>}
                 {isContract && <div className="w-px h-4 bg-gray-100"></div>}
                 <p className="flex items-center text-gray-500">已收款：<span className="text-emerald-500 font-bold ml-1 text-sm">￥ 0.00</span></p>
                 <div className="w-px h-4 bg-gray-100"></div>
                 <p className="flex items-center text-gray-500">待收款：<span className="text-orange-500 font-bold ml-1 text-sm">￥ 0.00</span></p>
                 {isContract && <div className="w-px h-4 bg-gray-100"></div>}
                 {isContract && <p className="flex items-center text-gray-500">已退款：<span className="text-rose-500 font-bold ml-1 text-sm">￥ 0.00</span></p>}
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 flex items-center cursor-pointer hover:text-indigo-600">
                  默认排序 <i className="fas fa-sort-amount-down ml-2 text-gray-300"></i>
                </span>
                <span className="iconfont icon-a-1 ml-6 text-gray-400 cursor-pointer fz17"></span>
              </div>
           </div>
        )}

        {/* 4. Action Toolbar */}
        {!isPrediction && !isRegistration && !isInterview && !isContract && !isCollection && (
          <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center space-x-2">
              {isPublicSea ? (
                <>
                  <button className="px-4 py-1.5 border border-gray-200 text-gray-600 text-sm rounded opacity-50 cursor-not-allowed">
                     <i className="iconfont icon-lingqukehu mr-1"></i> 领取
                  </button>
                  <button className="px-4 py-1.5 border border-gray-200 text-gray-600 text-sm rounded opacity-50 cursor-not-allowed">
                     <i className="iconfont icon-fenpeirenwu-xianxing mr-1"></i> 分配
                  </button>
                </>
              ) : isRecycleBin ? (
                <>
                  <button className="px-4 py-1.5 bg-indigo-500 text-white text-sm rounded opacity-50 cursor-not-allowed">
                     <i className="iconfont icon-fenpeirenwu-xianxing mr-1"></i> 分配
                  </button>
                  <button className="px-4 py-1.5 border border-indigo-200 text-indigo-600 text-sm rounded hover:bg-indigo-50">投入公海</button>
                </>
              ) : isSmsRecord ? (
                <div className="w-1 h-8"></div> // Empty space for layout matching
              ) : (
                <>
                  {!isCollaboration ? (
                    <button className="px-4 py-1.5 bg-indigo-500 text-white text-sm rounded opacity-50 cursor-not-allowed">
                      <i className={`iconfont icon-fenpeirenwu-xianxing mr-1`}></i> {isMyResource ? '调配' : '分配'}
                    </button>
                  ) : (
                    <button className="px-4 py-1.5 border border-indigo-200 text-indigo-600 text-sm rounded hover:bg-indigo-50">短信</button>
                  )}
                </>
              )}
              {!isPublicSea && !isRecycleBin && !isSmsRecord && (
                <button className="px-4 py-1.5 border border-gray-200 text-gray-600 text-sm rounded flex items-center">
                  <i className="fas fa-edit mr-2 text-indigo-400"></i> 录入
                </button>
              )}
              {!isSmsRecord && <button className="px-4 py-1.5 border border-gray-200 text-gray-600 text-sm rounded opacity-50 cursor-not-allowed">标签</button>}
              {!isMyResource && !isCollaboration && !isPublicSea && !isRecycleBin && !isSmsRecord && <button className="px-4 py-1.5 border border-indigo-200 text-indigo-500 text-sm rounded opacity-50 cursor-not-allowed">投海</button>}
              {!isSmsRecord && (
                <div className="relative group">
                  <button className="px-4 py-1.5 border border-gray-200 text-gray-600 text-sm rounded flex items-center opacity-50">
                    <i className="fas fa-ellipsis-h mr-2"></i> 更多 <i className="fas fa-chevron-down ml-2 text-[10px]"></i>
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center">
              {!isSmsRecord && (
                <span className="text-sm text-gray-500 flex items-center cursor-pointer hover:text-indigo-600">
                  默认排序 <i className="fas fa-sort-amount-down ml-2 text-gray-300"></i>
                </span>
              )}
              <span className="iconfont icon-a-1 ml-6 text-gray-400 cursor-pointer fz17"></span>
            </div>
          </div>
        )}

        {/* 5. Data Table */}
        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col min-h-[400px]">
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className={`w-full text-left border-collapse ${isPrediction || isRegistration || isRecycleBin || isContract || isCollection || isSmsRecord ? '' : 'min-w-[1600px]'} table-fixed`}>
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#f8f9fb] border-b border-gray-100">
                  {isPrediction || isInterview ? (
                    <>
                      <th className="px-4 py-4 w-[45px] text-center sticky left-0 bg-[#f8f9fb] z-20"><input type="checkbox" className="rounded" disabled /></th>
                      <th className="px-4 py-4 w-[337px] font-bold text-gray-600 sticky left-[45px] bg-[#f8f9fb] z-20 border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">资源信息</th>
                      <th className="px-4 py-4 w-[150px] font-bold text-gray-600">红娘</th>
                      <th className="px-4 py-4 w-[203px] font-bold text-gray-600">邀约备注</th>
                      <th className="px-4 py-4 w-[152px] font-bold text-gray-600">回访备注</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">状态</th>
                      <th className="px-4 py-4 w-[230px] font-bold text-gray-600">时间</th>
                      <th className="px-4 py-4 w-[80px] font-bold text-gray-600 text-center sticky right-0 bg-[#f8f9fb] z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-100">操作</th>
                    </>
                  ) : isRegistration ? (
                    <>
                      <th className="px-4 py-4 w-[312px] font-bold text-gray-600 sticky left-0 bg-[#f8f9fb] z-20 border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">资源信息</th>
                      <th className="px-4 py-4 w-[180px] font-bold text-gray-600">手机</th>
                      <th className="px-4 py-4 w-[150px] font-bold text-gray-600">销售红娘</th>
                      <th className="px-4 py-4 w-[150px] font-bold text-gray-600">面谈红娘</th>
                      <th className="px-4 py-4 w-[160px] font-bold text-gray-600">状态</th>
                      <th className="px-4 py-4 w-[240px] font-bold text-gray-600">到店签到</th>
                      <th className="px-4 py-4 w-[100px] font-bold text-gray-600 text-center sticky right-0 bg-[#f8f9fb] z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-100">操作</th>
                    </>
                  ) : isPublicSea ? (
                    <>
                      <th className="px-4 py-4 w-[45px] text-center sticky left-0 bg-[#f8f9fb] z-20"><input type="checkbox" className="rounded" disabled /></th>
                      <th className="px-4 py-4 w-[350px] font-bold text-gray-600 sticky left-[45px] bg-[#f8f9fb] z-20 border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">资源信息</th>
                      <th className="px-4 py-4 w-[180px] font-bold text-gray-600">手机</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">放弃红娘</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">录入红娘</th>
                      <th className="px-4 py-4 w-[200px] font-bold text-gray-600">录入/登录时间</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">推广红娘</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">来源</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">流转</th>
                      <th className="px-4 py-4 w-[130px] font-bold text-gray-600">标签</th>
                      <th className="px-4 py-4 w-[180px] font-bold text-gray-600">坠海时间</th>
                      <th className="px-4 py-4 w-[200px] font-bold text-gray-600">坠海原因</th>
                      <th className="px-4 py-4 w-[80px] font-bold text-gray-600 text-center sticky right-0 bg-[#f8f9fb] z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-100">操作</th>
                    </>
                  ) : isRecycleBin ? (
                    <>
                      <th className="px-4 py-4 w-[45px] text-center sticky left-0 bg-[#f8f9fb] z-20"><input type="checkbox" className="rounded" disabled /></th>
                      <th className="px-4 py-4 w-[370px] font-bold text-gray-600 sticky left-[45px] bg-[#f8f9fb] z-20 border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">资源信息</th>
                      <th className="px-4 py-4 w-[180px] font-bold text-gray-600">手机</th>
                      <th className="px-4 py-4 w-[130px] font-bold text-gray-600">标签</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">回收类型</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">原销售红娘</th>
                      <th className="px-4 py-4 w-[100px] font-bold text-gray-600">流转</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">来源</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">回收时间</th>
                      <th className="px-4 py-4 w-[70px] font-bold text-gray-600 text-center sticky right-0 bg-[#f8f9fb] z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-100">操作</th>
                    </>
                  ) : isContract || isCollection ? (
                     <>
                      <th className="px-4 py-4 w-[45px] text-center sticky left-0 bg-[#f8f9fb] z-20"><input type="checkbox" className="rounded" disabled /></th>
                      <th className="px-4 py-4 w-[370px] font-bold text-gray-600 sticky left-[45px] bg-[#f8f9fb] z-20 border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">资源信息</th>
                      <th className="px-4 py-4 w-[180px] font-bold text-gray-600">手机</th>
                      <th className="px-4 py-4 w-[130px] font-bold text-gray-600">标签</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">{isCollection ? '审核状态' : '合同状态'}</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">销售红娘</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">合同总额</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">{isCollection ? '收款金额' : '已收金额'}</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">录入时间</th>
                      <th className="px-4 py-4 w-[70px] font-bold text-gray-600 text-center sticky right-0 bg-[#f8f9fb] z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-100">操作</th>
                    </>
                  ) : isSmsRecord ? (
                    <>
                      <th className="px-4 py-4 w-[80px] font-bold text-gray-600 sticky left-0 bg-[#f8f9fb] z-20 border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">ID</th>
                      <th className="px-4 py-4 w-[200px] font-bold text-gray-600">资源</th>
                      <th className="px-4 py-4 w-[180px] font-bold text-gray-600">手机</th>
                      <th className="px-4 py-4 w-[150px] font-bold text-gray-600">红娘</th>
                      <th className="px-4 py-4 w-[100px] font-bold text-gray-600">类型</th>
                      <th className="px-4 py-4 w-[300px] font-bold text-gray-600">短信内容</th>
                      <th className="px-4 py-4 w-[300px] font-bold text-gray-600">回复内容</th>
                      <th className="px-4 py-4 w-[100px] font-bold text-gray-600">状态</th>
                      <th className="px-4 py-4 w-[160px] font-bold text-gray-600 text-center sticky right-0 bg-[#f8f9fb] z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-100">时间</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-4 w-[45px] text-center sticky left-0 bg-[#f8f9fb] z-20"><input type="checkbox" className="rounded" disabled /></th>
                      {(isMyResource || isCollaboration) && <th className="px-4 py-4 w-[65px] text-center sticky left-[45px] bg-[#f8f9fb] z-20">标记</th>}
                      <th className={`px-4 py-4 w-[330px] font-bold text-gray-600 sticky ${isMyResource || isCollaboration ? 'left-[110px]' : 'left-[45px]'} bg-[#f8f9fb] z-20 border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]`}>
                        {isCollaboration ? '昵称' : '资源信息'}
                      </th>
                      <th className="px-4 py-4 w-[170px] font-bold text-gray-600">手机</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">销售阶段</th>
                      {isCollaboration ? (
                        <>
                          <th className="px-4 py-4 w-[100px] font-bold text-gray-600">未联系</th>
                          <th className="px-4 py-4 w-[120px] font-bold text-gray-600">销售红娘</th>
                          <th className="px-4 py-4 w-[120px] font-bold text-gray-600">面谈红娘</th>
                          <th className="px-4 py-4 w-[120px] font-bold text-gray-600">协作红娘</th>
                          <th className="px-4 py-4 w-[120px] font-bold text-gray-600">录入红娘</th>
                        </>
                      ) : (
                        <>
                          <th className="px-4 py-4 w-[130px] font-bold text-gray-600">标签</th>
                          <th className="px-4 py-4 w-[120px] font-bold text-gray-600">跟进次数</th>
                          <th className="px-4 py-4 w-[180px] font-bold text-gray-600">未联系</th>
                          <th className="px-4 py-4 w-[140px] font-bold text-gray-600">销售红娘</th>
                        </>
                      )}
                      <th className="px-4 py-4 w-[200px] font-bold text-gray-600">最后跟进记录</th>
                      <th className="px-4 py-4 w-[120px] font-bold text-gray-600">来源</th>
                      {!isCollaboration && <th className="px-4 py-4 w-[130px] font-bold text-gray-600">标签</th>}
                      <th className="px-4 py-4 w-[220px] font-bold text-gray-600">跟进时间</th>
                      <th className="px-4 py-4 w-[140px] font-bold text-gray-600">分配时间</th>
                      <th className="px-4 py-4 w-[200px] font-bold text-gray-600">备注</th>
                      <th className="px-4 py-4 w-[130px] font-bold text-gray-600 text-center sticky right-0 bg-[#f8f9fb] z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.03)] border-l border-gray-100">操作</th>
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

        {/* 6. Pagination Area */}
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

export default ResourceManager;
