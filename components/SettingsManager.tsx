import React, { useState } from 'react';
import { CHAT_SCRIPTS, CHAT_CATEGORIES, ChatScript, SERVICE_PACKAGES, ServicePackage } from '../constants';

interface SettingsManagerProps {
  activeSubPage: string;
}

const SettingsManager: React.FC<SettingsManagerProps> = ({ activeSubPage }) => {
  // Base Settings State
  const [isSeaMechanismEnabled, setIsSeaMechanismEnabled] = useState(true);
  const [seaDays, setSeaDays] = useState(10);
  const [isWatermarkEnabled, setIsWatermarkEnabled] = useState(false);
  const [watermarkContent, setWatermarkContent] = useState('测试门店');
  const [fontSize, setFontSize] = useState(16);
  const [rotationAngle, setRotationAngle] = useState(-15);
  const [opacity, setOpacity] = useState(0.1);
  const [watermarkColor, setWatermarkColor] = useState('#3e3e3e');

  // Chat Script Library State
  const [chatSearchText, setChatSearchText] = useState('');
  const [activeChatCategory, setActiveChatCategory] = useState('全部');
  const [chatScripts, setChatScripts] = useState<ChatScript[]>(CHAT_SCRIPTS);

  // Follow-up Template State
  const [templateSearchText, setTemplateSearchText] = useState('');

  // Service Package State
  const [servicePackages, setServicePackages] = useState<ServicePackage[]>(SERVICE_PACKAGES);

  // My Account State
  const [accountTab, setAccountTab] = useState('我的资料');

  const renderBaseSettings = () => (
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
  );

  const renderChatScriptLibrary = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f0f2f5]">
      {/* Search Bar */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">话术内容</span>
            <div className="relative">
              <input
                type="text"
                value={chatSearchText}
                onChange={(e) => setChatSearchText(e.target.value)}
                className="w-64 h-9 border border-gray-300 rounded px-3 focus:outline-none focus:border-indigo-500 text-sm"
                placeholder="请输入"
              />
            </div>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-1.5 rounded text-sm hover:bg-indigo-700 flex items-center shadow-sm">
            <i className="fas fa-search mr-2"></i> 查询
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col p-4 space-y-4">
        {/* Toolbar */}
        <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex justify-between items-center">
          <button className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded text-sm hover:bg-gray-50 hover:border-indigo-400 transition-colors">添加话术</button>
          <span className="iconfont icon-a-1 text-gray-400 cursor-pointer hover:text-indigo-600 fz17"></span>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm">
          {/* Category Sidebar */}
          <div className="w-60 border-r border-gray-50 flex flex-col py-4">
            <h5 className="px-4 text-base font-medium text-gray-800 mb-2">话术分类</h5>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {CHAT_CATEGORIES.map(cat => (
                <div
                  key={cat}
                  onClick={() => setActiveChatCategory(cat)}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${activeChatCategory === cat ? 'bg-indigo-50 text-indigo-600 font-bold border-r-4 border-indigo-500' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Table Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="overflow-x-auto overflow-y-auto custom-scrollbar flex-1">
              <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold sticky top-0 z-10">
                    <th className="px-4 py-3 w-12 text-center"><input type="checkbox" className="rounded" /></th>
                    <th className="px-4 py-3 w-20">排序</th>
                    <th className="px-4 py-3 w-24">类型</th>
                    <th className="px-4 py-3 w-32">分类</th>
                    <th className="px-4 py-3">内容</th>
                    <th className="px-4 py-3 w-24 text-center">点赞</th>
                    <th className="px-4 py-3 w-28 text-center">是否启用</th>
                    <th className="px-4 py-3 w-32 sticky right-0 bg-[#f8f9fb] text-center border-l border-gray-50 shadow-[-4px_0_8px_rgba(0,0,0,0.03)]">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {chatScripts
                    .filter(s => activeChatCategory === '全部' || s.category === activeChatCategory)
                    .filter(s => !chatSearchText || s.content.toLowerCase().includes(chatSearchText.toLowerCase()))
                    .map(script => (
                    <tr key={script.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-4 text-center"><input type="checkbox" className="rounded" /></td>
                      <td className="px-4 py-4 text-sm text-gray-500">{script.order}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className={script.type === '销售' ? 'text-orange-500' : 'text-green-500'}>{script.type}</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{script.category}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 whitespace-pre-wrap line-clamp-3">{script.content}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 text-center">{script.likes}</td>
                      <td className="px-4 py-4 text-center">
                        <div
                          onClick={() => {
                            const newScripts = chatScripts.map(s => s.id === script.id ? { ...s, enabled: !s.enabled } : s);
                            setChatScripts(newScripts);
                          }}
                          className={`w-10 h-5 rounded-full relative cursor-pointer mx-auto transition-colors ${script.enabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
                        >
                          <div className="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all" style={{ left: script.enabled ? '22px' : '2px' }}></div>
                        </div>
                      </td>
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
        </div>
      </div>
    </div>
  );

  const renderServicePackage = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f0f2f5]">
      {/* Alert */}
      <div className="p-4 bg-white">
        <div className="bg-orange-50 border border-orange-100 rounded p-3 flex items-start space-x-3">
          <i className="fas fa-exclamation-circle text-orange-400 mt-0.5"></i>
          <p className="text-[13px] text-gray-600 leading-relaxed">
            设置服务套餐，可用于业绩预测，也可用于创建合同时，选择相应的套餐后，快速自动填写相关服务参数。服务级别请到自定义参数中设置
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col p-4 space-y-4 pt-0">
        {/* Toolbar */}
        <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 rounded text-sm hover:bg-gray-50 hover:border-indigo-400 transition-colors">添加套餐</button>
            <span className="iconfont icon-a-1 text-gray-400 cursor-pointer hover:text-indigo-600 fz17"></span>
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col">
          <div className="overflow-x-auto overflow-y-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse table-fixed min-w-[1200px]">
              <thead>
                <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold sticky top-0 z-10">
                  <th className="px-4 py-3 w-20 sticky left-0 bg-[#f8f9fb] z-20 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">ID</th>
                  <th className="px-4 py-3 w-32">服务级别</th>
                  <th className="px-4 py-3 w-64">套餐标题</th>
                  <th className="px-4 py-3 w-32">时长</th>
                  <th className="px-4 py-3 w-40">价格</th>
                  <th className="px-4 py-3 w-32">安排人数</th>
                  <th className="px-4 py-3">备注</th>
                  <th className="px-4 py-3 w-32 text-center">是否启用</th>
                  <th className="px-4 py-3 w-32 sticky right-0 bg-[#f8f9fb] z-20 text-center border-l border-gray-50 shadow-[-2px_0_5px_rgba(0,0,0,0.02)]">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {servicePackages.map(pkg => (
                  <tr key={pkg.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4 text-sm text-gray-500 sticky left-0 bg-white z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">{pkg.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-600 font-medium">{pkg.level}</td>
                    <td className="px-4 py-4 text-sm text-gray-800">{pkg.title}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{pkg.duration}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 font-bold">
                      <span className="text-xs mr-0.5">￥</span>{pkg.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{pkg.headcount}</td>
                    <td className="px-4 py-4 text-sm text-gray-400">{pkg.remarks}</td>
                    <td className="px-4 py-4 text-center">
                      <div
                        onClick={() => {
                          const newPkgs = servicePackages.map(p => p.id === pkg.id ? { ...p, enabled: !p.enabled } : p);
                          setServicePackages(newPkgs);
                        }}
                        className={`w-10 h-5 rounded-full relative cursor-pointer mx-auto transition-colors ${pkg.enabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
                      >
                        <div className="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all" style={{ left: pkg.enabled ? '22px' : '2px' }}></div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center sticky right-0 bg-white z-10 border-l border-gray-50 shadow-[-2px_0_5px_rgba(0,0,0,0.02)]">
                      <button className="text-indigo-600 text-[13px] font-bold hover:underline mx-2">编辑</button>
                      <button className="text-rose-500 text-[13px] font-bold hover:underline mx-2">删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white border-t border-gray-50 px-4 py-3 flex items-center justify-end space-x-2">
            <span className="text-xs text-gray-500">共 {servicePackages.length} 条</span>
            <div className="flex items-center border border-gray-200 rounded px-2 py-1 text-xs text-gray-600 cursor-pointer hover:border-indigo-400 transition-colors">
              <span>20条/页</span>
              <i className="fas fa-caret-down ml-2"></i>
            </div>
            <button disabled className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 cursor-not-allowed">
              <i className="fas fa-chevron-left text-[10px]"></i>
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-indigo-500 rounded bg-white text-indigo-600 text-xs font-bold">1</button>
            <button disabled className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 cursor-not-allowed">
              <i className="fas fa-chevron-right text-[10px]"></i>
            </button>
            <div className="flex items-center text-xs text-gray-600">
              <span className="mr-2">前往</span>
              <input type="number" defaultValue={1} className="w-10 h-8 border border-gray-200 rounded text-center focus:outline-none focus:border-indigo-400" />
              <span className="ml-2">页</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMyAccount = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Tabs */}
      <div className="border-b border-gray-100 px-4 h-10 flex items-center bg-white sticky top-0 z-10">
        <div className="flex space-x-8">
          {['我的资料', '修改密码'].map(tab => (
            <div
              key={tab}
              onClick={() => setAccountTab(tab)}
              className={`h-10 flex items-center text-[13px] cursor-pointer relative transition-colors ${accountTab === tab ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
              {accountTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {accountTab === '我的资料' ? (
          <div className="p-8">
            {/* Header / Basic Info */}
            <div className="flex items-start border-b border-gray-100 pb-8">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm shrink-0">
                <img
                  src="https://scrm.oss-cn-beijing.aliyuncs.com/assets/union_headimg-20a3fc4b.png"
                  className="w-full h-full object-cover"
                  alt="Avatar"
                />
              </div>
              <div className="ml-6 flex flex-col justify-between h-24 py-1">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">门店管理员</h2>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <span className="mr-8">账号：mc6yhe</span>
                    <button className="text-indigo-600 font-bold hover:underline flex items-center">
                      <i className="far fa-edit mr-1.5"></i> 编辑资料
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
              {[
                { label: '门店', value: '测试门店' },
                { label: '部门', value: '管理层' },
                { label: '角色', value: '负责人' },
                { label: '手机', value: '--' },
                { label: 'QQ', value: '--' },
                { label: '销售资源配额', value: '不限' },
                {
                  label: '微信登录',
                  value: (
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-2">未绑定</span>
                      <button className="text-indigo-600 font-bold hover:underline">点击绑定</button>
                    </div>
                  )
                },
                { label: '座机', value: '--' },
                { label: '邮箱', value: '--' },
                { label: '微信', value: '--' },
                { label: '每日资源配额', value: '不限' },
                { label: '创建时间', value: '2026-01-16 13:53' },
                { label: '登录次数', value: '6' },
                {
                  label: '二维码',
                  value: (
                    <div className="w-10 h-10 bg-gray-100 rounded p-1">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQyNkY1OTlDQURGODExRTlCNDNFRTJBNzAxMTQxQTQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQyNkY1OTlEQURGODExRTlCNDNFRTJBNzAxMTQxQTQyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDI2RjU5OUFBREY4MTFFOUI0M0VFMkE3MDExNDFBNDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDI2RjU5OUJBREY4MTFFOUI0M0VFMkE3MDExNDFBNDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7solWjAAAHNklEQVR42uzd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" alt="QR Code" className="w-full h-full" />
                    </div>
                  )
                },
                { label: '最后登录', value: '2026-01-23 18:04' },
                { label: '登录IP', value: '27.8.140.136' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center text-sm">
                  <span className="w-24 text-gray-500 shrink-0">{item.label}:</span>
                  <div className="flex-1 text-gray-700 font-medium">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center h-full">
            <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center max-w-md w-full">
              <i className="fas fa-lock text-gray-200 text-6xl mb-6"></i>
              <h3 className="text-xl font-bold text-gray-800 mb-2">修改密码</h3>
              <p className="text-gray-400 text-center mb-8">为了您的账户安全，建议定期修改密码。</p>

              <div className="w-full space-y-4">
                <input type="password" placeholder="请输入旧密码" className="w-full h-10 border border-gray-300 rounded px-4 focus:outline-none focus:border-indigo-500" />
                <input type="password" placeholder="请输入新密码" className="w-full h-10 border border-gray-300 rounded px-4 focus:outline-none focus:border-indigo-500" />
                <input type="password" placeholder="请再次确认新密码" className="w-full h-10 border border-gray-300 rounded px-4 focus:outline-none focus:border-indigo-500" />
                <button className="w-full bg-indigo-600 text-white font-bold py-2 rounded shadow-md hover:bg-indigo-700 transition-colors">确认修改</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderFollowUpTemplate = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f0f2f5]">
      {/* Search Bar */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">模板内容</span>
            <div className="relative">
              <input
                type="text"
                value={templateSearchText}
                onChange={(e) => setTemplateSearchText(e.target.value)}
                className="w-64 h-9 border border-gray-300 rounded px-3 focus:outline-none focus:border-indigo-500 text-sm"
                placeholder="请输入"
              />
            </div>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-1.5 rounded text-sm hover:bg-indigo-700 flex items-center shadow-sm">
            <i className="fas fa-search mr-2"></i> 查询
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col p-4 space-y-4">
        {/* Toolbar */}
        <div className="bg-white p-3 rounded shadow-sm border border-gray-100 flex justify-between items-center">
          <button className="px-4 py-1.5 border border-gray-200 text-gray-600 rounded text-sm hover:bg-gray-50 hover:border-indigo-400 transition-colors">添加跟进模板</button>
          <span className="iconfont icon-a-1 text-gray-400 cursor-pointer hover:text-indigo-600 fz17"></span>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col">
          <div className="overflow-x-auto overflow-y-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse table-fixed min-w-[1200px]">
              <thead>
                <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold sticky top-0 z-10">
                  <th className="px-4 py-3 w-12 text-center"><input type="checkbox" disabled className="rounded opacity-50 cursor-not-allowed" /></th>
                  <th className="px-4 py-3 w-24">ID</th>
                  <th className="px-4 py-3 w-28">类型</th>
                  <th className="px-4 py-3 w-48">标题</th>
                  <th className="px-4 py-3 w-48">应用到阶段</th>
                  <th className="px-4 py-3">跟进模板</th>
                  <th className="px-4 py-3 w-32 text-center">是否启用</th>
                  <th className="px-4 py-3 w-32 sticky right-0 bg-[#f8f9fb] text-center border-l border-gray-50 shadow-[-4px_0_8px_rgba(0,0,0,0.03)]">操作</th>
                </tr>
              </thead>
              <tbody>
                {/* Empty State */}
                <tr>
                  <td colSpan={8} className="py-20">
                    <div className="flex flex-col items-center justify-center">
                      <img src="https://scrm.oss-cn-beijing.aliyuncs.com/assets/no_data-78230080.png" className="w-40 opacity-60" alt="No data" />
                      <p className="text-gray-400 text-base font-medium mt-4">暂无数据</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white border-t border-gray-50 px-4 py-3 flex items-center justify-end space-x-2">
            <span className="text-xs text-gray-500">共 0 条</span>
            <div className="flex items-center border border-gray-200 rounded px-2 py-1 text-xs text-gray-600 cursor-pointer hover:border-indigo-400 transition-colors">
              <span>20条/页</span>
              <i className="fas fa-caret-down ml-2"></i>
            </div>
            <button disabled className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 cursor-not-allowed">
              <i className="fas fa-chevron-left text-[10px]"></i>
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-indigo-500 rounded bg-white text-indigo-600 text-xs font-bold">1</button>
            <button disabled className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 cursor-not-allowed">
              <i className="fas fa-chevron-right text-[10px]"></i>
            </button>
            <div className="flex items-center text-xs text-gray-600">
              <span className="mr-2">前往</span>
              <input type="number" defaultValue={1} className="w-10 h-8 border border-gray-200 rounded text-center focus:outline-none focus:border-indigo-400" />
              <span className="ml-2">页</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full -m-4 bg-white overflow-hidden">
      {/* 顶部标签栏 */}
      <div className="flex items-center bg-white border-b border-gray-200 h-12 px-4 space-x-1 shrink-0">
        <div className="flex-1 flex items-center overflow-x-auto no-scrollbar space-x-1">
          {[activeSubPage].map(tab => (
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

      {activeSubPage === '基础设置' && renderBaseSettings()}
      {activeSubPage === '话术库' && renderChatScriptLibrary()}
      {activeSubPage === '跟进模板' && renderFollowUpTemplate()}
      {activeSubPage === '服务套餐' && renderServicePackage()}
      {activeSubPage === '我的账号' && renderMyAccount()}
      {activeSubPage !== '基础设置' && activeSubPage !== '话术库' && activeSubPage !== '跟进模板' && activeSubPage !== '服务套餐' && activeSubPage !== '我的账号' && (
        <div className="flex-1 overflow-y-auto p-12 flex flex-col items-center justify-center bg-[#f0f2f5]">
          <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
            <img src="https://scrm.oss-cn-beijing.aliyuncs.com/assets/no_data-78230080.png" className="w-40 opacity-60" alt="No data" />
            <p className="text-gray-400 text-base font-medium mt-4">{activeSubPage} 功能开发中...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsManager;
