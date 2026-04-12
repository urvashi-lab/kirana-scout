import { useState } from "react";
import { Upload, Camera, MapPin, Image, CheckCircle2, Loader2, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Detecting SKUs…", duration: 1500 },
  { label: "Calculating inventory value…", duration: 1200 },
  { label: "Fetching geo signals…", duration: 1000 },
  { label: "Running fraud checks…", duration: 1800 },
  { label: "Generating recommendation…", duration: 800 },
];

export default function UploadPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState<{ name: string; type: string }[]>([]);
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    setImages((prev) => [...prev, ...files.map((f) => ({ name: f.name, type: f.type }))].slice(0, 5));
  };

  const addMockImage = (type: string) => {
    if (images.length < 5) {
      setImages((prev) => [...prev, { name: `${type}_${Date.now()}.jpg`, type: "image/jpeg" }]);
    }
  };

  const removeImage = (idx: number) => setImages((prev) => prev.filter((_, i) => i !== idx));

  const runAnalysis = async () => {
    setProcessing(true);
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, steps[i].duration));
    }
    setCurrentStep(steps.length);
    setTimeout(() => navigate("/results/demo"), 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">New Analysis</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload shop images and location to generate a credit assessment</p>
      </div>

      {!processing ? (
        <>
          {/* Upload Area */}
          <div
            className="glass-card rounded-2xl p-8 border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors text-center cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <Upload className="h-10 w-10 mx-auto text-primary/40 mb-3" />
            <p className="text-sm font-medium">Drag & drop shop images here</p>
            <p className="text-xs text-muted-foreground mt-1">or click the buttons below to add images</p>
          </div>

          {/* Quick add buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => addMockImage("shelf")} disabled={images.length >= 5}>
              <Image className="h-3.5 w-3.5 mr-1.5" /> Add Shelf Image
            </Button>
            <Button variant="outline" size="sm" onClick={() => addMockImage("counter")} disabled={images.length >= 5}>
              <Camera className="h-3.5 w-3.5 mr-1.5" /> Add Counter Image
            </Button>
            <Button variant="outline" size="sm" onClick={() => addMockImage("exterior")} disabled={images.length >= 5}>
              <MapPin className="h-3.5 w-3.5 mr-1.5" /> Add Exterior Image
            </Button>
          </div>

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl bg-muted flex items-center justify-center group">
                  <Image className="h-6 w-6 text-muted-foreground/50" />
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] text-muted-foreground truncate text-center">{img.name}</span>
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

          {/* Validation */}
          <div className={cn("flex items-center gap-2 text-xs", images.length >= 3 ? "text-risk-low" : "text-muted-foreground")}>
            {images.length >= 3 ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="h-3.5 w-3.5 rounded-full border border-current" />}
            Minimum 3 images required ({images.length}/5 uploaded)
          </div>

          {/* GPS */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-heading font-semibold mb-3">GPS Location</h3>
            <div className="h-32 rounded-xl bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-6 w-6 mx-auto text-muted-foreground/50 mb-1" />
                <p className="text-xs text-muted-foreground">Auto-detected: 19.0760° N, 72.8777° E</p>
                <p className="text-[10px] text-muted-foreground">Andheri West, Mumbai</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button className="w-full h-12 text-base rounded-xl" disabled={images.length < 3} onClick={runAnalysis}>
            Run Analysis <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </>
      ) : (
        /* Processing State */
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <Loader2 className="h-10 w-10 mx-auto text-primary animate-spin mb-3" />
            <h3 className="font-heading font-semibold">Analyzing Shop</h3>
            <p className="text-xs text-muted-foreground mt-1">AI is processing your images and location data</p>
          </div>

          <div className="space-y-3 max-w-sm mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                {currentStep > i ? (
                  <CheckCircle2 className="h-5 w-5 text-risk-low shrink-0" />
                ) : currentStep === i ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin shrink-0" />
                ) : (
                  <span className="h-5 w-5 rounded-full border border-border shrink-0" />
                )}
                <span className={cn("text-sm", currentStep >= i ? "text-foreground" : "text-muted-foreground")}>{step.label}</span>
              </div>
            ))}
          </div>

          {currentStep >= steps.length && (
            <div className="text-center animate-fade-in-up">
              <CheckCircle2 className="h-8 w-8 text-risk-low mx-auto mb-2" />
              <p className="text-sm font-semibold">Analysis Complete! Redirecting…</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
