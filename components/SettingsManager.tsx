import React, { useState } from 'react';

interface SettingsManagerProps {
  activeSubPage: string;
}

const SettingsManager: React.FC<SettingsManagerProps> = ({ activeSubPage }) => {
  const [isSeaMechanismEnabled, setIsSeaMechanismEnabled] = useState(true);
  const [seaDays, setSeaDays] = useState(10);
  const [isWatermarkEnabled, setIsWatermarkEnabled] = useState(false);
  const [watermarkContent, setWatermarkContent] = useState('测试门店');
  const [fontSize, setFontSize] = useState(16);
  const [rotationAngle, setRotationAngle] = useState(-15);
  const [opacity, setOpacity] = useState(0.1);
  const [watermarkColor, setWatermarkColor] = useState('#3e3e3e');

  const scripts = [
    { id: 'SC-001', group: '初筛邀约', title: '电话开场破冰', scene: '新线索首联', updatedAt: '2026-04-05 10:12', owner: '王薇' },
    { id: 'SC-002', group: '到店促进', title: '异议处理：先看案例', scene: '客户犹豫到店', updatedAt: '2026-04-05 11:40', owner: '林冉' },
    { id: 'SC-003', group: '面谈推进', title: '高净值客户需求确认', scene: '面谈前问卷', updatedAt: '2026-04-05 14:08', owner: '赵辰' },
    { id: 'SC-004', group: '复联激活', title: '3天未回复二次触达', scene: '沉默客户唤醒', updatedAt: '2026-04-06 09:31', owner: '王薇' },
    { id: 'SC-005', group: '合同催收', title: '尾款提醒模板', scene: '待回款7天', updatedAt: '2026-04-06 13:27', owner: '陈若' },
    { id: 'SC-006', group: '售后关怀', title: '服务阶段满意度回访', scene: '服务30天', updatedAt: '2026-04-06 17:56', owner: '李念' },
  ];

  const templates = [
    { id: 'TP-101', name: '首次接触模板', trigger: '资源分配后 10 分钟', tags: '销售/首联', lastUsed: '2026-04-06 18:20' },
    { id: 'TP-102', name: '到店确认模板', trigger: '约见前 24 小时', tags: '销售/到店', lastUsed: '2026-04-06 16:03' },
    { id: 'TP-103', name: '未到店挽回模板', trigger: '爽约后 2 小时', tags: '销售/挽回', lastUsed: '2026-04-06 12:11' },
    { id: 'TP-104', name: '服务进度周报模板', trigger: '每周五 18:00', tags: '服务/周报', lastUsed: '2026-04-05 19:00' },
    { id: 'TP-105', name: '退款风险预警模板', trigger: '投诉标签出现时', tags: '财务/风控', lastUsed: '2026-04-04 15:38' },
    { id: 'TP-106', name: '合同回款提醒模板', trigger: '应收日前 3 天', tags: '财务/回款', lastUsed: '2026-04-06 09:47' },
  ];

  const packages = [
    { name: '轻享版', price: '¥9,800', cycle: '3个月', services: '3次深度匹配 + 1次形象指导' },
    { name: '进阶版', price: '¥18,800', cycle: '6个月', services: '8次深度匹配 + 专属顾问' },
    { name: '尊享版', price: '¥36,800', cycle: '12个月', services: '15次深度匹配 + VIP活动席位' },
    { name: '高管定制版', price: '¥68,800', cycle: '12个月', services: '定向猎配 + 私密社交方案' },
  ];

  const isBaseSettings = activeSubPage === '基础设置';

  if (!isBaseSettings) {
    return (
      <div className="flex flex-col h-full -m-4 bg-[#f0f2f5] overflow-hidden p-4">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">{activeSubPage}</h2>
          <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">新增</button>
        </div>

        {activeSubPage === '话术库' && (
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-auto">
            <table className="w-full text-sm min-w-[980px]">
              <thead className="bg-[#f8f9fb] text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left">话术编号</th>
                  <th className="px-4 py-3 text-left">分组</th>
                  <th className="px-4 py-3 text-left">标题</th>
                  <th className="px-4 py-3 text-left">适用场景</th>
                  <th className="px-4 py-3 text-left">更新时间</th>
                  <th className="px-4 py-3 text-left">维护人</th>
                </tr>
              </thead>
              <tbody>
                {scripts.map(item => (
                  <tr key={item.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3">{item.id}</td>
                    <td className="px-4 py-3">{item.group}</td>
                    <td className="px-4 py-3 font-medium text-gray-700">{item.title}</td>
                    <td className="px-4 py-3">{item.scene}</td>
                    <td className="px-4 py-3 text-gray-500">{item.updatedAt}</td>
                    <td className="px-4 py-3">{item.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSubPage === '跟进模板' && (
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead className="bg-[#f8f9fb] text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left">模板ID</th>
                  <th className="px-4 py-3 text-left">模板名称</th>
                  <th className="px-4 py-3 text-left">触发条件</th>
                  <th className="px-4 py-3 text-left">标签</th>
                  <th className="px-4 py-3 text-left">最近使用</th>
                </tr>
              </thead>
              <tbody>
                {templates.map(item => (
                  <tr key={item.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3">{item.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-700">{item.name}</td>
                    <td className="px-4 py-3">{item.trigger}</td>
                    <td className="px-4 py-3">{item.tags}</td>
                    <td className="px-4 py-3 text-gray-500">{item.lastUsed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSubPage === '服务套餐' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
            {packages.map(pkg => (
              <div key={pkg.name} className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">{pkg.name}</h3>
                  <span className="text-indigo-600 font-bold">{pkg.price}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">服务周期：{pkg.cycle}</p>
                <p className="text-sm text-gray-600 mt-3">{pkg.services}</p>
                <div className="mt-4 text-xs text-gray-400">支持分期付款 / 可加购增值服务</div>
              </div>
            ))}
          </div>
        )}

        {activeSubPage === '我的账号' && (
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 max-w-3xl">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold">管</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 text-sm">
                <div><span className="text-gray-500">姓名：</span><span className="font-medium text-gray-800">门店管理员</span></div>
                <div><span className="text-gray-500">手机号：</span><span className="font-medium text-gray-800">138****6092</span></div>
                <div><span className="text-gray-500">所属部门：</span><span className="font-medium text-gray-800">管理层 / 运营部</span></div>
                <div><span className="text-gray-500">角色：</span><span className="font-medium text-gray-800">超级管理员</span></div>
                <div><span className="text-gray-500">账号状态：</span><span className="text-emerald-600 font-bold">启用中</span></div>
                <div><span className="text-gray-500">最后登录：</span><span className="font-medium text-gray-800">2026-04-07 10:11</span></div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded text-sm">修改资料</button>
              <button className="px-4 py-2 border border-gray-200 rounded text-sm text-gray-600">安全设置</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full -m-4 bg-white overflow-hidden">
      {/* 顶部标签栏 */}
      <div className="flex items-center bg-white border-b border-gray-200 h-12 px-4 space-x-1 shrink-0">
        <div className="flex-1 flex items-center overflow-x-auto no-scrollbar space-x-1">
          {['基础设置'].map(tab => (
            <div
              key={tab}
              className={`flex items-center h-8 px-4 text-xs cursor-pointer border rounded-t-md transition-all whitespace-nowrap bg-white text-indigo-600 border-gray-200 border-b-white z-10 font-bold shadow-[0_-2px_5px_rgba(0,0,0,0.02)]`}
              style={{ marginBottom: '-1px' }}
            >
              <span className="mt-0.5">{tab}</span>
              <i className="fas fa-times ml-2 text-[9px] text-gray-400"></i>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
        <div className="max-w-4xl">
          <form className="space-y-8">
            {/* 启动坠海机制 */}
            <div className="flex items-start">
              <label className="w-32 text-sm text-gray-600 pt-1 shrink-0">启动坠海机制</label>
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div
                    onClick={() => setIsSeaMechanismEnabled(!isSeaMechanismEnabled)}
                    className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${isSeaMechanismEnabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
                  >
                    <div className="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all" style={{ left: isSeaMechanismEnabled ? '22px' : '2px' }}></div>
                  </div>
                  <span className="text-sm text-gray-400">开启后将启用坠海机制</span>
                  <i className="far fa-question-circle text-gray-400 cursor-pointer hover:text-indigo-600"></i>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-600">
                  <span>超过</span>
                  <input
                    type="number"
                    value={seaDays}
                    onChange={(e) => setSeaDays(parseInt(e.target.value))}
                    className="mx-2 w-16 h-8 border border-gray-300 rounded px-2 focus:outline-none focus:border-indigo-500 text-center"
                  />
                  <span>天，未跟进的资源，自动坠入公海</span>
                </div>

                <p className="mt-4 text-sm">
                  <span className="text-indigo-600 cursor-pointer hover:underline">点击延长坠海时间</span>
                  <span className="ml-4 text-gray-400 text-xs">节假日时启用，使用方法，如：放假3天，则延长3天坠海时间</span>
                </p>
              </div>
            </div>

            <div className="h-8"></div>

            {/* 界面水印配置 */}
            <div className="flex items-start">
              <label className="w-32 text-sm text-gray-600 pt-1 shrink-0">界面水印配置</label>
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div
                    onClick={() => setIsWatermarkEnabled(!isWatermarkEnabled)}
                    className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${isWatermarkEnabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
                  >
                    <div className="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all" style={{ left: isWatermarkEnabled ? '22px' : '2px' }}></div>
                  </div>
                  <span className="text-sm text-gray-400">开启后，在CRM后台界面会显示水印，可有效防止截图传播导致的数据泄露</span>
                </div>

                <div className="mt-6 space-y-6">
                  <div className="flex items-center">
                    <span className="w-20 text-sm text-gray-600">水印内容</span>
                    <div className="flex items-center flex-1 max-w-md">
                      <input
                        type="text"
                        value={watermarkContent}
                        onChange={(e) => setWatermarkContent(e.target.value)}
                        className="flex-1 h-9 border border-gray-300 rounded px-3 focus:outline-none focus:border-indigo-500 text-sm"
                        placeholder="请选择"
                        maxLength={30}
                      />
                      <span className="ml-3 text-sm text-gray-500">+ 当前账号信息+手机后4位</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="w-20 text-sm text-gray-600">字体大小</span>
                    <div className="flex items-center">
                      <div className="flex border border-gray-300 rounded overflow-hidden h-9">
                        <button
                          type="button"
                          onClick={() => setFontSize(Math.max(1, fontSize - 1))}
                          className="px-3 bg-gray-50 hover:bg-gray-100 border-r border-gray-300"
                        >
                          <i className="fas fa-minus text-xs text-gray-500"></i>
                        </button>
                        <input
                          type="number"
                          value={fontSize}
                          onChange={(e) => setFontSize(parseInt(e.target.value) || 0)}
                          className="w-16 text-center focus:outline-none text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setFontSize(Math.min(100, fontSize + 1))}
                          className="px-3 bg-gray-50 hover:bg-gray-100 border-l border-gray-300"
                        >
                          <i className="fas fa-plus text-xs text-gray-500"></i>
                        </button>
                      </div>
                      <span className="ml-4 text-xs text-gray-400">输入整数</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="w-20 text-sm text-gray-600">旋转角度</span>
                    <div className="flex items-center">
                      <div className="flex border border-gray-300 rounded overflow-hidden h-9">
                        <button
                          type="button"
                          onClick={() => setRotationAngle(Math.max(-180, rotationAngle - 1))}
                          className="px-3 bg-gray-50 hover:bg-gray-100 border-r border-gray-300"
                        >
                          <i className="fas fa-minus text-xs text-gray-500"></i>
                        </button>
                        <input
                          type="number"
                          value={rotationAngle}
                          onChange={(e) => setRotationAngle(parseInt(e.target.value) || 0)}
                          className="w-16 text-center focus:outline-none text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setRotationAngle(Math.min(180, rotationAngle + 1))}
                          className="px-3 bg-gray-50 hover:bg-gray-100 border-l border-gray-300"
                        >
                          <i className="fas fa-plus text-xs text-gray-500"></i>
                        </button>
                      </div>
                      <span className="ml-4 text-xs text-gray-400">-180~180之间的数值</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="w-20 text-sm text-gray-600">透明度</span>
                    <div className="flex items-center">
                      <div className="flex border border-gray-300 rounded overflow-hidden h-9">
                        <button
                          type="button"
                          onClick={() => setOpacity(Math.max(0, parseFloat((opacity - 0.05).toFixed(2))))}
                          className="px-3 bg-gray-50 hover:bg-gray-100 border-r border-gray-300"
                        >
                          <i className="fas fa-minus text-xs text-gray-500"></i>
                        </button>
                        <input
                          type="number"
                          step="0.05"
                          value={opacity}
                          onChange={(e) => setOpacity(parseFloat(e.target.value) || 0)}
                          className="w-16 text-center focus:outline-none text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setOpacity(Math.min(1, parseFloat((opacity + 0.05).toFixed(2))))}
                          className="px-3 bg-gray-50 hover:bg-gray-100 border-l border-gray-300"
                        >
                          <i className="fas fa-plus text-xs text-gray-500"></i>
                        </button>
                      </div>
                      <span className="ml-4 text-xs text-gray-400">0-1之间的数值</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="w-20 text-sm text-gray-600">颜色</span>
                    <div className="flex items-center">
                      <div className="w-10 h-10 border border-gray-300 p-1 rounded cursor-pointer">
                        <input
                          type="color"
                          value={watermarkColor}
                          onChange={(e) => setWatermarkColor(e.target.value)}
                          className="w-full h-full cursor-pointer border-none p-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 pl-32">
              <button
                type="button"
                className="w-32 py-2 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 transition-colors"
              >
                保存
              </button>
            </div>
          </form>
        </div>

        {/* 水印预览 */}
        <div className="absolute top-24 left-[600px] w-[520px] h-[300px] bg-gray-100 rounded-xl border border-gray-200 overflow-hidden pointer-events-none flex flex-wrap content-start">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="p-8 whitespace-nowrap"
              style={{
                transform: `rotate(${rotationAngle}deg)`,
                fontSize: `${fontSize}px`,
                opacity: opacity,
                color: watermarkColor,
                width: '180px',
                height: '100px'
              }}
            >
              {watermarkContent}@门店管理员
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
