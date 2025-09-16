import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AnalysisRecord {
  id: string;
  timestamp: string;
  status: "Completed" | "Processing" | "Failed";
  saltConfig: {
    cation: string;
    anion: string;
    concentration: string;
    fractions: { [key: string]: string };
    totalFraction: string;
    fractionType: string;
  };
  solventConfig: {
    smiles: string[];
    fractions: string[];
    fractionType: string;
  };
}

interface AnalysisRecordsProps {
  onNewAnalysis?: () => void;
}

export function AnalysisRecords({ onNewAnalysis }: AnalysisRecordsProps) {
  const records: AnalysisRecord[] = [
    {
      id: "1",
      timestamp: "2025/1/15 14:30:25",
      status: "Completed",
      saltConfig: {
        cation: "Li+",
        anion: "BF4-",
        concentration: "1.00",
        fractions: { "BF4-": "1.00" },
        totalFraction: "1.00",
        fractionType: "molar"
      },
      solventConfig: {
        smiles: ["CCO"],
        fractions: ["1.00"],
        fractionType: "weight"
      }
    },
    {
      id: "2", 
      timestamp: "2025/1/14 16:45:12",
      status: "Completed",
      saltConfig: {
        cation: "Li+",
        anion: "TFSI-",
        concentration: "1.20",
        fractions: { "TFSI-": "1.00" },
        totalFraction: "1.00",
        fractionType: "weight"
      },
      solventConfig: {
        smiles: ["CCOCC"],
        fractions: ["1.00"],
        fractionType: "weight"
      }
    },
    {
      id: "3",
      timestamp: "2025/1/13 09:15:33",
      status: "Completed", 
      saltConfig: {
        cation: "Li+",
        anion: "BF4-, PF6-",
        concentration: "1.00",
        fractions: { "BF4-": "0.50", "PF6-": "0.50" },
        totalFraction: "1.00",
        fractionType: "molar"
      },
      solventConfig: {
        smiles: ["CCO", "CCOCC"],
        fractions: ["0.60", "0.40"],
        fractionType: "weight"
      }
    }
  ];



  return (
    <Card className="w-full border border-gray-300">
      <CardHeader className="py-3" style={{ paddingTop: '22px' }}>
        <CardTitle className="text-gray-900 font-bold">Analysis Records</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4" style={{ paddingTop: '8px' }}>
        {/* New Analysis Button */}
        <Button 
          variant="outline" 
          className="w-full border-gray-300 hover:bg-gray-50 flex items-center gap-2 text-sm"
          style={{ marginTop: '-30px', paddingTop: '4px', paddingBottom: '4px' }}
          onClick={onNewAnalysis}
        >
          <Plus className="w-3 h-3" />
          New Analysis
        </Button>

        {/* Records List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto" style={{ marginTop: '0px' }}>
          {records.map((record) => (
            <Card key={record.id} className="border border-gray-300">
              <CardContent className="p-3 space-y-4" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                {/* Header */}
                <div className="pt-1">
                  <span className="text-xs text-muted-foreground">{record.timestamp}</span>
                </div>

                {/* Configuration Details */}
                <div className="text-xs text-muted-foreground space-y-3">
                  <div>
                    Salt: {record.saltConfig.cation} + {record.saltConfig.anion}
                  </div>
                  <div>
                    Solvent: {record.solventConfig.smiles.join(", ")}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex-1 text-xs h-7">
                    View Details
                  </Button>
                    </DialogTrigger>
                    <DialogContent style={{ maxWidth: '1200px', height: '80vh', display: 'flex', flexDirection: 'column' }} className="[&>button]:top-[10px]">
                      <DialogHeader className="flex-shrink-0 border-b border-gray-200 pb-4">
                        <DialogTitle className="text-2xl font-semibold">Analysis Results</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 overflow-y-auto flex-1" style={{ maxHeight: 'calc(80vh - 120px)' }}>
                        <h2 className="text-lg font-medium text-gray-900">Salt & Solvent Configuration</h2>
                        <div className="grid grid-cols-2 gap-6">
                        {/* Salt Summary */}
                        <Card className="border border-gray-300">
                          <CardContent className="p-4">
                            <h3 className="text-lg font-medium mb-3">Salt Summary</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Selected:</span>
                                <span>{record.saltConfig.cation} + {record.saltConfig.anion}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total salt concentration:</span>
                                <span>{record.saltConfig.concentration} mol/kg</span>
                              </div>
                                       <div className="flex justify-between">
                                         <span className="text-gray-600">Fractions:</span>
                                         <div className="text-right">
                                           {Object.entries(record.saltConfig.fractions).map(([anion, fraction]) => (
                                             <div key={anion}>{anion}: {fraction}</div>
                                           ))}
                                         </div>
                                       </div>
                                       <div className="flex justify-between">
                                         <span className="text-gray-600">Fraction type:</span>
                                         <span>{record.saltConfig.fractionType === "molar" ? "Molar fraction" : "Weight fraction"}</span>
                                       </div>
                                       <div className="flex justify-between">
                                         <span className="text-gray-600">Total fraction:</span>
                                         <span className={record.saltConfig.totalFraction === "1.00" ? "text-gray-900" : "text-red-600"}>
                                           {record.saltConfig.totalFraction}
                                         </span>
                                       </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Solvent Summary */}
                        <Card className="border border-gray-300">
                          <CardContent className="p-4">
                            <h3 className="text-lg font-medium mb-3">Solvent Summary</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Solvent:</span>
                                <div className="text-right">
                                  {record.solventConfig.smiles.map((smile, index) => (
                                    <div key={index}>
                                      {smile}: {record.solventConfig.fractions[index]}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Fraction type:</span>
                                <span>{record.solventConfig.fractionType === "molar" ? "Molar fraction" : "Weight fraction"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total fraction:</span>
                                <span className={record.solventConfig.fractions.reduce((sum, fraction) => sum + parseFloat(fraction || "0"), 0) === 1 ? "text-gray-900" : "text-red-600"}>
                                  {record.solventConfig.fractions.reduce((sum, fraction) => sum + parseFloat(fraction || "0"), 0).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        </div>
                        
                        {/* System Properties and Cluster Analysis */}
                        <div className="space-y-4">
                          <h2 className="text-lg font-medium text-gray-900">Analysis Results</h2>
                          <div className="grid grid-cols-2 gap-6">
                            {/* System Properties */}
                            <Card className="border border-gray-300">
                              <CardContent className="p-4">
                                <h3 className="text-lg font-medium mb-3">System Properties</h3>
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

                            {/* Cluster Analysis */}
                            <Card className="border border-gray-300">
                              <CardContent className="p-4">
                                <h3 className="text-lg font-medium mb-3">Cluster Analysis</h3>
                                <div className="overflow-hidden">
                                  <table className="w-full">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Size</th>
                                        <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Category</th>
                                        <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Fraction</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                      <tr>
                                        <td className="px-3 py-2 text-sm text-gray-900">0</td>
                                        <td className="px-3 py-2">
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
                                        <td className="px-3 py-2 text-sm text-gray-900">20.0%</td>
                                      </tr>
                                      <tr>
                                        <td className="px-3 py-2 text-sm text-gray-900">1</td>
                                        <td className="px-3 py-2">
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
                                        <td className="px-3 py-2 text-sm text-gray-900">40.0%</td>
                                      </tr>
                                      <tr>
                                        <td className="px-3 py-2 text-sm text-gray-900">2</td>
                                        <td className="px-3 py-2">
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
                                        <td className="px-3 py-2 text-sm text-gray-900">10.0%</td>
                                      </tr>
                                      <tr>
                                        <td className="px-3 py-2 text-sm text-gray-900">3</td>
                                        <td className="px-3 py-2">
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
                                        <td className="px-3 py-2 text-sm text-gray-900">5.0%</td>
                                      </tr>
                                      <tr>
                                        <td className="px-3 py-2 text-sm text-gray-900">4</td>
                                        <td className="px-3 py-2">
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
                                        <td className="px-3 py-2 text-sm text-gray-900">25.0%</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                        
                        {/* Analysis Charts */}
                        <div className="space-y-4">
                          <h2 className="text-lg font-medium text-gray-900">Analysis Charts</h2>
                          <div className="grid grid-cols-2 gap-6">
                            {/* Radial Distribution Function and Coordination Number */}
                            <Card className="border border-gray-300">
                              <CardContent className="p-4">
                                <h3 className="text-base font-medium text-gray-900 mb-3">Radial Distribution Function and Coordination Number</h3>
                                <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 flex items-center justify-center" style={{ height: '300px' }}>
                                  <div className="text-center text-gray-500">
                                    <div className="text-lg mb-2">📊</div>
                                    <div className="text-sm">Chart placeholder</div>
                                    <div className="text-xs mt-1">Radial Distribution Function and Coordination Number</div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Mean Square Displacement */}
                            <Card className="border border-gray-300">
                              <CardContent className="p-4">
                                <h3 className="text-base font-medium text-gray-900 mb-3">Mean Square Displacement</h3>
                                <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 flex items-center justify-center" style={{ height: '300px' }}>
                                  <div className="text-center text-gray-500">
                                    <div className="text-lg mb-2">📈</div>
                                    <div className="text-sm">Chart placeholder</div>
                                    <div className="text-xs mt-1">Mean Square Displacement</div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                        
                        {/* Analysis File */}
                        <div className="space-y-4">
                          <h2 className="text-lg font-medium text-gray-900">Analysis File</h2>
                          <Card className="border border-gray-300">
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
                                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Download JSON
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" className="flex-1 text-xs h-7 text-red-600 hover:bg-red-50">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
