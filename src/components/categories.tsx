"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export function Category({ onCategorySelect }: any) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [duas, setDuas] = useState([]); // Store duas for the selected subcategory
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null); // Track the selected subcategory
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/category")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      fetch(`http://localhost:5000/sub_category/${selectedCategoryId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch subcategories");
          }
          return response.json();
        })
        .then((data) => setSubCategories(data))
        .catch((error) =>
          console.error("Error fetching subcategories:", error)
        );
    } else {
      setSubCategories([]);
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (selectedSubCategoryId) {
      fetch(`http://localhost:5000/dua/${selectedSubCategoryId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch duas");
          }
          return response.json();
        })
        .then((data) => setDuas(data))
        .catch((error) => console.error("Error fetching duas:", error));
    } else {
      setDuas([]);
    }
  }, [selectedSubCategoryId]);

  const filteredCategories = categories.filter((category) =>
    category.cat_name_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (categoryId: any) => {
    if (categoryId === selectedCategoryId) {
      setSelectedCategoryId(null);
      setSubCategories([]);
      setOpenCategoryId(null);
    } else {
      setSelectedCategoryId(categoryId);
      onCategorySelect(categoryId); // Notify parent component of category selection
      setOpenCategoryId(categoryId);
    }
  };

  const handleSubCategoryClick = (subCategoryId: any) => {
    setSelectedSubCategoryId(subCategoryId); // Set selected subcategory
    onCategorySelect(subCategoryId); // Notify parent component of subcategory selection
  };

  return (
    <div className="w-80 bg-gray-50 p-4 overflow-y-auto rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Dua Page</h2>

      {/* Categories Section */}
      <div className="bg-green-500 text-white py-3 px-4 rounded-lg mb-4">
        <h3 className="font-semibold text-lg">Categories</h3>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search Categories"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
      </div>

      {/* Category Cards */}
      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <div key={category.cat_id}>
            <button
              className="w-full group"
              onClick={() => handleCategoryClick(category.cat_id)}
            >
              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-blue-500"
                    >
                      <path
                        d="M4.34 15.66A8 8 0 1 0 19.66 8.34M4.34 9.34l14.32-1M19.66 15.66A8 8 0 0 1 4.34 8.34"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-green-600 font-medium text-lg">
                      {category.cat_name_en}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.no_of_subcat || 0} Subcategories
                    </p>
                  </div>
                </div>
                <div className="text-gray-600">{category.no_of_dua} Duas</div>
              </div>
            </button>

            {/* Subcategories Dropdown */}
            {openCategoryId === category.cat_id && (
              <div className="mt-4 ml-8 space-y-3">
                {subCategories.map((subCategory) => (
                  <div
                    key={subCategory.subcat_id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                    onClick={() => handleSubCategoryClick(subCategory.subcat_id)} // Handle subcategory click
                  >
                    <div className="flex items-center space-x-3">
                      {/* Green round indicator */}
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>

                      {/* Subcategory name */}
                      <span className="text-gray-800 text-sm font-medium">
                        {subCategory.subcat_name_en}
                      </span>
                    </div>
                    {/* Dua Dropdown for the selected subcategory */}
                    {selectedSubCategoryId === subCategory.subcat_id && (
                      <div className="mt-3">
                        {duas.length > 0 ? (
                          <ul className="space-y-2">
                            {duas.map((dua) => (
                              <li key={dua.dua_id} className="text-gray-800">
                                {dua.dua_name_en}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600">No duas available</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
