import { useState } from "react";
import { Upload, Camera, MapPin, Image, CheckCircle2, X, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCases } from "@/contexts/CaseContext";
import { useNavigate } from "react-router-dom";

export default function ShopOwnerUpload() {
  const { userName } = useAuth();
  const { addCase } = useCases();
  const navigate = useNavigate();
  const [shopName, setShopName] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const addMockImage = (type: string) => {
    if (images.length < 5) {
      setImages((prev) => [...prev, `${type}_${Date.now()}.jpg`]);
    }
  };

  const removeImage = (idx: number) => setImages((prev) => prev.filter((_, i) => i !== idx));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    setImages((prev) => [...prev, ...files.map((f) => f.name)].slice(0, 5));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    addCase({
      shopName: shopName || "My Shop",
      ownerName: userName,
      images,
      location: "Andheri West, Mumbai",
    });
    navigate("/owner/status");
  };

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-heading font-bold">Submit Your Shop</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload shop images for credit assessment</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Shop Name</label>
        <Input value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="Enter your shop name" />
      </div>

      <div
        className="glass-card rounded-2xl p-6 border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors text-center cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Upload className="h-8 w-8 mx-auto text-primary/40 mb-2" />
        <p className="text-sm font-medium">Drag & drop shop images</p>
        <p className="text-xs text-muted-foreground mt-1">or use buttons below</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => addMockImage("shelf")} disabled={images.length >= 5}>
          <Image className="h-3.5 w-3.5 mr-1.5" /> Shelf
        </Button>
        <Button variant="outline" size="sm" onClick={() => addMockImage("counter")} disabled={images.length >= 5}>
          <Camera className="h-3.5 w-3.5 mr-1.5" /> Counter
        </Button>
        <Button variant="outline" size="sm" onClick={() => addMockImage("exterior")} disabled={images.length >= 5}>
          <MapPin className="h-3.5 w-3.5 mr-1.5" /> Exterior
        </Button>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl bg-muted flex items-center justify-center group">
              <Image className="h-5 w-5 text-muted-foreground/50" />
              <span className="absolute bottom-1 left-1 right-1 text-[9px] text-muted-foreground truncate text-center">{img}</span>
              <button
                onClick={() => removeImage(i)}
                className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3 text-destructive-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={cn("flex items-center gap-2 text-xs", images.length >= 3 ? "text-risk-low" : "text-muted-foreground")}>
        {images.length >= 3 ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="h-3.5 w-3.5 rounded-full border border-current" />}
        Minimum 3 images required ({images.length}/5)
      </div>

      <div className="glass-card rounded-2xl p-4">
        <h3 className="text-sm font-heading font-semibold mb-2">GPS Location</h3>
        <div className="h-24 rounded-xl bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-5 w-5 mx-auto text-muted-foreground/50 mb-1" />
            <p className="text-xs text-muted-foreground">Auto-detected: 19.0760° N, 72.8777° E</p>
            <p className="text-[10px] text-muted-foreground">Andheri West, Mumbai</p>
          </div>
        </div>
      </div>

      <Button
        className="w-full h-11 rounded-xl"
        disabled={images.length < 3 || !shopName.trim() || submitting}
        onClick={handleSubmit}
      >
        {submitting ? (
          <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Submitting…</>
        ) : (
          <>Submit for Analysis <ArrowRight className="h-4 w-4 ml-2" /></>
        )}
      </Button>
    </div>
  );
}
