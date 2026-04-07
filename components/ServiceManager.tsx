import React from 'react';

interface ServiceManagerProps {
  activeSubPage: string;
}

type Row = Record<string, string | number>;

const servicePages: Record<string, { columns: string[]; rows: Row[]; summary?: string }> = {
  待分配客户: {
    columns: ['客户', '手机号', '服务级别', '阶段', '约见状态', '顾问', '最近动作'],
    rows: [
      { 客户: '苏语晴', 手机号: '139****1203', 服务级别: '进阶版', 阶段: '待启动', 约见状态: '待安排', 顾问: '赵辰', 最近动作: '已完成资料建档' },
      { 客户: '沈知野', 手机号: '137****6632', 服务级别: '尊享版', 阶段: '服务中', 约见状态: '本周二约见', 顾问: '李念', 最近动作: '更新匹配画像' },
      { 客户: '江沐然', 手机号: '136****4420', 服务级别: '轻享版', 阶段: '待启动', 约见状态: '待安排', 顾问: '赵辰', 最近动作: '待电话确认时间' },
      { 客户: '夏时', 手机号: '186****0931', 服务级别: '高管定制', 阶段: '服务中', 约见状态: '已安排', 顾问: '李念', 最近动作: '本周四见面' },
      { 客户: '顾一', 手机号: '133****2288', 服务级别: '进阶版', 阶段: '服务中', 约见状态: '待确认', 顾问: '王薇', 最近动作: '发送候选人资料包' },
      { 客户: '程岚', 手机号: '138****9032', 服务级别: '尊享版', 阶段: '服务中', 约见状态: '已完成首见', 顾问: '林冉', 最近动作: '进入复盘阶段' },
    ],
  },
  我的客户: {
    columns: ['客户ID', '客户', '手机号', '服务级别', '当前阶段', '下次跟进', '服务顾问'],
    rows: [
      { 客户ID: 'SV-2101', 客户: '苏语晴', 手机号: '139****1203', 服务级别: '进阶版', 当前阶段: '匹配筛选', 下次跟进: '2026-04-08 19:00', 服务顾问: '赵辰' },
      { 客户ID: 'SV-2102', 客户: '沈知野', 手机号: '137****6632', 服务级别: '尊享版', 当前阶段: '约见推进', 下次跟进: '2026-04-08 15:00', 服务顾问: '李念' },
      { 客户ID: 'SV-2103', 客户: '顾一', 手机号: '133****2288', 服务级别: '进阶版', 当前阶段: '意向确认', 下次跟进: '2026-04-08 11:30', 服务顾问: '王薇' },
      { 客户ID: 'SV-2104', 客户: '程岚', 手机号: '138****9032', 服务级别: '尊享版', 当前阶段: '复盘优化', 下次跟进: '2026-04-09 18:20', 服务顾问: '林冉' },
    ],
  },
  约见管理: {
    columns: ['约见单号', '客户', '候选嘉宾', '约见时间', '地点', '状态', '服务红娘'],
    rows: [
      { 约见单号: 'MT-5001', 客户: '沈知野', 候选嘉宾: '温棠', 约见时间: '2026-04-08 19:30', 地点: '徐汇门店', 状态: '待到场', 服务红娘: '李念' },
      { 约见单号: 'MT-5002', 客户: '苏语晴', 候选嘉宾: '秦朗', 约见时间: '2026-04-08 20:00', 地点: '静安门店', 状态: '待确认', 服务红娘: '赵辰' },
      { 约见单号: 'MT-5003', 客户: '顾一', 候选嘉宾: '林枝', 约见时间: '2026-04-09 14:00', 地点: '线上视频', 状态: '已确认', 服务红娘: '王薇' },
      { 约见单号: 'MT-5004', 客户: '夏时', 候选嘉宾: '唐序', 约见时间: '2026-04-10 18:30', 地点: '浦东门店', 状态: '待到场', 服务红娘: '李念' },
    ],
  },
  关单库: {
    columns: ['关单编号', '客户', '手机号', '情感状态', '关单原因', '关单时间', '服务红娘'],
    rows: [
      { 关单编号: 'CL-3001', 客户: '陆南', 手机号: '139****4421', 情感状态: '已找到', 关单原因: '成功脱单', 关单时间: '2026-03-28', 服务红娘: '赵辰' },
      { 关单编号: 'CL-3002', 客户: '季深', 手机号: '131****8821', 情感状态: '暂停', 关单原因: '个人规划调整', 关单时间: '2026-03-26', 服务红娘: '林冉' },
      { 关单编号: 'CL-3003', 客户: '温棠', 手机号: '156****2210', 情感状态: '未找到', 关单原因: '到期未续费', 关单时间: '2026-03-24', 服务红娘: '李念' },
    ],
  },
  嘉宾库: {
    columns: ['嘉宾ID', '嘉宾', '手机号', '情感状态', '见面状态', '服务红娘', '最后跟进'],
    rows: [
      { 嘉宾ID: 'GB-8801', 嘉宾: '温棠', 手机号: '156****2210', 情感状态: '寻找中', 见面状态: '有安排', 服务红娘: '赵辰', 最后跟进: '2026-04-06 20:05' },
      { 嘉宾ID: 'GB-8802', 嘉宾: '秦朗', 手机号: '183****7142', 情感状态: '寻找中', 见面状态: '未安排', 服务红娘: '王薇', 最后跟进: '2026-04-06 18:33' },
      { 嘉宾ID: 'GB-8803', 嘉宾: '林枝', 手机号: '134****9938', 情感状态: '交往中', 见面状态: '有安排', 服务红娘: '李念', 最后跟进: '2026-04-06 16:42' },
      { 嘉宾ID: 'GB-8804', 嘉宾: '唐序', 手机号: '181****4510', 情感状态: '寻找中', 见面状态: '有安排', 服务红娘: '林冉', 最后跟进: '2026-04-06 15:12' },
    ],
  },
  我的合同: {
    columns: ['合同编号', '客户', '套餐', '签约金额', '已收', '待收', '签约时间'],
    rows: [
      { 合同编号: 'CT-240401', 客户: '苏语晴', 套餐: '进阶版', 签约金额: '￥18,800.00', 已收: '￥12,000.00', 待收: '￥6,800.00', 签约时间: '2026-04-01' },
      { 合同编号: 'CT-240402', 客户: '沈知野', 套餐: '尊享版', 签约金额: '￥36,800.00', 已收: '￥20,000.00', 待收: '￥16,800.00', 签约时间: '2026-04-02' },
      { 合同编号: 'CT-240405', 客户: '顾一', 套餐: '进阶版', 签约金额: '￥16,800.00', 已收: '￥8,000.00', 待收: '￥8,800.00', 签约时间: '2026-04-04' },
      { 合同编号: 'CT-240406', 客户: '程岚', 套餐: '尊享版', 签约金额: '￥26,800.00', 已收: '￥26,800.00', 待收: '￥0.00', 签约时间: '2026-04-05' },
    ],
    summary: '合同总额 ￥99,200.00 / 已收 ￥66,800.00 / 待收 ￥32,400.00',
  },
};

