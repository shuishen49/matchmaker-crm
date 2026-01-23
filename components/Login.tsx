
import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl flex overflow-hidden max-w-5xl w-full animate-fadeIn">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-blue-50 items-center justify-center p-12">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <img 
              src="https://picsum.photos/seed/match/600/400" 
              alt="Matchmaker Illustration" 
              className="rounded-lg shadow-lg mb-8"
            />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">今生相爱 SCRM 系统</h2>
              <p className="text-gray-500">连接真爱，高效管理您的客户资源</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">红娘工作台</h1>
            <p className="text-gray-400 text-sm">登录CRM工作台，开启全新高效的工作模式</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="relative">
              <input 
                type="text" 
                placeholder="请输入您的账号" 
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
              />
            </div>

            <div className="relative">
              <input 
                type="password" 
                placeholder="请输入您的密码" 
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
              />
            </div>

            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="请输入验证码" 
                className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
              />
              <div className="w-32 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border border-dashed border-gray-300">
                <span className="text-lg font-mono font-bold tracking-widest text-gray-600">864797</span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              登 录
            </button>
          </form>

          <div className="mt-8 flex justify-between text-sm text-gray-400">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-gray-300 text-indigo-600" />
              记住我
            </label>
            <a href="#" className="hover:text-indigo-500">忘记密码？</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
