import React from 'react';

interface RecordManagerProps {
  activeSubPage: string;
}

const followNotes = [
  { id: 'F-8012', resource: '苏语晴 / 139****1203', owner: '王薇', type: '销售', content: '客户希望本周四下班后到店，已发送路线与案例包。', attachment: '到店确认图.png', time: '2026-04-07 09:32' },
  { id: 'F-8011', resource: '沈知野 / 137****6632', owner: '林冉', type: '销售', content: '预算从 1.5w 调整到 2.2w，建议升级进阶套餐。', attachment: '预算沟通录音.mp3', time: '2026-04-07 08:51' },
  { id: 'F-8010', resource: '江沐然 / 136****4420', owner: '赵辰', type: '服务', content: '首次约见结束，双方继续沟通，跟进节点 +3 天。', attachment: '约见纪要.pdf', time: '2026-04-06 20:16' },
  { id: 'F-8009', resource: '夏时 / 186****0931', owner: '李念', type: '服务', content: '客户反馈邀约频率偏高，已调成每周 2 次。', attachment: '服务单-调整.png', time: '2026-04-06 18:42' },
  { id: 'F-8008', resource: '顾一 / 133****2288', owner: '王薇', type: '销售', content: '二次触达成功回复，约周六 14:30 到店。', attachment: '聊天截图.jpg', time: '2026-04-06 16:09' },
  { id: 'F-8007', resource: '程岚 / 138****9032', owner: '林冉', type: '销售', content: '客户提出隐私顾虑，已补充保密协议说明。', attachment: '保密条款.pdf', time: '2026-04-06 14:20' },
  { id: 'F-8006', resource: '周清和 / 135****0129', owner: '赵辰', type: '服务', content: '匹配库新增两位候选人，计划今晚推送。', attachment: '候选人卡片.zip', time: '2026-04-06 12:48' },
  { id: 'F-8005', resource: '宋晚 / 152****7740', owner: '李念', type: '服务', content: '已完成阶段满意度回访，评分 9/10。', attachment: '回访表.xlsx', time: '2026-04-06 10:17' },
];

const importLogs = [
  { id: 'IM-3004', file: '线索导入_0407.xlsx', operator: '周可', result: '成功 120 条 / 失败 3 条', source: '抖音投流', time: '2026-04-07 09:05' },
  { id: 'IM-3003', file: '服务客户批量更新.csv', operator: '陈若', result: '成功 68 条 / 失败 0 条', source: '门店补录', time: '2026-04-06 17:33' },
  { id: 'IM-3002', file: '历史合同导入.xlsx', operator: '王薇', result: '成功 32 条 / 失败 1 条', source: '财务归档', time: '2026-04-06 11:26' },
  { id: 'IM-3001', file: '公海资源恢复.csv', operator: '林冉', result: '成功 46 条 / 失败 2 条', source: '公海池', time: '2026-04-05 15:08' },
];

const exportLogs = [
  { id: 'EX-5104', file: '本周签约与回款报表.xlsx', operator: '陈若', rows: 84, scene: '财务周会', time: '2026-04-07 08:55' },
  { id: 'EX-5103', file: '销售漏斗跟进记录.xlsx', operator: '王薇', rows: 142, scene: '运营复盘', time: '2026-04-06 19:42' },
  { id: 'EX-5102', file: '服务阶段满意度汇总.csv', operator: '赵辰', rows: 57, scene: '服务例会', time: '2026-04-06 14:11' },
  { id: 'EX-5101', file: '重点客户名单.pdf', operator: '周可', rows: 26, scene: '店长审批', time: '2026-04-05 18:20' },
];

const RecordManager: React.FC<RecordManagerProps> = ({ activeSubPage }) => {
  const isFollow = activeSubPage === '跟进小记';
  const isImport = activeSubPage === '导入记录';
  const isExport = activeSubPage === '导出记录';

  return (
    <div className="flex flex-col h-full -m-4 bg-[#f0f2f5] overflow-hidden">
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
        <div className="bg-white p-4 rounded shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {isFollow && `共 ${followNotes.length} 条跟进记录`}
            {isImport && `共 ${importLogs.length} 条导入记录`}
            {isExport && `共 ${exportLogs.length} 条导出记录`}
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded">查询</button>
            <button className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded">重置</button>
          </div>
        </div>

        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col min-h-[420px]">
          <div className="flex-1 overflow-x-auto custom-scrollbar">
            {isFollow && (
              <table className="w-full text-left border-collapse table-fixed min-w-[1250px]">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold">
                    <th className="px-4 py-4 w-[100px]">ID</th>
                    <th className="px-4 py-4 w-[220px]">资源</th>
                    <th className="px-4 py-4 w-[120px]">跟进人</th>
                    <th className="px-4 py-4 w-[100px]">类型</th>
                    <th className="px-4 py-4">跟进内容</th>
                    <th className="px-4 py-4 w-[190px]">附件</th>
                    <th className="px-4 py-4 w-[180px]">跟进时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {followNotes.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-4 text-sm text-gray-500">{row.id}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-800">{row.resource}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{row.owner}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${row.type === '销售' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>{row.type}</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{row.content}</td>
                      <td className="px-4 py-4 text-sm text-indigo-600">{row.attachment}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {isImport && (
              <table className="w-full text-left border-collapse table-fixed min-w-[980px]">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold">
                    <th className="px-4 py-4 w-[120px]">导入ID</th>
                    <th className="px-4 py-4">文件名</th>
                    <th className="px-4 py-4 w-[120px]">操作人</th>
                    <th className="px-4 py-4 w-[220px]">导入结果</th>
                    <th className="px-4 py-4 w-[160px]">数据来源</th>
                    <th className="px-4 py-4 w-[180px]">时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {importLogs.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-4 text-sm text-gray-500">{row.id}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-800">{row.file}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{row.operator}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{row.result}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{row.source}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {isExport && (
              <table className="w-full text-left border-collapse table-fixed min-w-[980px]">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold">
                    <th className="px-4 py-4 w-[120px]">导出ID</th>
                    <th className="px-4 py-4">文件名</th>
                    <th className="px-4 py-4 w-[120px]">操作人</th>
                    <th className="px-4 py-4 w-[120px]">导出行数</th>
                    <th className="px-4 py-4 w-[180px]">导出场景</th>
                    <th className="px-4 py-4 w-[180px]">时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {exportLogs.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-4 text-sm text-gray-500">{row.id}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-800">{row.file}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{row.operator}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{row.rows}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{row.scene}</td>
                      <td className="px-4 py-4 text-sm text-gray-500">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordManager;
