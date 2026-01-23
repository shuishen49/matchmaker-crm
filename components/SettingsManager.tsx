import React, { useState } from 'react';

interface SettingsManagerProps {
  activeSubPage: string;
}

interface ChatScript {
  id: string;
  order: number;
  type: '销售' | '服务';
  category: string;
  content: string;
  likes: number;
  enabled: boolean;
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
  const [chatScripts, setChatScripts] = useState<ChatScript[]>([
    {
      id: '157',
      order: 16,
      type: '销售',
      category: '一通邀约话术',
      content: '开场白：\n您好,我是**婚恋线下高端红娘老师刘老师 ,这边有看到您注册了一份征婚资料 给你打电话是给你介绍一下关注到你资料的男会员 便于后期给你们安排约会 牵线搭桥所以想了解一下你目前的情感状态 你目前是单身的情况吗?',
      likes: 0,
      enabled: true
    },
    {
      id: '159',
      order: 17,
      type: '销售',
      category: '一通邀约话术',
      content: '核实资料：\n核实资料:\n我看到您资料上写的，年龄28，身高160，四川绵阳人，在成都工作，到成都多久了呢？看您写的工作是做销售的，从事哪一方面的销售呀？收入写的是5k-8k是比较保守的还是比较实际的呢？还是蛮友能力的女孩子。我看到您照片非常可爱的女孩子，照片是什么时候拍的呀？双眼皮，眼睛很漂亮。',
      likes: 0,
      enabled: true
    },
    {
      id: '161',
      order: 18,
      type: '销售',
      category: '一通邀约话术',
      content: '单身原因：\n挖单身原因从：朋友圈、工作圈、社交圈、家人。\n我综合看了下您的情况，我觉得各个方面都不错，应该不缺乏异性的青睐呀，怎么到现在还是单身的情况呢？（备注：所有人都可以说真诚，不要p的太过。）\n坦诚＋提问：亲爱的，我问您这些情况，并非窥探您的隐私，而是得了解您，因为接下来我是您得专线红娘，只有我了解您，懂您，才能真正得帮助到您，其实真得我觉得您是一个蛮不错得女孩子，怎么会到现在还是单身得情况呢？（备注：针对于不配合得会员，坦诚之后再问到单身原因，走到自己的流程，不要被会员引导走。）\n重复＋提问（围绕工作忙的点深入问下去）：xx，您刚刚说您工作忙，忙到什么程度呀？早上几点上班，晚上几点下班呢？周六周天都有休息吗？休息的时候都做什么呀？你是属于什么样的工作性质呢？\n重复＋提问（围绕圈子小的点深入问下去）：xx，圈子小，小到什么程度呢？不至于一点机会都没有吧？您们工作单位有可以发展的人吗？那朋友呢？有没有给您介绍呀？介绍了几个呀？都什么情况呀？都什么时候给您介绍的呀？现在还在接触吗？父母呢，他们有没有给您介绍呀？什么时候介绍的呀？介绍了几个呢？都是什么情况呀？现在还有发展的可能吗？你们最后一次联系是什么时候呢？（凡事刨根问底，一定要多问几个为什么，把会员了解透了就能把住他了）\n引导＋提问：那您平时自己有没有用什么方式给自己找过呢？比如参加一些社交活动呀，party呀什么的？没有呀，为什么没去呢？是不好意思，还没有渠道呢？有参加呀，情况怎么样呢？有没有碰到还可以的呀？\n总结＋提问：亲爱的，我终于知道您为什么单身饿，您就是工作太忙，公司也没有合适的，在身边基本接触不到合适的人，介绍也不合适，自己也没有渠道机会去找，所有才到现在还是单身的情况。',
      likes: 0,
      enabled: true
    },
    {
      id: '163',
      order: 19,
      type: '销售',
      category: '一通邀约话术',
      content: '急迫动机\n挖迫切动机：（着手点：a，父母，b，自己  C.外界的压力)\n开放式问题：亲爱的，我想了解下，是什么触动到你现在想要找对象了呢？更多的是来源于自己的想法还是家人的压力呢？\n家人催：家人催多久拉？为什么突然催你或者一直这么着急啊？\n扩父母需求：',
      likes: 1,
      enabled: true
    },
    {
      id: '165',
      order: 20,
      type: '销售',
      category: '邀约五步总结',
      content: '邀约五步法流程\n1、开场白-高端红娘老师\n2、话天地-判断购买力和迫切度\n3、信息刺激-虚拟刺激\n4、入主题-到店的好处\n5、缔结-到店\n开场白三要素；\n我是谁，自报家门，表明身份，高端红娘老师\n我干嘛，沟通目的，审核资料，为面谈作铺垫\n关我什么事，利益点，制定专业征婚方案，解决单身困扰\n话天地流程有两点\n一个是挖出购买力，另一个是挖出迫切度\n注册目的，了解其是否想征婚，婚姻状况，自身想法\n核实资料，年龄、身高、工作、收入、基本情况了解（重点判断会员购买能力）\n婚恋需求，单身原因，紧迫动机\n品牌渲染，品牌历史，大气高端，专业安全，成功保障\n挖出购买能力-\n在台州、老家有无购房，购房地点、购房计划。\n有没有购车，是什么牌子的车子；平时有什么兴趣爱好（消费观）\n父母有没有稳定收入；理财计划；职位及工龄；未来职业规划；择偶要求；未来打算生几个孩子。\n挖出迫切度\n看您的资料非常优秀，各方面条件不错，为什么是单身呢？\n您的异性朋友怎么样呢？发展成为恋人的机会大不大呢？\n工作中的同事呢，异性同事多吗，找到的机会怎么样呢？\n您的亲戚朋友有给您介绍吗？情况怎么样呢？\n您父母对您的婚事怎么看待？催不催？催多久了？有介绍吗？\n您自己的想法呢？急不急？打算什么时候找到或结婚呢？\n是什么迫使你会想通过玫瑰心语来征婚呢？\n如果说您今年没带男、女朋友回家，您的父母会不会采取什么措施？\n增加紧迫感\n品牌渲染参考话术\n\n择偶要求-引出线下店符合条件的会员非常多，选择空间很大\n外在条件、内在修养、家庭背景、工作性质等。\n信息刺激要点\n同时锁定3个以上目标，提高兴趣度，让会员产生冲动，加快去店。\n按流程虚拟刺激。不指向具体ID和具体细节，询问会员感觉，避免主观色彩。\n突出到线下店这类型的会员非常多，选择机会越多越好。\n到店利益点\n安全性、专业性、红娘全程跟进、选择面广、成功率高。\n缔结话术\n目前开场白和沟通话术，与大家大同小异。\n问题主要有到店刺激度不够，客户明明说来，最后又不来了，这样的问题如何处理？\n二次邀约如何进行？\n收费话术感觉不是很灵活？',
      likes: 0,
      enabled: true
    },
    {
      id: '169',
      order: 22,
      type: '服务',
      category: '服务关单话术',
      content: '服务红娘开始服务的时候已经告诉会员，我们这个合约什么时间开启，多长时间，见多少人。我为你提供婚恋服务，和提供恋商和人际关系方面的提升。都包含在服务内。\n\n1，态度礼貌谦和-----对好关单的客户：\n亲爱的，咱们的服务期到了，从XX到XX时间，一共多长时间的服务。按照约定也见了XX个会员。我们的服务也要关单了，你在关单书上签个字吧。\n2，有效倾听-------不好关单的客户\n客户如果不满意，或者有异议：\n重点是“听”，听情况、听缘由、听需求……要有同理心，比如当客户表达出着急，可以用“是挺让人着急的”或安抚客户情绪“您先别着急”等措词来表达，而非视而不见、充耳不闻。\n不随便回答或不直接说“不知道”，而是做了解后解答，整个过程少说多听。或者告诉客户我跟领导反应一下。\n3，尊重对方\n帮TA总结这次相亲的成败，指出在做服务期间TA自身的改变。多说TA的收获和遇到的人没有珍惜错过姻缘。这类可劝说续费。\n4，理解，认可，卖人情\n咱们可以签关单书后，老师这边个人有合适的人选再免费帮你推荐1-2个。让客户平安落地。\n\n关单怎么跟会员沟通：\n一，服务期，要明确的告诉他后期不会有明确的推荐了。和安排约会了，或者是不会再有主动地安排推荐和牵线交换联系方式了。\n也要有个小小的仪式感，我们开始有个交接，那么结束了我们有个关单。\n关单后他会说我还单身呢或者怎么样，那就往后说，可以续费什么的。如果续费率不够高，我们就要往前看看我们的服务是不是做的不够好。\n\n不会关单，就没有续费。\n会员交接时有个开启服务，就有结束的时间。不管按时间算还是按人数算。咱们的合同约定已经完成了。后期就不会安排约见了，不主动推荐了。',
      likes: 0,
      enabled: true
    }
  ]);

