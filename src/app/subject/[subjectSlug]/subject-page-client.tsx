"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useEffect, useState } from "react";

interface Chapter {
  slug: string;
  name: string;
}

interface SubjectPageClientProps {
  subject: {
    slug: string;
    name: string;
    classLevels: string[];
    chapters: Chapter[];
  };
}

export function SubjectPageClient({ subject }: SubjectPageClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Create click sound
    const audioContext = typeof window !== 'undefined' && window.AudioContext 
      ? new (window.AudioContext || (window as any).webkitAudioContext)() 
      : null;

    const playClickSound = () => {
      if (!audioContext) return;
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    };

    // Add click sound to all chapter links
    const chapterLinks = document.querySelectorAll('.chapter-link');
    chapterLinks.forEach(link => {
      link.addEventListener('click', playClickSound);
    });

    return () => {
      chapterLinks.forEach(link => {
        link.removeEventListener('click', playClickSound);
      });
    };
  }, [subject]);

  return (
    <SiteShell>
      {/* Header */}
      <section className={`mb-8 transition-all duration-700 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-4">
          <Link href="/" className="hover:text-[#8B9A6B] transition-colors">Home</Link>
          <span>/</span>
          <span>{subject.name}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-[#2c2c2c] mb-3">
          {subject.name}
        </h1>
        <p className="text-lg text-[#6b6b6b] max-w-2xl">
          Complete study notes and resources for {subject.classLevels.join(", ")}.
        </p>
      </section>

      {/* Chapters */}
      <section className="grid gap-4">
        {subject.chapters.map((chapter: Chapter, index) => (
          <Link
            key={chapter.slug}
            href={`/subject/${subject.slug}/${chapter.slug}`}
            className={`group flex items-center justify-between bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl px-6 py-5 transition-all duration-300 hover:border-[#8B9A6B] hover:shadow-md hover:-translate-y-1 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: mounted ? `${index * 100}ms` : '0ms' }}
          >
            <div className="flex items-center gap-4">
              <span className="h-10 w-10 rounded-lg bg-[#8B9A6B]/10 flex items-center justify-center text-sm font-medium text-[#8B9A6B]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-xs text-[#6b6b6b] uppercase tracking-wide mb-1">Chapter</p>
                <h3 className="font-medium text-[#2c2c2c] group-hover:text-[#8B9A6B] transition-colors">
                  {chapter.name}
                </h3>
              </div>
            </div>
            <svg className="h-5 w-5 text-[#6b6b6b] group-hover:text-[#8B9A6B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
