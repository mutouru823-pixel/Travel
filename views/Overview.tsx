import React from 'react';
import { ViewState } from '../types';
import { Search, MapPin, Calendar, Sliders, ArrowRight, TrendingUp, Activity, Database, Star, Clock } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
  onGenerate: (routeId?: number) => void;
  destination: string;
  setDestination: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  preference: string;
  setPreference: (v: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  onNavigate, 
  onGenerate,
  destination,
  setDestination,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  preference,
  setPreference
}) => {
  const trendingDestinations = ['北京', '上海', '成都', '大理', '西安', '冰岛', '东京'];
  
  const featured = [
    { id: 1, title: '北京胡同深度骑行', match: 98, duration: '2天1夜', tags: ['情感正向', '避开人流'], city: '北京' },
    { id: 2, title: '上海Art Deco巡礼', match: 95, duration: '1天', tags: ['视觉出片', '深度人文'], city: '上海' },
    { id: 3, title: '成都街头美食探秘', match: 92, duration: '3天2夜', tags: ['排队预警', '地道风味'], city: '成都' },
  ];

  const handleQuickSelect = (route: typeof featured[0]) => {
    setDestination(`${route.city}, 中国`);
    onGenerate(route.id);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Search Hero Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-5xl">
          <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
            每一次旅行，都应基于<span className="text-brand-600">真实体验</span>。
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl">
            自定义您的行程参数，系统将实时爬取并分析百万级全网 UGC 内容，为您规划最优方案。
          </p>

          <div className="bg-white p-3 rounded-2xl shadow-2xl border border-slate-200 flex flex-col xl:flex-row gap-3">
            {/* Destination Selection */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center px-4 py-2 bg-slate-50 rounded-xl focus-within:ring-2 ring-brand-200 transition-all">
                <MapPin className="text-brand-500 mr-3 shrink-0" size={20} />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">目的地</label>
                  <input 
                    type="text" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="输入城市名..."
                    className="w-full outline-none text-slate-900 font-bold bg-transparent text-base" 
                  />
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 px-1">
                {trendingDestinations.map(city => (
                  <button 
                    key={city}
                    onClick={() => setDestination(`${city}, 中国`)}
                    className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-500 rounded-md transition-colors font-bold"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="flex-[1.5] min-w-0 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 py-2 bg-slate-50 rounded-xl focus-within:ring-2 ring-brand-200 transition-all">
                <Clock className="text-brand-500 mr-3 shrink-0" size={20} />
                <div className="flex-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">开始日期</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full outline-none text-slate-900 font-bold bg-transparent text-sm cursor-pointer" 
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center px-4 py-2 bg-slate-50 rounded-xl focus-within:ring-2 ring-brand-200 transition-all">
                <Clock className="text-brand-500 mr-3 shrink-0" size={20} />
                <div className="flex-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">结束日期</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full outline-none text-slate-900 font-bold bg-transparent text-sm cursor-pointer" 
                  />
                </div>
              </div>
            </div>

            {/* Preference Selection */}
            <div className="flex-1 min-w-0 flex items-center px-4 py-2 bg-slate-50 rounded-xl focus-within:ring-2 ring-brand-200 transition-all">
              <Sliders className="text-brand-500 mr-3 shrink-0" size={20} />
               <div className="flex-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">旅行偏好</label>
                <select 
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  className="w-full outline-none text-slate-900 font-bold bg-transparent cursor-pointer text-sm appearance-none"
                >
                  <option>深度人文 & 摄影</option>
                  <option>亲子休闲 & 美食</option>
                  <option>特种兵打卡</option>
                  <option>自然风光 & 徒步</option>
                  <option>奢华度假 & SPA</option>
                </select>
              </div>
            </div>

            <button 
              onClick={() => onGenerate()}
              className="bg-brand-600 hover:bg-brand-700 active:scale-95 text-white rounded-xl px-8 py-4 font-black transition-all shadow-lg shadow-brand-200 flex items-center justify-center gap-3 group shrink-0"
            >
              联网分析 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-50/40 to-transparent opacity-50 pointer-events-none"></div>
      </section>

      {/* Real-time Data Dashboard (Unchanged for Context) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Activity className="text-brand-600" size={24} />
            UGC 实时分析引擎状态
          </h3>
          <div className="flex items-center gap-2 text-[10px] font-mono font-black text-slate-400 tracking-tighter">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             PROCESSING LIVE UGC DATA STREAM
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-brand-300 hover:shadow-md">
             <div className="flex items-start justify-between mb-4">
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">已处理 UGC 语料</p>
               <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Database size={18}/></div>
             </div>
             <h4 className="text-3xl font-black text-slate-900 tracking-tight">2,458,902</h4>
             <div className="mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[78%] animate-[shimmer_3s_infinite] relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-20"></div>
                </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-brand-300 hover:shadow-md">
             <div className="flex items-start justify-between mb-4">
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">语义噪音过滤率</p>
               <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Sliders size={18}/></div>
             </div>
             <h4 className="text-3xl font-black text-slate-900 tracking-tight">88.4%</h4>
             <p className="text-xs text-green-600 mt-3 font-bold flex items-center gap-1">
                <TrendingUp size={14}/> 语义理解精度提升 4.2%
             </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-brand-300 hover:shadow-md">
             <div className="flex items-start justify-between mb-4">
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">动态特征聚类</p>
               <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Activity size={18}/></div>
             </div>
             <h4 className="text-3xl font-black text-slate-900 tracking-tight">1,204</h4>
             <p className="text-xs text-slate-400 mt-3 font-medium">涵盖“反向旅游”等新特征</p>
          </div>
          
           <div 
             className="bg-slate-900 p-6 rounded-2xl shadow-xl flex flex-col justify-center text-white relative overflow-hidden group cursor-pointer active:scale-95 transition-all"
             onClick={() => onNavigate('micro')}
           >
             <div className="relative z-10">
               <p className="text-brand-400 text-[10px] font-black uppercase tracking-widest mb-1">今日深度洞察点</p>
               <h4 className="font-bold text-lg leading-tight group-hover:text-brand-200 transition-colors italic">"古北水镇" 评价波动预警</h4>
             </div>
             <ArrowRight className="absolute bottom-4 right-4 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" size={24} />
          </div>
        </div>
      </section>

      {/* Featured Routes */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">推荐生成的智能方案</h3>
            <p className="text-slate-500 text-sm mt-1">基于当前全网 UGC 热度与情感极性聚类得出</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {featured.map((route) => (
             <div 
                key={route.id} 
                onClick={() => handleQuickSelect(route)} 
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
             >
               <div className="h-48 bg-slate-100 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                 <div className="absolute bottom-4 left-4 z-20 flex flex-col">
                    <span className="text-brand-400 text-[10px] font-black uppercase tracking-widest">{route.duration}</span>
                    <span className="text-white font-black text-xl leading-tight">{route.title}</span>
                 </div>
                 <div className="absolute top-4 right-4 z-20 bg-brand-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                    匹配度 {route.match}%
                 </div>
                 <div className="absolute inset-0 bg-slate-300 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
               </div>
               <div className="p-5">
                 <div className="flex flex-wrap gap-2 mb-6">
                   {route.tags.map(t => (
                     <span key={t} className="text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-lg font-bold">
                       {t}
                     </span>
                   ))}
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 rounded-lg">
                      <Star size={14} className="text-amber-500 fill-current"/> 
                      <span className="text-amber-700 font-black text-sm">4.9</span>
                   </div>
                   <span className="text-brand-600 font-black text-xs flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                     分析详情 <ArrowRight size={14}/>
                   </span>
                 </div>
               </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};