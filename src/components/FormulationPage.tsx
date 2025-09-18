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

  const handleSubmitConfiguration = async () => {
    setIsLoading(true);
    
    // 模拟计算过程，实际应用中这里会是真实的API调用
    setTimeout(() => {
      setIsLoading(false);
      onNavigateToResults();
    }, 3000); // 3秒后完成
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <ConfigurationHeader />
        
        <div className="pb-12" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <div className="max-w-7xl mx-auto flex gap-8">
            {/* Main Content Area - Loading Overlay */}
            <div className="flex-1 flex items-center justify-center" style={{ minHeight: '600px' }}>
              <div className="text-center bg-white rounded-lg shadow-lg p-8 border border-gray-200" style={{ maxWidth: '400px' }}>
                <div className="relative mb-6">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 mx-auto"></div>
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-green-600 border-t-transparent mx-auto absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">计算正在进行中...</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">请耐心等待，计算需要较长时间</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <span className="ml-2">完成后会自动跳转到结果页面</span>
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