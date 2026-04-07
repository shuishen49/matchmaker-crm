import React, { useMemo, useState } from 'react';

interface FinanceManagerProps {
  activeSubPage: string;
}

const contractRows = [
  { id: 'CT-240401', customer: '苏语晴', amount: 18800, received: 12000, pending: 6800, refunded: 0, signer: '王薇', interviewer: '林冉', signDate: '2026-04-01' },
  { id: 'CT-240402', customer: '沈知野', amount: 36800, received: 20000, pending: 16800, refunded: 0, signer: '林冉', interviewer: '赵辰', signDate: '2026-04-02' },
  { id: 'CT-240403', customer: '江沐然', amount: 9800, received: 9800, pending: 0, refunded: 0, signer: '王薇', interviewer: '王薇', signDate: '2026-04-02' },
  { id: 'CT-240404', customer: '夏时', amount: 68800, received: 30000, pending: 38800, refunded: 5000, signer: '周可', interviewer: '赵辰', signDate: '2026-04-03' },
  { id: 'CT-240405', customer: '顾一', amount: 16800, received: 8000, pending: 8800, refunded: 0, signer: '王薇', interviewer: '李念', signDate: '2026-04-04' },
  { id: 'CT-240406', customer: '程岚', amount: 26800, received: 26800, pending: 0, refunded: 0, signer: '林冉', interviewer: '林冉', signDate: '2026-04-05' },
];

const collectionRows = [
  { id: 'RC-9901', contractId: 'CT-240401', customer: '苏语晴', amount: 12000, method: '微信', signer: '王薇', time: '2026-04-01 15:22' },
  { id: 'RC-9902', contractId: 'CT-240402', customer: '沈知野', amount: 20000, method: '银行卡', signer: '林冉', time: '2026-04-02 17:08' },
  { id: 'RC-9903', contractId: 'CT-240403', customer: '江沐然', amount: 9800, method: '支付宝', signer: '王薇', time: '2026-04-02 18:51' },
  { id: 'RC-9904', contractId: 'CT-240404', customer: '夏时', amount: 30000, method: '银行卡', signer: '周可', time: '2026-04-03 14:37' },
  { id: 'RC-9905', contractId: 'CT-240405', customer: '顾一', amount: 8000, method: '微信', signer: '王薇', time: '2026-04-04 20:11' },
  { id: 'RC-9906', contractId: 'CT-240406', customer: '程岚', amount: 26800, method: '支付宝', signer: '林冉', time: '2026-04-05 12:03' },
];

const refundRows = [
  { id: 'RF-7001', contractId: 'CT-240404', customer: '夏时', amount: 5000, reason: '阶段调整退款', status: '已退款', approver: '周可', time: '2026-04-06 10:25' },
  { id: 'RF-7002', contractId: 'CT-240399', customer: '秦朗', amount: 3000, reason: '服务中止', status: '已退款', approver: '陈若', time: '2026-04-05 16:44' },
  { id: 'RF-7003', contractId: 'CT-240398', customer: '温棠', amount: 1800, reason: '重复缴费冲正', status: '待打款', approver: '陈若', time: '2026-04-05 11:19' },
  { id: 'RF-7004', contractId: 'CT-240397', customer: '季深', amount: 2600, reason: '活动延期退差价', status: '待审核', approver: '周可', time: '2026-04-04 19:32' },
];

const salesPerformance = [
  { name: '王薇', total: 128600, target: 90000, collectSale: 46000, collectInterview: 21000, collectCoop: 9000, contractCount: 6, signAmount: 98400, pendingAmount: 28600, refundSale: 1000, refundInterview: 0, refundCoop: 0 },
  { name: '林冉', total: 116300, target: 85000, collectSale: 39000, collectInterview: 17000, collectCoop: 6200, contractCount: 5, signAmount: 90200, pendingAmount: 26100, refundSale: 500, refundInterview: 0, refundCoop: 0 },
  { name: '赵辰', total: 84500, target: 70000, collectSale: 28000, collectInterview: 14500, collectCoop: 5200, contractCount: 4, signAmount: 67800, pendingAmount: 16700, refundSale: 0, refundInterview: 300, refundCoop: 0 },
  { name: '李念', total: 60300, target: 60000, collectSale: 18000, collectInterview: 13200, collectCoop: 4100, contractCount: 3, signAmount: 48200, pendingAmount: 12100, refundSale: 0, refundInterview: 0, refundCoop: 0 },
];

