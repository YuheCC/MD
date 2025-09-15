import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface Ion {
  symbol: string;
  name: string;
  available: boolean;
  comingSoon?: boolean;
}

const cations: Ion[] = [
  { symbol: "Li+", name: "Lithium", available: true },
  { symbol: "Na+", name: "Sodium", available: false, comingSoon: true },
  { symbol: "Mg2+", name: "Magnesium", available: false, comingSoon: true },
  { symbol: "Zn2+", name: "Zinc", available: false, comingSoon: true },
];

const anions: Ion[] = [
  { symbol: "BF4-", name: "Tetrafluoroborate", available: true },
  { symbol: "PF6-", name: "Hexafluorophosphate", available: true },
  { symbol: "FSI-", name: "Bis(fluorosulfonyl)imide", available: true },
  { symbol: "TFSI-", name: "Bis(trifluoromethylsulfonyl)imide", available: true },
];

export function SaltConfiguration() {
  const [selectedCation, setSelectedCation] = useState("Li+");
  const [selectedAnions, setSelectedAnions] = useState<string[]>(["BF4-"]);
  const [concentration, setConcentration] = useState("1.00");
  const [anionMoleRatios, setAnionMoleRatios] = useState<{[key: string]: string}>({"BF4-": "1.00"});

  const handleAnionSelection = (anionSymbol: string) => {
    setSelectedAnions(prev => {
      if (prev.includes(anionSymbol)) {
        // 如果已选中，取消选择（但至少保留一个）
        if (prev.length > 1) {
          const newSelected = prev.filter(anion => anion !== anionSymbol);
          // 移除对应的 mole ratio
          setAnionMoleRatios(ratios => {
            const newRatios = { ...ratios };
            delete newRatios[anionSymbol];
            return newRatios;
          });
          return newSelected;
        }
        return prev; // 如果只有一个，不允许取消选择
      } else {
        // 如果未选中，添加选择（但最多两个）
        if (prev.length < 2) {
          const newSelected = [...prev, anionSymbol];
          // 为新添加的 anion 设置默认 mole ratio
          setAnionMoleRatios(ratios => {
            const newRatios = { ...ratios };
            // 如果现在有两个 anion，将两个都设置为 0.50
            if (newSelected.length === 2) {
              newSelected.forEach(anion => {
                newRatios[anion] = "0.50";
              });
            } else {
              newRatios[anionSymbol] = "0.50";
            }
            return newRatios;
          });
          return newSelected;
        }
        return prev; // 如果已经有两个，不允许再添加
      }
    });
  };

  const handleMoleRatioChange = (anionSymbol: string, value: string) => {
    setAnionMoleRatios(prev => ({
      ...prev,
      [anionSymbol]: value
    }));
  };

  return (
    <div className="w-full">
      <h2 className="text-gray-900 font-medium mb-3" style={{ fontSize: '18px' }}>Salt Configuration</h2>
      <Card className="w-full border border-gray-300">
        <CardContent className="p-6 space-y-6">
        {/* Cation Selection */}
        <div>
          <Label className="mb-3 block text-foreground">Cation Selection</Label>
          <div className="grid grid-cols-4 gap-3">
            {cations.map((cation) => (
              <div
                key={cation.symbol}
                className={`relative p-4 border border-gray-300 rounded-lg text-center transition-all flex flex-col justify-center items-center ${
                  selectedCation === cation.symbol
                    ? ""
                    : cation.available
                    ? "bg-white hover:bg-gray-50 cursor-pointer"
                    : "bg-gray-100 cursor-not-allowed opacity-50"
                }`}
                style={selectedCation === cation.symbol ? { backgroundColor: '#f0f9f0', color: '#2d5a2d' } : {}}
                onClick={() => cation.available && setSelectedCation(cation.symbol)}
              >
                <div className="text-sm mb-1" style={selectedCation === cation.symbol ? { color: '#2d5a2d' } : cation.available ? {} : { color: '#9ca3af' }}>{cation.symbol}</div>
                <div className="text-xs" style={selectedCation === cation.symbol ? { color: '#2d5a2d' } : cation.available ? {} : { color: '#9ca3af' }}>{cation.name}</div>
                {cation.comingSoon && (
                  <div className="text-xs text-destructive mt-1">Will be available soon</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Anion Selection */}
        <div>
          <Label className="mb-3 block text-foreground">Anion Selection (Select 1-2)</Label>
          <div className="grid grid-cols-4 gap-3">
            {anions.map((anion) => {
              const isSelected = selectedAnions.includes(anion.symbol);
              const canDeselect = selectedAnions.length > 1;
              const canSelect = selectedAnions.length < 2;
              const isDisabled = !isSelected && !canSelect;
              
              return (
                <div
                  key={anion.symbol}
                  className={`p-4 border border-gray-300 rounded-lg text-center transition-all flex flex-col justify-center items-center ${
                    isSelected
                      ? ""
                      : isDisabled
                      ? "bg-gray-100 cursor-not-allowed opacity-50"
                      : "bg-white hover:bg-gray-50 cursor-pointer"
                  }`}
                  style={isSelected ? { backgroundColor: '#f0f9f0', color: '#2d5a2d' } : {}}
                  onClick={() => !isDisabled && handleAnionSelection(anion.symbol)}
                >
                  <div className="text-sm mb-1" style={isSelected ? { color: '#2d5a2d' } : {}}>{anion.symbol}</div>
                  <div className="text-xs" style={isSelected ? { color: '#2d5a2d' } : {}}>{anion.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total Salt Concentration */}
        <div>
          <Label htmlFor="concentration" className="mb-2 block text-foreground">
            Total Salt Concentration (mol/kg)
          </Label>
          <Input
            id="concentration"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
            className="w-full bg-white border-gray-300"
          />
        </div>

        {/* Anion Mole Ratios */}
        {selectedAnions.map((anionSymbol) => (
          <div key={anionSymbol}>
            <Label htmlFor={`moleRatio-${anionSymbol}`} className="mb-2 block text-foreground">
              {anionSymbol} Mole Ratio
            </Label>
            <Input
              id={`moleRatio-${anionSymbol}`}
              value={anionMoleRatios[anionSymbol] || "0.00"}
              onChange={(e) => handleMoleRatioChange(anionSymbol, e.target.value)}
              className="w-full bg-white border-gray-300"
            />
          </div>
        ))}

        {/* Salt Summary */}
        <div>
          <h4 className="mb-3 text-gray-900 font-medium">Salt Summary</h4>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
            <div className="text-sm text-muted-foreground mb-1">
              Selected: {selectedCation} + {selectedAnions.join(" + ")}
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Total salt concentration: {concentration} mol/kg
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Mole ratios: {selectedAnions.map(anion => `${anion} (${anionMoleRatios[anion] || "0.00"})`).join(", ")}
            </div>
            <div 
              className="text-sm"
              style={{
                color: Object.values(anionMoleRatios).reduce((sum, ratio) => sum + parseFloat(ratio || "0"), 0) === 1 ? '#16a34a' : '#dc2626'
              }}
            >
              Total mole ratio: {Object.values(anionMoleRatios).reduce((sum, ratio) => sum + parseFloat(ratio || "0"), 0).toFixed(2)} {Object.values(anionMoleRatios).reduce((sum, ratio) => sum + parseFloat(ratio || "0"), 0) === 1 ? "✓" : "✗"}
            </div>
          </div>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}