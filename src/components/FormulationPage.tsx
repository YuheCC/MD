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
    setIsLoading(true);
    setProgress(0);
    
    // 模拟进度条动画
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.33; // 每100ms增加0.33%，总共3分钟完成
      });
    }, 100);
    
    // 模拟计算过程，实际应用中这里会是真实的API调用
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
      onNavigateToResults();
    }, 180000); // 3分钟(180秒)后完成
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <ConfigurationHeader />
        
        <div className="pb-12" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <div className="max-w-7xl mx-auto flex gap-8">
            {/* Main Content Area - Loading Overlay */}
            <div className="flex-1 flex justify-center" style={{ minHeight: '600px', paddingTop: 'calc(50% - 250px)' }}>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8" style={{ maxWidth: '500px', width: '100%' }}>
                {/* Header with Icon and Title */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">算法模型计算中</h2>
                  <p className="text-muted-foreground">系统正在处理您的模型参数,预计需要较长时间,请耐心等待</p>
                </div>

                {/* Information Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-gray-700">
                      <p>模型训练完成后,系统将自动向您发送消息通知</p>
                      <p className="mt-1">您可以关闭此页面,不会影响后台计算进程</p>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    className="px-6 py-2"
                    onClick={() => {
                      setIsLoading(false);
                      setProgress(0);
                    }}
                  >
                    关闭
                  </Button>
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