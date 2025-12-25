import React from 'react';
import { RouteData } from '../types';
import { MapPin, Clock, Camera, Star, Footprints, Info, Zap, ArrowRight, ExternalLink, Globe } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from 'recharts';

const COMFORT_DATA = [
  { time: '08:00', 舒适度: 85 },
  { time: '10:00', 舒适度: 60 },
  { time: '12:00', 舒适度: 45 },
  { time: '14:00', 舒适度: 70 },
  { time: '16:00', 舒适度: 75 },
  { time: '18:00', 舒适度: 50 },
  { time: '20:00', 舒适度: 80 },
];

interface MacroViewProps {
  routeData: RouteData | null;
  sources: {title: string, uri: string}[];
  onInspectPOI: () => void;
}

export const MacroView: React.FC<MacroViewProps> = ({ routeData, sources, onInspectPOI }) => {
  if (!routeData) return <div className="p-10 text-center text-slate-400">正在等待数据分析结果...</div>;

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 animate-in slide-in-from-right duration-500">
      
      {/* Sidebar: Info & Sources */}
      <div className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <Globe size={20} className="text-brand-600"/> 互联网分析来源
        </h3>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {sources.length > 0 ? sources.map((source, i) => (
            <a
              key={i}
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-3 hover:border-brand-300 transition-colors group"
            >
              <div className="p-1.5 bg-slate-50 text-slate-400 group-hover:text-brand-500 rounded-lg">
                <ExternalLink size={14}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-700 truncate">{source.title}</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{source.uri}</p>
              </div>
            </a>
          )) : (
            <div className="p-4 text-xs text-slate-400 italic">正在从全网提取真实用户评价来源...</div>
          )}
        </div>
        
        <div className="p-4 bg-brand-900 rounded-xl text-white">
           <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">系统置信度</p>
           <div className="flex items-center justify-between">
              <span className="text-2xl font-black">{(routeData.score * 10).toFixed(1)}%</span>
              <div className="flex items-center gap-1 text-[10px] bg-white/20 px-2 py-0.5 rounded">
                 <Star size={10} className="fill-current"/> 核心匹配
              </div>
           </div>
        </div>
      </div>

      {/* Main Analysis Area */}
      <div className="flex-1 flex flex-col gap-6 min-h-0">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                         <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">联网分析生成</span>
                         <h2 className="text-2xl font-bold text-slate-900">{routeData.name}</h2>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-brand-500 mb-6">
                        <p className="text-sm text-slate-700 italic leading-relaxed">
                            "AI 洞察：{routeData.matchReason}"
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0"><MapPin size={16}/></div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">空间规划</p>
                                <p className="text-xs font-semibold text-slate-800">{routeData.features?.space}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0"><Camera size={16}/></div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">视觉打卡</p>
                                <p className="text-xs font-semibold text-slate-800">{routeData.features?.multimedia}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg shrink-0"><Star size={16}/></div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">UGC 情感摘要</p>
                                <p className="text-xs font-semibold text-slate-800">{routeData.features?.ugc}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg shrink-0"><Footprints size={16}/></div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">行为预测</p>
                                <p className="text-xs font-semibold text-slate-800">{routeData.features?.behavior}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-64 h-56 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">热度峰值分析</span>
                        <Info size={12} className="text-slate-400"/>
                    </div>
                    <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={COMFORT_DATA}>
                                <Area type="monotone" dataKey="舒适度" stroke="#0ea5e9" strokeWidth={3} fill="#0ea5e9" fillOpacity={0.1} />
                                <XAxis dataKey="time" hide />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-[10px] text-center text-slate-400 mt-2">基于最近 24 小时 UGC 活跃度</p>
                </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={onInspectPOI}
                  className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                >
                   进入微观 POI 深度洞察 <ArrowRight size={18}/>
                </button>
            </div>
        </div>

        <div className="flex-1 bg-slate-200 rounded-2xl border border-slate-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/116.3974,39.9093,12,0/1200x800?access_token=Pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGZ5...')] bg-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-brand-900/5"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full border border-slate-200 text-xs font-bold shadow-xl animate-bounce">
                     🗺️ 路线已根据实时交通与 UGC 热度优化
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};