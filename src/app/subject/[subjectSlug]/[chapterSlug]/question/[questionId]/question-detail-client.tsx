"use client";

import { useState, useRef } from "react";
import type { LongQuestion } from "@/lib/data";
import { useTheme } from "@/components/theme-provider";

type QuestionDetailClientProps = {
  question: LongQuestion;
  subjectSlug: string;
  chapterSlug: string;
};

export function QuestionDetailClient({
  question,
  subjectSlug,
  chapterSlug,
}: QuestionDetailClientProps) {
  const { theme } = useTheme();
  
  // Initialize with both legacy and new multi-image support
  const initialImages = question.imageUrls || (question.imageUrl ? [question.imageUrl] : []);
  const [imageUrls, setImageUrls] = useState<string[]>(initialImages);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [screenshotMode, setScreenshotMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Handle touch/swipe for mobile slider
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentImageIndex < imageUrls.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadMessage({ type: "error", text: "Please select an image file (JPG, PNG, etc.)" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadMessage({ type: "error", text: "File size must be less than 5MB" });
      return;
    }

    setIsUploading(true);
    setUploadMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("subjectSlug", subjectSlug);
      formData.append("chapterSlug", chapterSlug);
      formData.append("questionId", question.id);

      const response = await fetch("/api/upload-question-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setImageUrls(prev => [...prev, data.imageUrl]);
        setCurrentImageIndex(imageUrls.length); // Show newly uploaded image
        setUploadMessage({ type: "success", text: "Image uploaded successfully!" });
      } else {
        setUploadMessage({ type: "error", text: data.error || "Failed to upload image" });
      }
    } catch (err) {
      setUploadMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const downloadImage = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `question-${question.id}-image-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback: open in new tab
      window.open(url, "_blank");
    }
  };

  const downloadAllImages = async () => {
    for (let i = 0; i < imageUrls.length; i++) {
      await downloadImage(imageUrls[i], i);
      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const deleteImage = async (index: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch("/api/delete-question-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectSlug,
          chapterSlug,
          questionId: question.id,
          imageIndex: index,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setImageUrls(prev => prev.filter((_, i) => i !== index));
        // Adjust current index if needed
        if (currentImageIndex >= index && currentImageIndex > 0) {
          setCurrentImageIndex(prev => prev - 1);
        }
        setUploadMessage({ type: "success", text: "Image deleted successfully" });
        setTimeout(() => setUploadMessage(null), 3000);
      } else {
        setUploadMessage({ type: "error", text: data.error || "Failed to delete image" });
      }
    } catch (err) {
      setUploadMessage({ type: "error", text: "Network error. Please try again." });
    }
  };

  // Screenshot Mode - Clean view with just question and images (respects dark mode)
  if (screenshotMode) {
    const isDark = theme === "dark";
    
    return (
      <div className={`fixed inset-0 z-50 overflow-y-auto transition-colors duration-300 ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}>
        {/* Exit Button */}
        <button
          onClick={() => setScreenshotMode(false)}
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg min-h-[48px] min-w-[100px] transition-colors duration-300 ${
            isDark 
              ? "bg-[#1a1a1a] text-[#f0f0f0] hover:bg-[#2a2a2a]" 
              : "bg-[#2c2c2c] text-white hover:bg-[#3d3d3d]"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="text-sm font-medium">Exit</span>
        </button>

        {/* Clean Content */}
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Question Title */}
          <h1 className={`text-xl md:text-2xl font-serif mb-8 leading-relaxed transition-colors duration-300 ${isDark ? "text-[#f0f0f0]" : "text-[#2c2c2c]"}`}>
            {question.question}
          </h1>

          {/* Images - Full Width on Mobile */}
          <div className="space-y-6">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Solution ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-sm"
                  style={{ maxWidth: "100%" }}
                />
                {imageUrls.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {index + 1} / {imageUrls.length}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Page indicator for multiple images */}
          {imageUrls.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {imageUrls.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentImageIndex 
                      ? (isDark ? "bg-[#9ab87a]" : "bg-[#8B9A6B]") 
                      : (isDark ? "bg-[#2a2a2a]" : "bg-[#e8e0d5]")
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Normal Mode
  return (
    <div className="space-y-6">
      {/* Action Bar - Mobile Optimized */}
      <div className="flex flex-wrap gap-3">
        {/* Screenshot Mode Button */}
        {imageUrls.length > 0 && (
          <button
            onClick={() => setScreenshotMode(true)}
            className="flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] bg-[#2c2c2c] text-white rounded-lg hover:bg-[#3d3d3d] transition-colors text-sm font-medium flex-1 sm:flex-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Screenshot Mode
          </button>
        )}

        {/* Download Button */}
        {imageUrls.length > 0 && (
          <button
            onClick={imageUrls.length === 1 ? () => downloadImage(imageUrls[0], 0) : downloadAllImages}
            className="flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] bg-[#8B9A6B] text-white rounded-lg hover:bg-[#7a8a5a] transition-colors text-sm font-medium flex-1 sm:flex-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {imageUrls.length === 1 ? "Download Solution" : `Download All (${imageUrls.length})`}
          </button>
        )}
      </div>

      {/* Image Display Area with Slider */}
      <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl overflow-hidden">
        {imageUrls.length > 0 ? (
          <div className="relative">
            {/* Solution Images Slider */}
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-lg font-serif text-[#2c2c2c]">
                  Attempted Solutions
                  {imageUrls.length > 1 && (
                    <span className="text-sm font-normal text-[#6b6b6b] ml-2">
                      ({currentImageIndex + 1} of {imageUrls.length})
                    </span>
                  )}
                </h2>
              </div>

              {/* Image Slider with Touch Support */}
              <div 
                ref={sliderRef}
                className="relative rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#e8e0d5] touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div 
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                  {imageUrls.map((url, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`Solution ${index + 1}`}
                        className="w-full h-auto max-h-[500px] sm:max-h-[600px] object-contain"
                      />
                      {/* Delete Button Overlay */}
                      <button
                        onClick={() => deleteImage(index)}
                        className="absolute top-2 right-2 flex items-center gap-1 px-3 py-2 bg-red-500/90 hover:bg-red-600 text-white rounded-lg text-xs font-medium shadow-md transition-colors z-10"
                        title="Delete this image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>

                {/* Swipe Hint on Mobile */}
                {imageUrls.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full sm:hidden">
                    ← Swipe →
                  </div>
                )}
              </div>

              {/* Slider Navigation */}
              {imageUrls.length > 1 && (
                <>
                  {/* Prev/Next Buttons - Hidden on small mobile, shown on larger screens */}
                  <button
                    onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentImageIndex === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 min-w-[40px] min-h-[40px] bg-white/90 rounded-full shadow-md flex items-center justify-center text-[#2c2c2c] disabled:opacity-30 hidden sm:flex"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => Math.min(imageUrls.length - 1, prev + 1))}
                    disabled={currentImageIndex === imageUrls.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 min-w-[40px] min-h-[40px] bg-white/90 rounded-full shadow-md flex items-center justify-center text-[#2c2c2c] disabled:opacity-30 hidden sm:flex"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Dots Navigation - Mobile Optimized */}
                  <div className="flex justify-center gap-2 mt-4">
                    {imageUrls.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`min-w-[32px] min-h-[32px] p-2 rounded-full transition-colors ${
                          index === currentImageIndex 
                            ? "bg-[#8B9A6B]" 
                            : "bg-[#e8e0d5] hover:bg-[#d0c8bd]"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      >
                        <div className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-[#6b6b6b]"}`} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Add More Images Button */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <button
                onClick={triggerFileInput}
                disabled={isUploading}
                className="flex items-center gap-2 px-4 py-3 min-h-[48px] bg-[#8B9A6B]/10 text-[#8B9A6B] rounded-lg hover:bg-[#8B9A6B]/20 transition-colors text-sm font-medium w-full sm:w-auto justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {isUploading ? "Uploading..." : "Add Another Image"}
              </button>
            </div>
          </div>
        ) : (
          /* Upload Placeholder */
          <div className="p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#8B9A6B]/10 mb-4">
              <svg className="w-10 h-10 text-[#8B9A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif text-[#2c2c2c] mb-2">No Solution Images Yet</h3>
            <p className="text-[#6b6b6b] max-w-md mx-auto mb-6 px-4">
              Upload photos of your attempted solutions or handwritten notes for this question.
            </p>
            <button
              onClick={triggerFileInput}
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-6 py-4 min-h-[56px] bg-[#8B9A6B] text-white rounded-lg hover:bg-[#7a8a5a] transition-colors font-medium text-base"
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload Image
                </>
              )}
            </button>
            <p className="text-xs text-[#6b6b6b] mt-4">
              Supported: JPG, PNG, WebP • Max: 5MB each
            </p>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload Message */}
        {uploadMessage && (
          <div
            className={`mx-4 sm:mx-6 mb-4 sm:mb-6 p-4 rounded-lg text-center ${
              uploadMessage.type === "success"
                ? "bg-[#8B9A6B]/10 border border-[#8B9A6B]/30 text-[#8B9A6B]"
                : "bg-red-50 border border-red-200 text-red-600"
            }`}
          >
            {uploadMessage.text}
          </div>
        )}
      </div>

      {/* Study Tips */}
      <div className="bg-[#B8A5A0]/10 border border-[#B8A5A0]/20 rounded-xl p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#B8A5A0]/20 flex items-center justify-center flex-shrink-0 min-w-[40px] min-h-[40px]">
            <svg className="w-5 h-5 text-[#B8A5A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-[#2c2c2c] mb-1">Writing Tips</h3>
            <p className="text-sm text-[#6b6b6b]">
              For {question.marks}-mark questions, aim for {question.marks * 15}-{question.marks * 20} words.
              Include diagrams if applicable, and start with a clear definition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
