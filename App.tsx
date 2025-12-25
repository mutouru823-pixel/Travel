import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { HomeView } from './views/Overview';
import { MacroView } from './views/MacroView';
import { MicroView } from './views/MicroView';
import { ViewState, RouteData, POIData } from './types';
import { Loader2, MapPin, Calendar, Sparkles, Globe } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');

  // App Data State
  const [generatedRoute, setGeneratedRoute] = useState<RouteData | null>(null);
  const [generatedPOI, setGeneratedPOI] = useState<POIData | null>(null);
  const [searchSources, setSearchSources] = useState<{title: string, uri: string}[]>([]);

  // User Selection State
  const [destination, setDestination] = useState('北京, 中国');
  const [startDate, setStartDate] = useState('2025-05-01');
  const [endDate, setEndDate] = useState('2025-05-05');
  const [preference, setPreference] = useState('深度人文 & 摄影');

  const triggerAnalysis = async (routeId?: number) => {
    setIsAnalyzing(true);
    setAnalysisStep('连接全球 UGC 数据库...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      setAnalysisStep('实时检索目标地社交媒体评价 (Google Search)...');
      
      const prompt = `你是一个名为"SmartTravel"的专利级旅行规划引擎。
      任务：基于最新的互联网UGC内容（社交媒体、博客、评论），为用户规划行程。
      目的地：${destination}
      时间：从 ${startDate} 到 ${endDate}
      偏好：${preference}
      
      请生成：
      1. 一个宏观路线 (RouteData)。
      2. 一个核心POI的微观洞察 (POIData)。
      
      必须包含空间、时间、UGC、行为、多媒体六大特征分析。
      情感极性必须基于搜索到的真实用户共识。`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              route: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  name: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  score: { type: Type.NUMBER },
                  duration: { type: Type.STRING },
                  description: { type: Type.STRING },
                  matchReason: { type: Type.STRING },
                  features: {
                    type: Type.OBJECT,
                    properties: {
                      space: { type: Type.STRING },
                      time: { type: Type.STRING },
                      ugc: { type: Type.STRING },
                      behavior: { type: Type.STRING },
                      multimedia: { type: Type.STRING }
                    }
                  }
                },
                required: ['name', 'description', 'features']
              },
              poi: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  name: { type: Type.STRING },
                  type: { type: Type.STRING },
                  x: { type: Type.NUMBER },
                  y: { type: Type.NUMBER },
                  tags: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        text: { type: Type.STRING },
                        weight: { type: Type.INTEGER },
                        category: { type: Type.STRING }
                      }
                    }
                  },
                  insights: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        topic: { type: Type.STRING },
                        consensus: { type: Type.NUMBER },
                        importance: { type: Type.NUMBER },
                        summary: { type: Type.STRING },
                        polarity: { type: Type.STRING }
                      }
                    }
                  }
                },
                required: ['name', 'tags', 'insights']
              }
            }
          }
        }
      });

      const data = JSON.parse(response.text);
      setGeneratedRoute(data.route);
      setGeneratedPOI(data.poi);
      
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => ({
          title: chunk.web?.title || '参考来源',
          uri: chunk.web?.uri || '#'
        })) || [];
      setSearchSources(sources);

      setAnalysisStep('构建特征向量与时空聚类...');
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentView('macro');
      }, 1000);

    } catch (error) {
      console.error("Analysis Failed:", error);
      setIsAnalyzing(false);
      alert("实时分析失败，请检查网络或重新选择目的地。");
    }
  };

  const renderView = () => {
    if (isAnalyzing) {
      return (
        <div className="h-full flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="relative">
            <Loader2 className="w-20 h-20 text-brand-600 animate-spin" strokeWidth={1.5} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-brand-100 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>

          <div className="text-center space-y-4 max-w-md">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">正在联网检索 UGC 数据</h3>
              <p className="text-slate-500 text-sm italic">{analysisStep}</p>
            </div>

            <div className="grid grid-cols-1 gap-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-left">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Globe size={16} className="text-brand-500" />
                <span className="font-medium">目的地: {destination}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Calendar size={16} className="text-brand-500" />
                <span className="font-medium">{startDate} 至 {endDate}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return <HomeView 
          onNavigate={(view) => setCurrentView(view)} 
          onGenerate={triggerAnalysis}
          destination={destination}
          setDestination={setDestination}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          preference={preference}
          setPreference={setPreference}
        />;
      case 'macro':
        return <MacroView 
          routeData={generatedRoute} 
          sources={searchSources}
          onInspectPOI={() => setCurrentView('micro')}
        />;
      case 'micro':
        return <MicroView 
          poiData={generatedPOI}
        />;
      default:
        return <HomeView 
          onNavigate={setCurrentView} 
          onGenerate={triggerAnalysis}
          destination={destination}
          setDestination={setDestination}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          preference={preference}
          setPreference={setPreference}
        />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
}