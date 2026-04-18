import { useState, useRef, useCallback } from "react";
import { Upload, MapPin, Image, CheckCircle2, X, ArrowRight, Loader2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCases } from "@/contexts/CaseContext";
import { useNavigate } from "react-router-dom";

interface UploadedImage {
  name: string;
  dataUrl: string;
}

interface UploadedVideo {
  name: string;
  dataUrl: string;
  size: string;
}

export default function ShopOwnerUpload() {
  const { userName } = useAuth();
  const { addCase } = useCases();
  const navigate = useNavigate();
  const [shopName, setShopName] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [video, setVideo] = useState<UploadedVideo | null>(null);
  const [isDraggingImages, setIsDraggingImages] = useState(false);
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const processImageFiles = useCallback(
    (files: FileList | File[]) => {
      const remaining = 5 - images.length;
      const toProcess = Array.from(files)
        .filter((f) => f.type.startsWith("image/"))
        .slice(0, remaining);

      toProcess.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages((prev) =>
            prev.length < 5
              ? [...prev, { name: file.name, dataUrl: e.target?.result as string }]
              : prev
          );
        };
        reader.readAsDataURL(file);
      });
    },
    [images.length]
  );

  const processVideoFile = useCallback((files: FileList | File[]) => {
    const file = Array.from(files).find((f) => f.type.startsWith("video/"));
    if (!file) return;
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    if (file.size > 100 * 1024 * 1024) {
      alert("Video must be under 100MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setVideo({ name: file.name, dataUrl: e.target?.result as string, size: `${sizeMB} MB` });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingImages(false);
    processImageFiles(e.dataTransfer.files);
  };

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingVideo(false);
    processVideoFile(e.dataTransfer.files);
  };

  const removeImage = (idx: number) =>
    setImages((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    addCase({
      shopName: shopName || "My Shop",
      ownerName: userName,
      images: images.map((i) => i.name),
      video: video?.name,
      location: "Andheri West, Mumbai",
    });
    navigate("/owner/status");
  };

  const canSubmit = images.length >= 3 && shopName.trim() && !submitting;

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

      {/* Hidden inputs */}
      <input ref={imageInputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => e.target.files && processImageFiles(e.target.files)} />
      <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files && processVideoFile(e.target.files)} />

      {/* Image drop zone */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Shop Photos</label>
          <span className="text-xs text-muted-foreground">{images.length}/5</span>
        </div>
        <div
          className={cn(
            "glass-card rounded-2xl p-6 border-2 border-dashed transition-colors text-center cursor-pointer",
            isDraggingImages ? "border-primary bg-primary/5" : "border-primary/20 hover:border-primary/40",
            images.length >= 5 && "opacity-50 pointer-events-none"
          )}
          onDragOver={(e) => { e.preventDefault(); setIsDraggingImages(true); }}
          onDragLeave={() => setIsDraggingImages(false)}
          onDrop={handleImageDrop}
          onClick={() => imageInputRef.current?.click()}
        >
          <Upload className={cn("h-8 w-8 mx-auto mb-2", isDraggingImages ? "text-primary" : "text-primary/40")} />
          <p className="text-sm font-medium">
            {isDraggingImages ? "Drop images here!" : "Drag & drop shop images"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">or click to browse · JPG, PNG, WEBP</p>
        </div>
      </div>

      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-muted group">
              <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={cn("flex items-center gap-2 text-xs", images.length >= 3 ? "text-risk-low" : "text-muted-foreground")}>
        {images.length >= 3 ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="h-3.5 w-3.5 rounded-full border border-current" />}
        Minimum 3 images required ({images.length}/5)
      </div>

      {/* Video upload — shown once 3 images uploaded */}
      {images.length >= 3 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium">Shop Video</label>
            <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Optional</span>
          </div>

          {!video ? (
            <div
              className={cn(
                "glass-card rounded-2xl p-5 border-2 border-dashed transition-colors text-center cursor-pointer",
                isDraggingVideo ? "border-primary bg-primary/5" : "border-primary/20 hover:border-primary/40"
              )}
              onDragOver={(e) => { e.preventDefault(); setIsDraggingVideo(true); }}
              onDragLeave={() => setIsDraggingVideo(false)}
              onDrop={handleVideoDrop}
              onClick={() => videoInputRef.current?.click()}
            >
              <Video className={cn("h-7 w-7 mx-auto mb-2", isDraggingVideo ? "text-primary" : "text-primary/40")} />
              <p className="text-sm font-medium">
                {isDraggingVideo ? "Drop video here!" : "Drag & drop a shop walkthrough"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">or click to browse · MP4, MOV · Max 100MB</p>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{video.name}</p>
                <p className="text-xs text-muted-foreground">{video.size}</p>
              </div>
              <button
                onClick={() => setVideo(null)}
                className="h-7 w-7 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/10 transition-colors"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* GPS */}
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

      <Button className="w-full h-11 rounded-xl" disabled={!canSubmit} onClick={handleSubmit}>
        {submitting ? (
          <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Submitting…</>
        ) : (
          <>Submit for Analysis <ArrowRight className="h-4 w-4 ml-2" /></>
        )}
      </Button>
    </div>
  );
}