const tabs = ['待分配客户', '我的客户', '约见管理', '关单库', '嘉宾库', '我的合同'];

const ServiceManager: React.FC<ServiceManagerProps> = ({ activeSubPage }) => {
  const data = servicePages[activeSubPage] || servicePages['待分配客户'];

  return (
    <div className="flex flex-col h-full -m-4 bg-[#f0f2f5] overflow-hidden">
      <div className="flex items-center bg-white border-b border-gray-200 h-12 px-4 space-x-1 shrink-0">
        <div className="flex-1 flex items-center overflow-x-auto no-scrollbar space-x-1">
          {tabs.map(tab => (
            <div
              key={tab}
              className={`flex items-center h-8 px-4 text-xs cursor-pointer border rounded-t-md transition-all whitespace-nowrap ${
                activeSubPage === tab
                  ? 'bg-white text-indigo-600 border-gray-200 border-b-white z-10 font-bold'
                  : 'text-gray-500 border-transparent bg-gray-50/50 hover:bg-gray-100'
              }`}
              style={activeSubPage === tab ? { marginBottom: '-1px' } : {}}
            >
              <span className="mt-0.5">{tab}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
        <div className="bg-white rounded shadow-sm border border-gray-100 p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">{activeSubPage}：共 {data.rows.length} 条演示数据</div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded">查询</button>
            <button className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded">重置</button>
          </div>
        </div>

        {data.summary && (
          <div className="bg-white rounded shadow-sm border border-gray-100 p-4 text-sm text-gray-600">
            {data.summary}
          </div>
        )}

        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden flex-1">
          <div className="overflow-auto h-full max-h-[620px]">
            <table className="w-full text-sm min-w-[980px]">
              <thead className="bg-[#f8f9fb] text-gray-600 sticky top-0">
                <tr>
                  {data.columns.map(col => (
                    <th key={col} className="px-4 py-3 text-left whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, idx) => (
                  <tr key={idx} className="border-t border-gray-50 hover:bg-gray-50/50">
                    {data.columns.map(col => (
                      <td key={col} className="px-4 py-3 whitespace-nowrap text-gray-700">{String(row[col] ?? '')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManager;
