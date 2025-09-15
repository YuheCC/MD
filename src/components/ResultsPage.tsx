import { ConfigurationHeader } from "./ConfigurationHeader";
import { AnalysisRecords } from "./AnalysisRecords";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Download } from "lucide-react";

interface ResultsPageProps {
  onNavigateBack: () => void;
  onNewAnalysis?: () => void;
}

export function ResultsPage({ onNavigateBack, onNewAnalysis }: ResultsPageProps) {
  const handleDownloadJSON = () => {
    // Create sample analysis data
    const analysisData = {
      timestamp: new Date().toISOString(),
      configuration: {
        salt: {
          cation: "Li+",
          anions: ["BF4-"],
          concentration: "1.00",
          moleRatios: {
            "BF4-": "1.00"
          }
        },
        solvent: {
          smiles: ["CCO"],
          fractions: ["1.00"],
          fractionType: "weight"
        }
      },
      results: {
        solubility: "High",
        compatibility: "Good",
        performance: "Optimal"
      }
    };

    // Create and download JSON file
    const dataStr = JSON.stringify(analysisData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'analysis_output.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      <ConfigurationHeader />
      
      <div className="pb-12" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div className="max-w-7xl mx-auto flex gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Results Header */}
            <div className="mb-6">
              <h1 className="font-semibold text-gray-900" style={{ fontSize: '20px' }}>Analysis Results</h1>
            </div>

            {/* System Properties */}
            <div className="w-full">
              <h2 className="text-gray-900 font-medium mb-3" style={{ fontSize: '18px' }}>System Properties</h2>
              <Card className="w-full border border-gray-300">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Density (g/cm³)</span>
                      <span className="text-gray-900">1.2000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Viscosity (cP)</span>
                      <span className="text-gray-900">2.6000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Conductivity (mS/cm)</span>
                      <span className="text-gray-900">5.7500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cluster Analysis */}
            <div className="w-full">
              <h2 className="text-gray-900 font-medium mb-3" style={{ fontSize: '18px' }}>Cluster Analysis</h2>
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Size</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Category</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fraction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">0</td>
                      <td className="px-4 py-2">
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: '#fef2f2', 
                            color: '#dc2626', 
                            border: '1px solid #fecaca' 
                          }}
                        >
                          SSIP
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">20.0%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">1</td>
                      <td className="px-4 py-2">
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: '#fff7ed', 
                            color: '#ea580c', 
                            border: '1px solid #fed7aa' 
                          }}
                        >
                          CIP
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">40.0%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">2</td>
                      <td className="px-4 py-2">
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: '#f0fdf4', 
                            color: '#16a34a', 
                            border: '1px solid #bbf7d0' 
                          }}
                        >
                          AGG
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">10.0%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">3</td>
                      <td className="px-4 py-2">
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: '#f0fdf4', 
                            color: '#16a34a', 
                            border: '1px solid #bbf7d0' 
                          }}
                        >
                          AGG
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">5.0%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">4</td>
                      <td className="px-4 py-2">
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: '#f0fdf4', 
                            color: '#16a34a', 
                            border: '1px solid #bbf7d0' 
                          }}
                        >
                          AGG
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">25.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts Module */}
            <div className="w-full">
              <h2 className="text-gray-900 font-medium mb-3" style={{ fontSize: '18px' }}>Analysis Charts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Radial Distribution Function and Coordination Number */}
                <div className="w-full">
                  <h3 className="text-base font-medium text-gray-900 mb-3">Radial Distribution Function and Coordination Number</h3>
                  <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 flex items-center justify-center" style={{ height: '300px' }}>
                    <div className="text-center text-gray-500">
                      <div className="text-lg mb-2">📊</div>
                      <div className="text-sm">Chart placeholder</div>
                      <div className="text-xs mt-1">Radial Distribution Function and Coordination Number</div>
                    </div>
                  </div>
                </div>

                {/* Mean Square Displacement */}
                <div className="w-full">
                  <h3 className="text-base font-medium text-gray-900 mb-3">Mean Square Displacement</h3>
                  <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 flex items-center justify-center" style={{ height: '300px' }}>
                    <div className="text-center text-gray-500">
                      <div className="text-lg mb-2">📈</div>
                      <div className="text-sm">Chart placeholder</div>
                      <div className="text-xs mt-1">Mean Square Displacement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis File */}
            <div className="w-full">
              <h2 className="text-gray-900 font-medium mb-3" style={{ fontSize: '18px' }}>Analysis File</h2>
              <Card className="w-full border border-gray-300">
                <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground mb-2">
                      Download the complete analysis results in JSON format
                    </p>
                    <p className="text-sm text-muted-foreground">
                      File contains configuration details, analysis parameters, and computed results
                    </p>
                  </div>
                  <Button
                    onClick={handleDownloadJSON}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Download className="w-4 h-4" />
                    Download JSON
                  </Button>
                </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Analysis Records Sidebar */}
          <div className="w-72 flex-shrink-0">
            <AnalysisRecords onNewAnalysis={onNewAnalysis} />
          </div>
        </div>
      </div>
    </div>
  );
}
