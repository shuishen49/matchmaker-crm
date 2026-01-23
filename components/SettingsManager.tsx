import React, { useState } from 'react';
import { CHAT_SCRIPTS, CHAT_CATEGORIES, ChatScript } from '../constants';

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
      {activeSubPage !== '基础设置' && activeSubPage !== '话术库' && activeSubPage !== '跟进模板' && (
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
