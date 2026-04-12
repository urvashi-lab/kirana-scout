import { Database, Settings, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const skuCatalogue = [
  { name: "Parle-G Biscuit", category: "FMCG", price: 10, margin: 12 },
  { name: "Coca-Cola 500ml", category: "Beverages", price: 40, margin: 18 },
  { name: "Lays Classic", category: "Snacks", price: 20, margin: 22 },
  { name: "Dettol Soap", category: "Personal Care", price: 45, margin: 15 },
  { name: "Amul Butter 100g", category: "Dairy", price: 55, margin: 8 },
  { name: "Maggi Noodles", category: "FMCG", price: 14, margin: 14 },
  { name: "Thums Up 750ml", category: "Beverages", price: 45, margin: 20 },
  { name: "Kurkure 50g", category: "Snacks", price: 10, margin: 25 },
];

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-heading font-bold">Administration</h1>
      </div>

      <Tabs defaultValue="sku">
        <TabsList className="bg-muted rounded-xl p-1 h-auto">
          <TabsTrigger value="sku" className="rounded-lg text-xs">
            <Database className="h-3.5 w-3.5 mr-1.5" /> SKU Catalogue
          </TabsTrigger>
          <TabsTrigger value="config" className="rounded-lg text-xs">
            <Settings className="h-3.5 w-3.5 mr-1.5" /> Model Config
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sku" className="mt-4">
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-heading font-semibold">Product Database</h3>
              <Button variant="outline" size="sm">+ Add SKU</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                    <th className="text-right py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Price (₹)</th>
                    <th className="text-right py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Margin %</th>
                  </tr>
                </thead>
                <tbody>
                  {skuCatalogue.map((sku, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-3 font-medium">{sku.name}</td>
                      <td className="py-3 px-3 text-muted-foreground">{sku.category}</td>
                      <td className="py-3 px-3 text-right">₹{sku.price}</td>
                      <td className="py-3 px-3 text-right">{sku.margin}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="config" className="mt-4">
          <div className="glass-card rounded-2xl p-5 space-y-6">
            <h3 className="text-sm font-heading font-semibold">Model Parameters</h3>
            {[
              { label: "Turnover Multiplier", value: "2.5x", desc: "Applied to estimated inventory for daily sales projection" },
              { label: "Risk Threshold (High)", value: "0.35", desc: "Confidence below this triggers High Risk flag" },
              { label: "Risk Threshold (Medium)", value: "0.60", desc: "Confidence below this triggers Medium Risk flag" },
              { label: "Geo Radius (km)", value: "2.0", desc: "Radius for peer benchmarking comparison" },
              { label: "Min Images Required", value: "3", desc: "Minimum shop images for analysis" },
            ].map((param) => (
              <div key={param.label} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{param.label}</p>
                  <p className="text-xs text-muted-foreground">{param.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    className="w-20 text-right rounded-lg border bg-card px-3 py-1.5 text-sm font-heading font-bold focus:ring-1 focus:ring-primary focus:outline-none"
                    defaultValue={param.value}
                  />
                </div>
              </div>
            ))}
            <Button>Save Configuration</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
