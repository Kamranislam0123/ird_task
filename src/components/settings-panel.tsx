'use client'

export function SettingsPanel() {
  return (
    <aside className="w-64 bg-gray-100 p-4 space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold">Language Settings</h3>
        <button className="mt-2 w-full bg-green-500 text-white py-2 rounded">English</button>
        <button className="mt-2 w-full bg-gray-200 py-2 rounded">বাংলা</button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold">General Settings</h3>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold">Font Settings</h3>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold">Appearance Settings</h3>
      </div>
    </aside>
  )
}

