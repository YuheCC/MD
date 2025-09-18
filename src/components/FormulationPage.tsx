import { ConfigurationHeader } from "./ConfigurationHeader";
import { SaltConfiguration } from "./SaltConfiguration";
import { SolventConfiguration } from "./SolventConfiguration";
import { AnalysisRecords } from "./AnalysisRecords";
import { Button } from "./ui/button";
import { useState } from "react";

interface FormulationPageProps {
  onNavigateToResults: () => void;
}

export function FormulationPage({ onNavigateToResults }: FormulationPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmitConfiguration = async () => {
    console.log("开始提交配置...");
    setIsLoading(true);
    setProgress(0);
    
    // 模拟进度条动画
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          console.log("进度条完成");
          return 100;
        }
        return prev + 2; // 每100ms增加2%，总共5秒完成
      });
    }, 100);
    
    // 模拟计算过程，实际应用中这里会是真实的API调用
    setTimeout(() => {
      console.log("计算完成，准备跳转...");
      setIsLoading(false);
      setProgress(0);
      onNavigateToResults();
    }, 5000); // 5秒后完成
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <ConfigurationHeader />
        
        <div className="pb-12" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <div className="max-w-7xl mx-auto flex gap-8">
            {/* Main Content Area - Loading Overlay */}
            <div className="flex-1 flex items-center justify-center" style={{ minHeight: '600px' }}>
              <div style={{ maxWidth: '500px', width: '100%' }}>
                {/* Header with Icon and Title */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">算法模型计算中</h2>
                    <p className="text-gray-500 text-sm mt-1">系统正在处理您的模型参数,预计需要较长时间,请耐心等待</p>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">总体进度</span>
                    <span className="text-gray-700 font-medium">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                {/* Information Box */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-gray-700">
                      <p>模型训练完成后,系统将自动向您发送消息通知</p>
                      <p className="mt-1">您可以关闭此页面,不会影响后台计算进程</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Records Sidebar - Still Visible */}
            <div className="w-72 flex-shrink-0">
              <AnalysisRecords />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ConfigurationHeader />
      
      <div className="pb-12" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div className="max-w-7xl mx-auto flex gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            <SaltConfiguration />
            <SolventConfiguration />
            
            <div className="flex justify-center pt-6">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                onClick={handleSubmitConfiguration}
              >
                Submit Configuration
              </Button>
            </div>
          </div>

          {/* Analysis Records Sidebar */}
          <div className="w-72 flex-shrink-0">
            <AnalysisRecords />
          </div>
        </div>
      </div>
    </div>
  );
}