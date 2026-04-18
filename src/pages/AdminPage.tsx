import { Database, Settings, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const skuCatalogue = [
  // FMCG
  { name: "Parle-G Biscuit", category: "FMCG", price: 10, margin: 12 },
  { name: "Maggi Noodles", category: "FMCG", price: 14, margin: 14 },
  { name: "Surf Excel 500g", category: "FMCG", price: 95, margin: 16 },
  { name: "Vim Bar 200g", category: "FMCG", price: 30, margin: 13 },
  { name: "Ariel Powder 1kg", category: "FMCG", price: 210, margin: 17 },
  { name: "Good Day Cashew 150g", category: "FMCG", price: 30, margin: 18 },
  { name: "Britannia Marie Gold", category: "FMCG", price: 35, margin: 14 },
  { name: "Colgate Strong Teeth 200g", category: "FMCG", price: 115, margin: 20 },
  { name: "Lizol Floor Cleaner 500ml", category: "FMCG", price: 130, margin: 19 },
  { name: "Harpic Power Plus 500ml", category: "FMCG", price: 125, margin: 18 },

  // Beverages
  { name: "Coca-Cola 500ml", category: "Beverages", price: 40, margin: 18 },
  { name: "Thums Up 750ml", category: "Beverages", price: 45, margin: 20 },
  { name: "Sprite 600ml", category: "Beverages", price: 40, margin: 17 },
  { name: "Pepsi 500ml", category: "Beverages", price: 38, margin: 16 },
  { name: "Frooti Mango 200ml", category: "Beverages", price: 15, margin: 22 },
  { name: "Real Juice Orange 1L", category: "Beverages", price: 110, margin: 20 },
  { name: "Bisleri Water 1L", category: "Beverages", price: 20, margin: 25 },
  { name: "Red Bull 250ml", category: "Beverages", price: 125, margin: 28 },
  { name: "Nescafe Classic 50g", category: "Beverages", price: 145, margin: 24 },
  { name: "Tata Tea Premium 250g", category: "Beverages", price: 130, margin: 19 },

  // Snacks
  { name: "Lays Classic 26g", category: "Snacks", price: 20, margin: 22 },
  { name: "Kurkure 50g", category: "Snacks", price: 10, margin: 25 },
  { name: "Haldiram Bhujia 200g", category: "Snacks", price: 90, margin: 26 },
  { name: "Bingo Mad Angles 50g", category: "Snacks", price: 20, margin: 23 },
  { name: "Too Yumm Multigrain 60g", category: "Snacks", price: 25, margin: 21 },
  { name: "Bikano Chana Chur 200g", category: "Snacks", price: 60, margin: 27 },
  { name: "Pringles Original 107g", category: "Snacks", price: 150, margin: 30 },
  { name: "Cornitos Nachos 60g", category: "Snacks", price: 30, margin: 24 },

  // Personal Care
  { name: "Dettol Soap 75g", category: "Personal Care", price: 45, margin: 15 },
  { name: "Dove Soap 100g", category: "Personal Care", price: 58, margin: 18 },
  { name: "Head & Shoulders 340ml", category: "Personal Care", price: 310, margin: 22 },
  { name: "Pantene Shampoo 200ml", category: "Personal Care", price: 175, margin: 20 },
  { name: "Vaseline Lotion 200ml", category: "Personal Care", price: 180, margin: 25 },
  { name: "Nivea Cream 100ml", category: "Personal Care", price: 165, margin: 23 },
  { name: "Old Spice Deo 150ml", category: "Personal Care", price: 250, margin: 28 },
  { name: "Gillette Mach3 Razor", category: "Personal Care", price: 175, margin: 30 },
  { name: "Whisper Ultra 15 Pads", category: "Personal Care", price: 75, margin: 20 },
  { name: "Garnier Face Wash 100ml", category: "Personal Care", price: 135, margin: 26 },

  // Dairy
  { name: "Amul Butter 100g", category: "Dairy", price: 55, margin: 8 },
  { name: "Amul Taaza Milk 1L", category: "Dairy", price: 62, margin: 6 },
  { name: "Mother Dairy Curd 400g", category: "Dairy", price: 45, margin: 9 },
  { name: "Amul Cheese Slices 200g", category: "Dairy", price: 130, margin: 12 },
  { name: "Amul Kool Milkshake 200ml", category: "Dairy", price: 30, margin: 15 },
  { name: "Nestle Slim Milk 1L", category: "Dairy", price: 68, margin: 7 },
  { name: "Go Cheese Spread 200g", category: "Dairy", price: 115, margin: 13 },

  // Staples
  { name: "Aashirvaad Atta 5kg", category: "Staples", price: 255, margin: 10 },
  { name: "Fortune Sunflower Oil 1L", category: "Staples", price: 160, margin: 9 },
  { name: "India Gate Basmati 1kg", category: "Staples", price: 130, margin: 11 },
  { name: "Tata Salt 1kg", category: "Staples", price: 24, margin: 8 },
  { name: "MDH Garam Masala 100g", category: "Staples", price: 80, margin: 30 },
  { name: "Catch Turmeric Powder 100g", category: "Staples", price: 42, margin: 28 },
  { name: "Saffola Gold Oil 1L", category: "Staples", price: 178, margin: 10 },
  { name: "Toor Dal 1kg", category: "Staples", price: 145, margin: 7 },

  // Health & Wellness
  { name: "Dabur Chyawanprash 500g", category: "Health & Wellness", price: 280, margin: 22 },
  { name: "Himalaya Liv.52 100 Tabs", category: "Health & Wellness", price: 155, margin: 25 },
  { name: "Revital H 30 Caps", category: "Health & Wellness", price: 320, margin: 28 },
  { name: "Glucon-D Orange 500g", category: "Health & Wellness", price: 145, margin: 20 },
  { name: "Horlicks Classic 500g", category: "Health & Wellness", price: 270, margin: 18 },
  { name: "Ensure Powder 400g", category: "Health & Wellness", price: 650, margin: 22 },
  { name: "Hajmola Candy 120 Tabs", category: "Health & Wellness", price: 60, margin: 26 },
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
