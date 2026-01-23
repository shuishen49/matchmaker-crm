
import React from 'react';
import { SummaryCardProps } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: '新资源', value: 120 },
  { name: '待分配', value: 80 },
  { name: '跟进中', value: 450 },
  { name: '面谈中', value: 200 },
  { name: '已签约', value: 150 },
  { name: '服务中', value: 300 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#10b981', '#3b82f6'];

const SummaryCard: React.FC<SummaryCardProps> = ({ title, icon, colorClass, bgClass, stats }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex transition-all hover:shadow-md">
    <div className={`w-24 ${bgClass} flex flex-col items-center justify-center p-4`}>
      <img src={`https://img.icons8.com/color/96/${icon}.png`} className="w-10 h-10 mb-2" alt={title} />
      <span className={`text-sm font-bold ${colorClass}`}>{title}</span>
    </div>
    <div className="flex-1 p-4 grid grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex flex-col">
          <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
          <p className="text-xs text-gray-400 font-medium whitespace-nowrap">
            {stat.label}
            <i className="far fa-question-circle ml-1 text-[10px]"></i>
          </p>
          {stat.subValue && <p className="text-[10px] text-indigo-500 mt-1">{stat.subValue}</p>}
        </div>
      ))}
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">数据概览</h1>
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <div className="w-48 h-3 bg-gray-100 rounded-full mr-4 overflow-hidden">
              <div className="w-3/4 h-full bg-indigo-500 rounded-full"></div>
            </div>
            <span className="text-sm font-bold text-indigo-600">75%</span>
          </div>
          <div className="text-sm text-gray-500">
            本月目标：<span className="font-bold text-gray-800">¥ 200,000.00</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
          <span className="text-sm text-gray-500 mr-2">部门/红娘</span>
          <select className="bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer">
            <option>全部</option>
            <option>销售部</option>
            <option>服务部</option>
          </select>
        </div>
        <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-200">
          {['全部', '今天', '昨天', '本周', '本月'].map((label, idx) => (
            <button 
              key={idx} 
              className={`px-4 py-1 text-sm rounded-md transition-colors ${idx === 0 ? 'bg-white shadow-sm text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4">
        <SummaryCard 
          title="资源" 
          icon="group"
          bgClass="bg-blue-50"
          colorClass="text-blue-600"
          stats={[
            { label: '销售库(人)', value: '1,280' },
            { label: '待分配资源', value: '45' },
            { label: '公海资源', value: '890' },
            { label: '签约人数', value: '12', subValue: '转化率 4.5%' },
            { label: '回收站', value: '23' }
          ]}
        />
        <SummaryCard 
          title="财务" 
          icon="money-bag"
          bgClass="bg-green-50"
          colorClass="text-green-600"
          stats={[
            { label: '签约金额(元)', value: '¥ 124,500' },
            { label: '实际收款(元)', value: '¥ 98,200' },
            { label: '待回款金额(元)', value: '¥ 26,300' },
            { label: '退费金额(元)', value: '¥ 2,000' },
            { label: '合同数量', value: '15' }
          ]}
        />
        <SummaryCard 
          title="云呼" 
          icon="outgoing-call"
          bgClass="bg-indigo-50"
          colorClass="text-indigo-600"
          stats={[
            { label: '通话时长', value: '12:45:00' },
            { label: '拨打人数', value: '86' },
            { label: '拨打次数', value: '234' },
            { label: '累计接通', value: '156' },
            { label: '接通率', value: '66.7%' }
          ]}
        />
      </div>

      {/* Charts and Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-800">销售漏斗分析</h3>
            <button className="text-gray-400 hover:text-indigo-500">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">红娘业绩榜</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                    idx === 1 ? 'bg-yellow-100 text-yellow-600' : 
                    idx === 2 ? 'bg-gray-100 text-gray-600' : 
                    idx === 3 ? 'bg-orange-100 text-orange-600' : 'text-gray-400'
                  }`}>
                    {idx}
                  </div>
                  <img src={`https://picsum.photos/seed/avatar${idx}/40/40`} className="w-8 h-8 rounded-full mr-3" alt="" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">红娘_{idx}</p>
                    <p className="text-[10px] text-gray-400">销售部</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-indigo-600">¥ {(50000 / idx).toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400">成交 {10 - idx} 单</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-sm text-gray-400 hover:text-indigo-500 font-medium border-t border-gray-50 pt-4">
            查看完整排名 <i className="fas fa-chevron-right ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
