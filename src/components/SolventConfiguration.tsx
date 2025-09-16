import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { X } from "lucide-react";

interface Solvent {
  id: number;
  smiles: string;
  weightFraction: string;
}

export function SolventConfiguration() {
  const [fractionType, setFractionType] = useState("mole");
  const [solvents, setSolvents] = useState<Solvent[]>([
    { id: 1, smiles: "CCO", weightFraction: "1.00" }
  ]);

  const addSolvent = () => {
    if (solvents.length < 3) {
      const newId = Math.max(...solvents.map(s => s.id)) + 1;
      setSolvents([...solvents, { id: newId, smiles: "", weightFraction: "0" }]);
    }
  };

  const updateSolvent = (id: number, field: keyof Solvent, value: string) => {
    setSolvents(solvents.map(s => {
      if (s.id === id) {
        return { ...s, [field]: value };
      }
      return s;
    }));
  };

  const removeSolvent = (id: number) => {
    if (solvents.length > 1) {
      setSolvents(solvents.filter(s => s.id !== id));
    }
  };

  const totalWeightFraction = solvents.reduce((sum, s) => sum + parseFloat(s.weightFraction || "0"), 0);

  const isFractionValid = (fraction: string) => {
    if (fraction === '' || fraction === '0') return true; // 允许空值和默认值0
    const numValue = parseFloat(fraction);
    return !isNaN(numValue) && numValue >= 0.05;
  };

  return (
    <div className="w-full">
      <h2 className="text-gray-900 font-medium mb-3" style={{ fontSize: '18px' }}>Solvent Configuration</h2>
      <Card className="w-full border border-gray-300">
        <CardContent className="p-6 space-y-6">

        {/* SMILES Strings */}
        <div className="space-y-4">
          {solvents.map((solvent, index) => (
            <div key={solvent.id} className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor={`smiles-${solvent.id}`} className="mb-2 block text-foreground">
                  SMILES String {index + 1}
                </Label>
                <Input
                  id={`smiles-${solvent.id}`}
                  value={solvent.smiles}
                  onChange={(e) => updateSolvent(solvent.id, "smiles", e.target.value)}
                  placeholder="Enter SMILES string"
                  className="bg-white border-gray-300"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor={`fraction-${solvent.id}`} className="mb-2 block text-foreground">
                  Fraction (min: 0.05)
                </Label>
                <Input
                  id={`fraction-${solvent.id}`}
                  value={solvent.weightFraction}
                  onChange={(e) => updateSolvent(solvent.id, "weightFraction", e.target.value)}
                  placeholder="0.00"
                  min="0.05"
                  step="0.01"
                  className={`bg-white ${!isFractionValid(solvent.weightFraction) ? "border-red-500" : "border-gray-300"}`}
                />
                {!isFractionValid(solvent.weightFraction) && (
                  <div className="text-xs mt-1" style={{ color: '#dc2626' }}>
                    Fraction must be at least 0.05
                  </div>
                )}
              </div>
              <div className="w-8 flex items-center justify-center" style={{ marginLeft: '-10px' }}>
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSolvent(solvent.id)}
                    className="w-8 h-8 p-0 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add SMILES Button */}
        <Button 
          onClick={addSolvent} 
          variant="outline" 
          disabled={solvents.length >= 3}
          className={`border-gray-300 text-gray-900 hover:bg-gray-50 ${
            solvents.length >= 3 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ width: 'calc(100% - 40px)' }}
        >
          + Add SMILES {solvents.length >= 3 ? "(Max 3)" : ""}
        </Button>

        {/* Fraction Type */}
        <div>
          <Label className="mb-3 block text-foreground">Fraction Type</Label>
          <div className="flex gap-6">
            <label className="flex items-center cursor-pointer" style={{ gap: '12px' }}>
              <input
                type="radio"
                name="solventFractionType"
                value="mole"
                checked={fractionType === "mole"}
                onChange={(e) => setFractionType(e.target.value)}
                style={{ 
                  width: '12px', 
                  height: '12px',
                  accentColor: '#16a34a'
                }}
              />
              <span className="text-foreground" style={{ fontWeight: 'normal', fontSize: '14px' }}>Mole fraction</span>
            </label>
            <label className="flex items-center cursor-pointer" style={{ gap: '12px' }}>
              <input
                type="radio"
                name="solventFractionType"
                value="weight"
                checked={fractionType === "weight"}
                onChange={(e) => setFractionType(e.target.value)}
                style={{ 
                  width: '12px', 
                  height: '12px',
                  accentColor: '#16a34a'
                }}
              />
              <span className="text-foreground" style={{ fontWeight: 'normal', fontSize: '14px' }}>Weight fraction</span>
            </label>
          </div>
        </div>

        {/* Solvent Summary */}
        <div>
          <h4 className="mb-3 text-gray-900 font-medium">Solvent Summary</h4>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
            <div className="text-sm text-muted-foreground mb-1">
              Solvent: {solvents.map(s => `${s.smiles || "Empty"} (${s.weightFraction})`).join(", ")}
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              Fraction type: {fractionType === "mole" ? "Mole fraction" : "Weight fraction"}
            </div>
            <div className={`text-sm ${totalWeightFraction === 1 ? "text-green-600" : "text-destructive"}`}>
              Total fraction: {totalWeightFraction.toFixed(2)} {totalWeightFraction === 1 ? "✓" : ""}
            </div>
          </div>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}