const servicePerformance = [
  { name: '赵辰', total: 73200, target: 65000, collectSale: 12000, collectInterview: 24800, collectCoop: 9000, contractCount: 4, signAmount: 59800, pendingAmount: 13400, refundSale: 0, refundInterview: 800, refundCoop: 0 },
  { name: '李念', total: 69500, target: 62000, collectSale: 9500, collectInterview: 23200, collectCoop: 8600, contractCount: 4, signAmount: 57100, pendingAmount: 12400, refundSale: 0, refundInterview: 500, refundCoop: 0 },
  { name: '王薇', total: 52400, target: 50000, collectSale: 8000, collectInterview: 17800, collectCoop: 5200, contractCount: 3, signAmount: 41800, pendingAmount: 10600, refundSale: 0, refundInterview: 0, refundCoop: 0 },
  { name: '林冉', total: 48800, target: 48000, collectSale: 7600, collectInterview: 16500, collectCoop: 4900, contractCount: 3, signAmount: 39200, pendingAmount: 9600, refundSale: 0, refundInterview: 0, refundCoop: 0 },
];

const currency = (n: number) => `￥ ${n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const FinanceManager: React.FC<FinanceManagerProps> = ({ activeSubPage }) => {
  const [activePerformanceTab, setActivePerformanceTab] = useState('销售业绩');

  const isContract = activeSubPage === '合同管理';
  const isCollection = activeSubPage === '收款管理';
  const isRefund = activeSubPage === '退款管理';
  const isPerformance = activeSubPage === '红娘业绩';

  const contractTotal = useMemo(() => contractRows.reduce((s, r) => s + r.amount, 0), []);
  const contractReceived = useMemo(() => contractRows.reduce((s, r) => s + r.received, 0), []);
  const contractPending = useMemo(() => contractRows.reduce((s, r) => s + r.pending, 0), []);
  const contractRefunded = useMemo(() => contractRows.reduce((s, r) => s + r.refunded, 0), []);

  const collectionTotal = useMemo(() => collectionRows.reduce((s, r) => s + r.amount, 0), []);
  const refundDone = useMemo(() => refundRows.filter(r => r.status === '已退款').reduce((s, r) => s + r.amount, 0), []);
  const refundPending = useMemo(() => refundRows.filter(r => r.status !== '已退款').reduce((s, r) => s + r.amount, 0), []);

  const perfData = activePerformanceTab === '销售业绩' ? salesPerformance : servicePerformance;
  const perfTarget = perfData.reduce((s, r) => s + r.target, 0);
  const perfDone = perfData.reduce((s, r) => s + r.total, 0);
  const perfPct = Math.min(100, Math.round((perfDone / perfTarget) * 100));

  return (
    <div className="flex flex-col h-full -m-4 bg-[#f0f2f5] overflow-hidden">
      <div className="flex items-center bg-white border-b border-gray-200 h-12 px-4 space-x-1 shrink-0">
        <div className="flex-1 flex items-center overflow-x-auto no-scrollbar space-x-1">
          {['合同管理', '收款管理', '退款管理', '红娘业绩'].map(tab => (
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
        {isPerformance && (
          <>
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
            <div className="bg-white p-7 rounded-b-lg border border-t-0 border-gray-100 flex items-center">
              <div className="w-72 mr-8">
                <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${perfPct}%` }}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-600">{perfPct}%</div>
                </div>
              </div>
              <div className="flex items-center space-x-10 text-[13px]">
                <p className="text-gray-500">本月目标：<span className="text-indigo-600 font-bold">{currency(perfTarget)}</span></p>
                <p className="text-gray-500">当前已完成：<span className="text-emerald-500 font-bold">{currency(perfDone)}</span></p>
                <p className="text-gray-500">距离目标还差：<span className="text-orange-500 font-bold">{currency(Math.max(0, perfTarget - perfDone))}</span></p>
              </div>
            </div>
          </>
        )}

        {!isPerformance && (
          <div className="bg-white p-4 rounded shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-8 text-[13px]">
              {isContract && (
                <>
                  <p className="text-gray-500">合同总额：<span className="text-indigo-600 font-bold">{currency(contractTotal)}</span></p>
                  <p className="text-gray-500">已收款：<span className="text-emerald-500 font-bold">{currency(contractReceived)}</span></p>
                  <p className="text-gray-500">待收款：<span className="text-orange-500 font-bold">{currency(contractPending)}</span></p>
                  <p className="text-gray-500">已退款：<span className="text-rose-500 font-bold">{currency(contractRefunded)}</span></p>
                </>
              )}
              {isCollection && (
                <>
                  <p className="text-gray-500">已收款：<span className="text-emerald-500 font-bold">{currency(collectionTotal)}</span></p>
                  <p className="text-gray-500">待收款：<span className="text-orange-500 font-bold">{currency(contractPending)}</span></p>
                </>
              )}
              {isRefund && (
                <>
                  <p className="text-gray-500">已退款：<span className="text-emerald-500 font-bold">{currency(refundDone)}</span></p>
                  <p className="text-gray-500">待退款：<span className="text-orange-500 font-bold">{currency(refundPending)}</span></p>
                </>
              )}
            </div>
            <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">导出报表</button>
          </div>
        )}

        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col min-h-[420px]">
          <div className="flex-1 overflow-auto custom-scrollbar">
            {isContract && (
              <table className="w-full text-left border-collapse table-fixed min-w-[1200px]">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold">
                    <th className="px-4 py-3">合同编号</th><th className="px-4 py-3">客户</th><th className="px-4 py-3">签约金额</th><th className="px-4 py-3">已收</th><th className="px-4 py-3">待收</th><th className="px-4 py-3">已退款</th><th className="px-4 py-3">签约红娘</th><th className="px-4 py-3">面谈红娘</th><th className="px-4 py-3">签约日期</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {contractRows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 text-sm text-gray-500">{row.id}</td><td className="px-4 py-3 text-sm font-medium text-gray-800">{row.customer}</td><td className="px-4 py-3 text-sm">{currency(row.amount)}</td><td className="px-4 py-3 text-sm text-emerald-600">{currency(row.received)}</td><td className="px-4 py-3 text-sm text-orange-500">{currency(row.pending)}</td><td className="px-4 py-3 text-sm text-rose-500">{currency(row.refunded)}</td><td className="px-4 py-3 text-sm">{row.signer}</td><td className="px-4 py-3 text-sm">{row.interviewer}</td><td className="px-4 py-3 text-sm text-gray-500">{row.signDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {isCollection && (
              <table className="w-full text-left border-collapse table-fixed min-w-[980px]">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold">
                    <th className="px-4 py-3">收款编号</th><th className="px-4 py-3">合同编号</th><th className="px-4 py-3">客户</th><th className="px-4 py-3">收款金额</th><th className="px-4 py-3">方式</th><th className="px-4 py-3">签约红娘</th><th className="px-4 py-3">收款时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {collectionRows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 text-sm text-gray-500">{row.id}</td><td className="px-4 py-3 text-sm">{row.contractId}</td><td className="px-4 py-3 text-sm font-medium text-gray-800">{row.customer}</td><td className="px-4 py-3 text-sm text-emerald-600 font-bold">{currency(row.amount)}</td><td className="px-4 py-3 text-sm">{row.method}</td><td className="px-4 py-3 text-sm">{row.signer}</td><td className="px-4 py-3 text-sm text-gray-500">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {isRefund && (
              <table className="w-full text-left border-collapse table-fixed min-w-[1050px]">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold">
                    <th className="px-4 py-3">退款编号</th><th className="px-4 py-3">合同编号</th><th className="px-4 py-3">客户</th><th className="px-4 py-3">退款金额</th><th className="px-4 py-3">退款原因</th><th className="px-4 py-3">状态</th><th className="px-4 py-3">审批人</th><th className="px-4 py-3">时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {refundRows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 text-sm text-gray-500">{row.id}</td><td className="px-4 py-3 text-sm">{row.contractId}</td><td className="px-4 py-3 text-sm font-medium text-gray-800">{row.customer}</td><td className="px-4 py-3 text-sm text-rose-500 font-bold">{currency(row.amount)}</td><td className="px-4 py-3 text-sm">{row.reason}</td><td className="px-4 py-3 text-sm"><span className={`px-2 py-1 rounded text-xs ${row.status === '已退款' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{row.status}</span></td><td className="px-4 py-3 text-sm">{row.approver}</td><td className="px-4 py-3 text-sm text-gray-500">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {isPerformance && (
              <table className="w-full text-left border-collapse min-w-[1700px] table-fixed">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold">
                    <th className="px-4 py-3 w-[110px] text-center">红娘</th>
                    <th className="px-4 py-3 w-[140px] text-center">累计业绩</th>
                    <th className="px-4 py-3 w-[130px] text-center">本月目标</th>
                    <th className="px-4 py-3 w-[210px] text-center">完成度</th>
                    <th className="px-4 py-3 w-[120px] text-center">收款(销售)</th>
                    <th className="px-4 py-3 w-[120px] text-center">收款(面谈)</th>
                    <th className="px-4 py-3 w-[120px] text-center">收款(协作)</th>
                    <th className="px-4 py-3 w-[130px] text-center">签约合同</th>
                    <th className="px-4 py-3 w-[120px] text-center">签约金额</th>
                    <th className="px-4 py-3 w-[120px] text-center">待回款</th>
                    <th className="px-4 py-3 w-[120px] text-center">退费(销售)</th>
                    <th className="px-4 py-3 w-[120px] text-center">退费(面谈)</th>
                    <th className="px-4 py-3 w-[120px] text-center">退费(协作)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {perfData.map(row => {
                    const pct = Math.min(100, Math.round((row.total / row.target) * 100));
                    return (
                      <tr key={row.name} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 text-center font-medium text-gray-800">{row.name}</td>
                        <td className="px-4 py-3 text-center text-rose-500 font-bold">{currency(row.total)}</td>
                        <td className="px-4 py-3 text-center">{currency(row.target)}</td>
                        <td className="px-4 py-3">
                          <div className="h-4 bg-gray-100 rounded-full overflow-hidden relative">
                            <div className="h-full bg-indigo-500" style={{ width: `${pct}%` }}></div>
                            <span className="absolute inset-0 text-[10px] flex items-center justify-center text-gray-600 font-bold">{pct}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">{currency(row.collectSale)}</td>
                        <td className="px-4 py-3 text-center">{currency(row.collectInterview)}</td>
                        <td className="px-4 py-3 text-center">{currency(row.collectCoop)}</td>
                        <td className="px-4 py-3 text-center">{row.contractCount}</td>
                        <td className="px-4 py-3 text-center">{currency(row.signAmount)}</td>
                        <td className="px-4 py-3 text-center">{currency(row.pendingAmount)}</td>
                        <td className="px-4 py-3 text-center">{currency(row.refundSale)}</td>
                        <td className="px-4 py-3 text-center">{currency(row.refundInterview)}</td>
                        <td className="px-4 py-3 text-center">{currency(row.refundCoop)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceManager;
