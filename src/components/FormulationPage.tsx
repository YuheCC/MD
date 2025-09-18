import { ConfigurationHeader } from "./ConfigurationHeader";
import { SaltConfiguration } from "./SaltConfiguration";
import { SolventConfiguration } from "./SolventConfiguration";
import { AnalysisRecords } from "./AnalysisRecords";
import { Button } from "./ui/button";
import { useState } from "react";
import { Plus, Eye, Trash2 } from "lucide-react";

interface FormulationPageProps {
  onNavigateToResults: () => void;
}

export function FormulationPage({ onNavigateToResults }: FormulationPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentView, setCurrentView] = useState<'list' | 'config'>('list');

  // 示例历史分析记录数据
  const analysisRecords = [
    {
      id: 1,
      name: "LiPF6 + EC/EMC Analysis",
      salt: "LiPF6",
      solvent: "EC/EMC",
      concentration: "1.0 mol/kg",
      fractionType: "Molar fraction",
      totalFraction: "1.00",
      createdAt: "2024-01-15 14:30",
      status: "Completed"
    },
    {
      id: 2,
      name: "LiTFSI + DME Analysis",
      salt: "LiTFSI",
      solvent: "DME",
      concentration: "0.8 mol/kg",
      fractionType: "Weight fraction",
      totalFraction: "1.00",
      createdAt: "2024-01-14 09:15",
      status: "Completed"
    },
    {
      id: 3,
      name: "LiBF4 + PC Analysis",
      salt: "LiBF4",
      solvent: "PC",
      concentration: "1.2 mol/kg",
      fractionType: "Molar fraction",
      totalFraction: "0.95",
      createdAt: "2024-01-13 16:45",
      status: "Completed"
    }
  ];

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
            <div className="flex-1 flex justify-center" style={{ minHeight: '600px', paddingTop: 'calc(50% - 150px)' }}>
              <div style={{ maxWidth: '500px', width: '100%' }}>
                {/* Header with Icon and Title */}
                <div className="flex items-center mb-4" style={{ marginTop: '-100px' }}>
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

  // 渲染配置页面
  const renderConfigView = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">New Configuration</h2>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView('list')}
        >
          Back to List
        </Button>
      </div>
      
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
  );

  // 渲染列表页面
  const renderListView = () => (
    <div className="space-y-6">
      {/* 新增按钮 */}
      <div className="flex justify-end">
        <Button 
          onClick={() => setCurrentView('config')}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Analysis
        </Button>
      </div>

      {/* 历史记录表格 */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Analysis Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Solvent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Concentration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fraction Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Fraction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analysisRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.salt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.solvent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.concentration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.fractionType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={record.totalFraction === "1.00" ? "text-green-600" : "text-red-600"}>
                      {record.totalFraction}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => onNavigateToResults()}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <ConfigurationHeader />
      
      <div className="pb-12" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Main Content Area */}
          <div className="flex-1">
            {currentView === 'list' ? renderListView() : renderConfigView()}
          </div>
        </div>
      </div>
    </div>
  );
}