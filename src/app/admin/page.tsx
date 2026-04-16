"use client";

import { useState } from "react";
import { subjectCatalog } from "@/lib/data";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("subjects");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const filteredSubjects = subjectCatalog.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteSubject = (slug: string) => {
    if (confirm(`Are you sure you want to delete this subject?`)) {
      console.log(`Delete subject: ${slug}`);
      // TODO: Implement actual delete functionality
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2l2-2m-6 6l-2-2m2 2l2 2m-2 2l2-2" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-500">Manage subjects and content</p>
            </div>
          </div>
          
          {/* User menu */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-4 4 0 011-4 4 0zM4 7a4 4 0 014 4 4 0 014-4 4 0zM12 14a7 7 0 00-7 7h14a7 7 0 007-7z" />
              </svg>
            </button>
            <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.986-1.986-1.986 0-1.986 1.986v9.953c0-1.986 1.986-1.986 1.986h4.953c1.986 0 1.986 1.986 1.986v-4.953c0-1.986-1.986-1.986-1.986zm0 3.972a1.986 1.986 0 0 1.986v1.986h1.986a1.986 1.986 0 0 1.986v-1.986h1.986a1.986 1.986 0 0 1.986v-1.986h-1.986a1.986 1.986 0 0-1.986-1.986zm0 3.972a1.986 1.986 0 0 1.986v1.986h1.986a1.986 1.986 0 0 1.986v-1.986h1.986a1.986 1.986 0 0-1.986-1.986z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg border border-slate-200 p-1 mb-6">
          <nav className="flex space-x-1">
            <button
              onClick={() => setActiveTab("subjects")}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === "subjects"
                  ? "bg-teal-600 text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Subjects
            </button>
            <button
              onClick={() => setActiveTab("chapters")}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === "chapters"
                  ? "bg-teal-600 text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Chapters
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === "content"
                  ? "bg-teal-600 text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === "settings"
                  ? "bg-teal-600 text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Content Area */}
        {activeTab === "subjects" && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Subject Management</h2>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                + Add New Subject
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Subjects Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Chapters</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Classes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredSubjects.map((subject) => (
                    <tr key={subject.slug} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center mr-3">
                            <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{subject.name}</div>
                            <div className="text-sm text-slate-500">{subject.classLevels.join(", ")}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{subject.chapters.length}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{subject.classLevels.join(", ")}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <button className="text-teal-600 hover:text-teal-700 font-medium">Edit</button>
                          <button 
                            onClick={() => handleDeleteSubject(subject.slug)}
                            className="text-red-600 hover:text-red-700 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "chapters" && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Chapter Management</h2>
            <div className="text-center py-12 text-slate-500">
              <svg className="h-12 w-12 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H9a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2v-10a2 2 0 00-2-2z" />
              </svg>
              <p className="mt-4">Chapter management coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Content Management</h2>
            <div className="text-center py-12 text-slate-500">
              <svg className="h-12 w-12 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2v-4a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2h-3a1 1 0 00-1 1v-2a1 1 0 001-1h2a1 1 0 001 1v2a1 1 0 011-1h3a1 1 0 011-1H7a1 1 0 01-1-1v-2a1 1 0 011-1z" />
              </svg>
              <p className="mt-4">Content management coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Settings</h2>
            <div className="text-center py-12 text-slate-500">
              <svg className="h-12 w-12 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.986-1.986-1.986 0-1.986 1.986v9.953c0-1.986 1.986-1.986 1.986h4.953c1.986 0 1.986 1.986 1.986v-4.953c0-1.986-1.986-1.986-1.986zm0 3.972a1.986 1.986 0 0 1.986v1.986h1.986a1.986 1.986 0 0 1.986v-1.986h1.986a1.986 1.986 0 0 1.986v-1.986h1.986a1.986 1.986 0 0-1.986-1.986zm0 3.972a1.986 1.986 0 0 1.986v1.986h1.986a1.986 1.986 0 0 1.986v-1.986h1.986a1.986 1.986 0 0-1.986-1.986z" />
              </svg>
              <p className="mt-4">Settings coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}