import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function VersionSelector() {
  const [selectedVersion, setSelectedVersion] = useState("latest");

  const versions = [
    {
      id: "latest",
      name: "最新版本",
      description: "包含最新功能和改进",
      url: "/",
      status: "active"
    },
    {
      id: "v1.0.0",
      name: "V1.0.0 稳定版",
      description: "基础功能版本，稳定可靠",
      url: "/v1.0.0/",
      status: "stable"
    }
  ];

  const handleVersionSelect = (version: typeof versions[0]) => {
    setSelectedVersion(version.id);
    // 在实际应用中，这里可以切换应用状态或重新加载
    console.log(`切换到版本: ${version.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MD - 分子动力学分析平台
          </h1>
          <p className="text-xl text-gray-600">
            选择您要使用的版本
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {versions.map((version) => (
            <Card 
              key={version.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedVersion === version.id 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleVersionSelect(version)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{version.name}</CardTitle>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    version.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {version.status === 'active' ? '最新' : '稳定'}
                  </div>
                </div>
                <CardDescription className="text-base">
                  {version.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  variant={selectedVersion === version.id ? "default" : "outline"}
                >
                  {selectedVersion === version.id ? "当前选择" : "选择此版本"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500">
            所有版本都包含完整的分子动力学分析功能
          </p>
        </div>
      </div>
    </div>
  );
}