  const chatCategories = [
    '全部', '一通邀约话术', '二通邀约话术', '三通邀约话术',
    '四通邀约话术', '五通邀约话术', 'PMP词汇',
    '服务关单话术', '邀约五步总结', 'VIP一对一服务规范',
    'VIP一对一服务流程', '心灵匹配 十六种恋爱'
  ];

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
          <button className="bg-indigo-600 text-white px-4 py-1.5 rounded text-sm hover:bg-indigo-700 flex items-center">
            <i className="fas fa-search mr-2"></i> 查询
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col p-4 space-y-4">
        {/* Toolbar */}
        <div className="bg-white p-3 rounded-t border border-gray-200 border-b-0 flex justify-between items-center">
          <button className="px-4 py-1.5 border border-gray-200 rounded text-sm hover:bg-gray-50">添加话术</button>
          <i className="fas fa-cog text-gray-400 cursor-pointer hover:text-indigo-600"></i>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden bg-white border border-gray-200 rounded-b">
          {/* Category Sidebar */}
          <div className="w-64 border-r border-gray-100 flex flex-col py-4">
            <h5 className="px-4 text-base font-medium text-gray-800 mb-2">话术分类</h5>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {chatCategories.map(cat => (
                <div
                  key={cat}
                  onClick={() => setActiveChatCategory(cat)}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${activeChatCategory === cat ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Table Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="overflow-x-auto overflow-y-auto custom-scrollbar flex-1">
              <table className="w-full text-left border-collapse table-fixed min-w-[800px]">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-gray-100 text-gray-600 text-[13px] font-bold sticky top-0 z-10">
                    <th className="px-4 py-3 w-12 text-center"><input type="checkbox" className="rounded" /></th>
                    <th className="px-4 py-3 w-20">排序</th>
                    <th className="px-4 py-3 w-24">类型</th>
                    <th className="px-4 py-3 w-32">分类</th>
                    <th className="px-4 py-3">内容</th>
                    <th className="px-4 py-3 w-24 text-center">点赞</th>
                    <th className="px-4 py-3 w-24 text-center">是否启用</th>
                    <th className="px-4 py-3 w-32 sticky right-0 bg-[#f8f9fb] text-center border-l border-gray-50 shadow-[-4px_0_8px_rgba(0,0,0,0.03)]">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {chatScripts.filter(s => activeChatCategory === '全部' || s.category === activeChatCategory).map(script => (
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
                          className={`w-8 h-4 rounded-full relative cursor-pointer mx-auto transition-colors ${script.enabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
                        >
                          <div className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all" style={{ left: script.enabled ? '17px' : '2px' }}></div>
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
      {activeSubPage !== '基础设置' && activeSubPage !== '话术库' && (
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
