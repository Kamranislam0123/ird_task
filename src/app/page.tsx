'use client'

import { Category } from '@/components/categories';
import { MainContent } from '@/components/main-content';
import { SettingsPanel } from '@/components/settings-panel';
import { Sidebar } from '@/components/sidebar';
import { useState } from 'react';

export default function DuaPage() {
  // State to hold the selected category ID
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  

  // Callback function that updates the selected category ID
  const handleCategorySelect = (categoryId:any) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Category Section */}
      <Category onCategorySelect={handleCategorySelect} />

      {/* Main Content Section */}
      <MainContent selectedsub_categoryId={selectedCategoryId} />

      {/* Settings Panel */}
      <SettingsPanel />
    </div>
  );
}
