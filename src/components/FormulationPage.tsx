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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">计算正在进行中...</h2>
          <p className="text-gray-600 mb-4">请耐心等待，计算需要较长时间</p>
          <div className="text-sm text-gray-500">
            完成后会自动跳转到结果页面
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