"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useEffect, useState } from "react";

const chapters = [
  {
    slug: "biology-chapter-01",
    number: 1,
    name: "Introduction to Biology",
    description: "Scope, branches, and importance of biology"
  },
  {
    slug: "biology-chapter-02",
    number: 2,
    name: "Biological Molecules",
    description: "Carbohydrates, proteins, lipids, and nucleic acids"
  },
  {
    slug: "biology-chapter-03",
    number: 3,
    name: "Enzymes",
    description: "Nature, properties, and mechanisms of enzyme action"
  },
  {
    slug: "biology-chapter-04",
    number: 4,
    name: "The Cell",
    description: "Cell structure, organelles, and functions"
  },
  {
    slug: "biology-chapter-05",
    number: 5,
    name: "Variety of Life",
    description: "Kingdoms and classification systems"
  }
];

export default function BiologyPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("long-questions");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SiteShell>
      {/* Header */}
      <section className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-4">
          <Link href="/" className="hover:text-[#8B9A6B] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/class/11" className="hover:text-[#8B9A6B] transition-colors">Class 11</Link>
          <span>/</span>
          <span>Biology</span>
        </div>
        <h1 
          className={`text-3xl md:text-4xl font-serif text-[#2c2c2c] mb-3 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Biology
        </h1>
        <p 
          className={`text-lg text-[#6b6b6b] max-w-2xl transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Study of living organisms, from molecular biology to ecology.
        </p>
      </section>

      {/* Tabs Navigation */}
      <section className="mb-8">
        <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-2 overflow-x-auto">
          <nav className="flex gap-1 min-w-max">
            <button
              onClick={() => setActiveTab("long-questions")}
              className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "long-questions"
                  ? "bg-[#8B9A6B] text-white"
                  : "text-[#6b6b6b] hover:text-[#2c2c2c] hover:bg-[#e8e0d5]/30"
              }`}
            >
              Long Questions
            </button>
            <button
              onClick={() => setActiveTab("short-questions")}
              className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "short-questions"
                  ? "bg-[#8B9A6B] text-white"
                  : "text-[#6b6b6b] hover:text-[#2c2c2c] hover:bg-[#e8e0d5]/30"
              }`}
            >
              Short Questions
            </button>
            <button
              onClick={() => setActiveTab("mcqs")}
              className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "mcqs"
                  ? "bg-[#8B9A6B] text-white"
                  : "text-[#6b6b6b] hover:text-[#2c2c2c] hover:bg-[#e8e0d5]/30"
              }`}
            >
              MCQs
            </button>
            <button
              onClick={() => setActiveTab("mnemonics")}
              className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === "mnemonics"
                  ? "bg-[#8B9A6B] text-white"
                  : "text-[#6b6b6b] hover:text-[#2c2c2c] hover:bg-[#e8e0d5]/30"
              }`}
            >
              Mnemonics
            </button>
          </nav>
        </div>
      </section>

      {/* Tab Content */}
      <section className="min-h-[400px]">
        {activeTab === "long-questions" && (
          <div className={`transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6 mb-6">
              <h2 className="text-xl font-serif text-[#2c2c2c] mb-4">Long Questions by Chapter</h2>
              <p className="text-[#6b6b6b] mb-6">
                Detailed questions with comprehensive answers. Click on a chapter to view all long questions.
              </p>
            </div>
            
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.slug}
                  className={`bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6 transition-all duration-300 hover:border-[#8B9A6B] ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: mounted ? `${index * 100}ms` : '0ms' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="h-8 w-8 rounded-lg bg-[#8B9A6B]/10 flex items-center justify-center text-sm font-medium text-[#8B9A6B]">
                          {chapter.number}
                        </span>
                        <h3 className="text-lg font-serif text-[#2c2c2c]">{chapter.name}</h3>
                      </div>
                      <p className="text-sm text-[#6b6b6b]">{chapter.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#8B9A6B]/10 text-[#8B9A6B] rounded-full text-xs font-medium">
                      5-8 Questions
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#e8e0d5]">
                    <span className="text-xs text-[#6b6b6b]">Last updated: Dec 2024</span>
                    <Link 
                      href={`/class/11/biology/${chapter.slug}/long-questions`}
                      className="flex items-center text-sm text-[#8B9A6B] hover:underline"
                    >
                      View Questions
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "short-questions" && (
          <div className={`transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6 mb-6">
              <h2 className="text-xl font-serif text-[#2c2c2c] mb-4">Short Questions by Chapter</h2>
              <p className="text-[#6b6b6b] mb-6">
                Quick revision questions organized by topic. Perfect for last-minute cramming.
              </p>
            </div>
            
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.slug}
                  className={`bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6 transition-all duration-300 hover:border-[#8B9A6B] ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: mounted ? `${index * 100}ms` : '0ms' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="h-8 w-8 rounded-lg bg-[#B8A5A0]/10 flex items-center justify-center text-sm font-medium text-[#B8A5A0]">
                          {chapter.number}
                        </span>
                        <h3 className="text-lg font-serif text-[#2c2c2c]">{chapter.name}</h3>
                      </div>
                      <p className="text-sm text-[#6b6b6b]">{chapter.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#B8A5A0]/10 text-[#B8A5A0] rounded-full text-xs font-medium">
                      15-20 Questions
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#e8e0d5]">
                    <span className="text-xs text-[#6b6b6b]">With mnemonics included</span>
                    <Link 
                      href={`/class/11/biology/${chapter.slug}/short-questions`}
                      className="flex items-center text-sm text-[#B8A5A0] hover:underline"
                    >
                      View Questions
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "mcqs" && (
          <div className={`transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6 mb-6">
              <h2 className="text-xl font-serif text-[#2c2c2c] mb-4">Multiple Choice Questions</h2>
              <p className="text-[#6b6b6b] mb-6">
                Practice MCQs with instant feedback. Test your knowledge before the exam.
              </p>
            </div>
            
            <div className="bg-[#8B9A6B]/10 border border-[#8B9A6B]/20 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#8B9A6B] flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2l2-2m-6 6l-2-2m2 2l2 2m-2 2l2-2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-serif text-[#2c2c2c]">Start MCQ Practice</h3>
                  <p className="text-sm text-[#6b6b6b]">200+ questions covering all chapters</p>
                </div>
                <button className="ml-auto px-6 py-3 bg-[#8B9A6B] text-white rounded-lg hover:bg-[#7a8a5a] transition-colors text-sm font-medium">
                  Start Quiz
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.slug}
                  className={`bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-4 transition-all duration-300 hover:border-[#8B9A6B] ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: mounted ? `${index * 100}ms` : '0ms' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-lg bg-[#9CAF88]/10 flex items-center justify-center text-sm font-medium text-[#9CAF88]">
                      {chapter.number}
                    </span>
                    <div>
                      <h3 className="font-medium text-[#2c2c2c]">{chapter.name}</h3>
                      <span className="text-xs text-[#6b6b6b]">20 MCQs</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "mnemonics" && (
          <div className={`transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6 mb-6">
              <h2 className="text-xl font-serif text-[#2c2c2c] mb-4">Mnemonics & Memory Aids</h2>
              <p className="text-[#6b6b6b] mb-6">
                Memory tricks and mnemonics to help you remember complex concepts and sequences.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
                <h3 className="text-lg font-serif text-[#2c2c2c] mb-3">Taxonomy Order</h3>
                <div className="bg-[#FAF7F2] rounded-lg p-4 mb-3">
                  <p className="text-lg font-medium text-[#8B9A6B] mb-2">"Dear King Philip Came Over For Good Soup"</p>
                  <p className="text-sm text-[#6b6b6b]">
                    <strong>D</strong>omain - <strong>K</strong>ingdom - <strong>P</strong>hylum - <strong>C</strong>lass - <strong>O</strong>rder - <strong>F</strong>amily - <strong>G</strong>enus - <strong>S</strong>pecies
                  </p>
                </div>
                <p className="text-sm text-[#6b6b6b]">Helps remember the hierarchy of biological classification.</p>
              </div>

              <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
                <h3 className="text-lg font-serif text-[#2c2c2c] mb-3">Cell Organelles</h3>
                <div className="bg-[#FAF7F2] rounded-lg p-4 mb-3">
                  <p className="text-lg font-medium text-[#8B9A6B] mb-2">"Mighty Mike Always Eats Protein Ribbons Near Endoplasmic Places"</p>
                  <p className="text-sm text-[#6b6b6b]">
                    <strong>M</strong>itochondria - <strong>M</strong>icrotubules - <strong>A</strong>pparatus (Golgi) - <strong>E</strong>ndoplasmic Reticulum - <strong>P</strong>lasmids - <strong>R</strong>ibosomes - <strong>N</strong>ucleus - <strong>E</strong>R - <strong>P</strong>lasma Membrane
                  </p>
                </div>
                <p className="text-sm text-[#6b6b6b]">Remember major cell organelles and their functions.</p>
              </div>

              <div className="bg-[#FFFBF7] border border-[#e8e0d5] rounded-xl p-6">
                <h3 className="text-lg font-serif text-[#2c2c2c] mb-3">Essential Amino Acids</h3>
                <div className="bg-[#FAF7F2] rounded-lg p-4 mb-3">
                  <p className="text-lg font-medium text-[#8B9A6B] mb-2">"Private Tim Hall"</p>
                  <p className="text-sm text-[#6b6b6b]">
                    <strong>P</strong>henylalanine - <strong>T</strong>ryptophan - <strong>H</strong>istidine - Arginine - Lysine - Isoleucine - Leucine - Methionine - Valine - Threonine
                  </p>
                </div>
                <p className="text-sm text-[#6b6b6b]">Remember the 10 essential amino acids.</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </SiteShell>
  );
}
