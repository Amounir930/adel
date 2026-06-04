'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface ProjectImageSliderProps {
  images: string[];
  projectName: string;
}

export default function ProjectImageSlider({ images, projectName }: ProjectImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-slate-400 text-sm">No screenshots available</p>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-white/10 group">
      {/* Slider Images */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`${projectName} - slide ${currentIndex + 1}`}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-top"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-cyan-500/80 hover:text-white transition-all text-white border border-white/10 shadow-lg z-10"
            aria-label="Previous image"
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-cyan-500/80 hover:text-white transition-all text-white border border-white/10 shadow-lg z-10"
            aria-label="Next image"
          >
            <HiChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/50 px-3 py-1.5 rounded-full border border-white/5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === idx ? 'bg-cyan-400 w-4' : 'bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
