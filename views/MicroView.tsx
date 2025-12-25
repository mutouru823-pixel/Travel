import React, { useState, useEffect } from 'react';
import { POIData } from '../types';
import { MapPin, MessageSquare, ThumbsUp, ThumbsDown, Quote, BarChart3, Scan, Activity } from 'lucide-react';

interface MicroViewProps {
  poiData: POIData | null;
}

export const MicroView: React.FC<MicroViewProps> = ({ poiData }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (poiData) {
      setIsUpdating(true);
      const timer = setTimeout(() => setIsUpdating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [poiData]);

  if (!poiData) return <div className="p-10 text-center text-slate-400">正在检索微观特征...</div>;

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          
          {/* Map Selection Simulation */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden relative group">
              <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur px-3 py-2 rounded-lg text-white shadow-xl flex items-center gap-2">
                  <Scan size={16} className="text-brand-400 animate-pulse"/>
                  <span className="text-[10px] font-bold uppercase tracking-widest">UGC 空间密度分布</span>
              </div>
              <div className="flex-1 bg-slate-100 relative">
                 <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/117.27,40.65,12,0/600x800?access_token=Pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGZ5...')] bg-cover opacity-80"></div>
                 <div className="absolute left-[45%] top-[35%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 rounded-full bg-brand-500 border-4 border-white shadow-2xl flex items-center justify-center text-white">
                        <MapPin size={24} className="fill-current"/>
                    </div>
                 </div>
              </div>
          </div>

          {/* Details Dashboard */}
          <div className={`flex-1 flex flex-col gap-6 transition-all duration-300 ${isUpdating ? 'opacity-30 blur-sm' : 'opacity-100'}`}>
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Activity size={120} className="text-brand-600" />
                  </div>
                  <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{poiData.name}</h1>
                          <span className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold border border-brand-100">{poiData.type}</span>
                      </div>
                      <div className="flex gap-6">
                          <div className="flex flex-col">
                              <span className="text-[10px] text-slate-400 font-bold uppercase">共识满意度</span>
                              <span className="text-xl font-black text-green-600">{(poiData.insights?.[0]?.consensus * 100 || 85).toFixed(0)}%</span>
                          </div>
                          <div className="flex flex-col">
                              <span className="text-[10px] text-slate-400 font-bold uppercase">互联网关联文本</span>
                              <span className="text-xl font-black text-slate-800">深度解析完成</span>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Clustered Tags */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
                      <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                          <MessageSquare size={18} className="text-purple-500"/>
                          真实 UGC 标签聚合
                      </h3>
                      <div className="flex-1 flex flex-wrap gap-3 items-center justify-center p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                          {poiData.tags?.map((tag, i) => (
                              <span 
                                key={i}
                                className={`
                                    px-3 py-1.5 rounded-xl border font-bold
                                    ${tag.category === 'warning' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-white text-brand-700 border-brand-100 shadow-sm'}
                                    ${tag.weight >= 4 ? 'text-sm' : 'text-[10px]'}
                                `}
                              >
                                  {tag.text}
                              </span>
                          ))}
                      </div>
                  </div>

                  {/* Feature Ranking */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                      <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                          <BarChart3 size={18} className="text-blue-500"/>
                          游客关注核心维度
                      </h3>
                      <div className="space-y-5">
                          {poiData.insights?.slice(0, 3).map((insight, i) => (
                              <div key={i} className="group">
                                  <div className="flex justify-between text-xs font-bold mb-2">
                                      <span className="text-slate-600">{insight.topic}</span>
                                      <span className="text-brand-600">{insight.importance}%</span>
                                  </div>
                                  <div className="w-full bg-slate-100 rounded-full h-2">
                                      <div className="bg-slate-900 h-2 rounded-full" style={{width: `${insight.importance}%`}}></div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* LLM Insights */}
              <div className="space-y-4 pb-10">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <Quote size={18} className="text-brand-600"/>
                      基于实时搜索的观点摘要
                  </h3>
                  {poiData.insights?.map((insight, i) => (
                      <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                              <h4 className="font-bold text-slate-900 text-lg">{insight.topic}</h4>
                              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                                  insight.polarity === 'positive' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                              }`}>
                                  {insight.polarity === 'positive' ? <ThumbsUp size={14}/> : <ThumbsDown size={14}/>}
                                  {Math.round(insight.consensus * 100)}% 观点认同
                              </div>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed border-l-4 border-brand-100 pl-4">
                              {insight.summary}
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};