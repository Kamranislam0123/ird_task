'use client'

import { useEffect, useState } from 'react'
import { Search, Copy, Bookmark, Info } from 'lucide-react'

export function MainContent({ selectedsub_categoryId }) {
  const [dua, setDua] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedsub_categoryId) {
      fetch(`http://localhost:5000/dua/${selectedsub_categoryId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch dua');
          }
          return response.json();
        })
        .then((data) => setDua(data))
        .catch((error) => console.error('Error fetching dua:', error));
    } else {
      setDua([]);
    }
  }, [selectedsub_categoryId]);

  const filtereddua = dua.filter((dua) =>
    dua.dua_name_en && dua.dua_name_en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 p-6 space-y-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Section: Dua Details</h1>
      </div>

      {filtereddua.length > 0 ? (
        filtereddua.map((dua, index) => (
          <div key={dua.dua_id} className="bg-white p-6 rounded-lg shadow space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-green-600">{dua.dua_name_en}</h2>
                <p className="mt-2">{dua.top_en}</p>
                <p className="mt-2">{dua.dua_arabic}</p>
                {dua.transliteration_en && <p className="mt-2 text-gray-600">{dua.transliteration_en}</p>}
                {dua.translation_en && <p className="mt-2">{dua.translation_en}</p>}
                {dua.bottom_en && <p className="mt-2">{dua.bottom_en}</p>}
                {dua.refference_en && (
                  <>
                    <p className="mt-2 text-green-600">Reference:</p>
                    <p>{dua.refference_en}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No Dua found for this subcategory.</p>
      )}
    </main>
  );
}
