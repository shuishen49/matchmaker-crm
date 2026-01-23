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

  const isBaseSettings = activeSubPage === '基础设置';

  if (!isBaseSettings) {
    return (
      <div className="flex flex-col h-full -m-4 bg-[#f0f2f5] items-center justify-center">
        <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
          <img src="https://scrm.oss-cn-beijing.aliyuncs.com/assets/no_data-78230080.png" className="w-40 opacity-60" alt="No data" />
          <p className="text-gray-400 text-base font-medium mt-4">{activeSubPage} 功能开发中...</p>
        </div>
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
