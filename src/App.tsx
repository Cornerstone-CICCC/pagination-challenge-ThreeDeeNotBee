import React, { useState, useEffect } from 'react'
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const fetchMockData = async (page, limit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalItems = getRandomIntInclusive(43, 92)
      const startIndex = (page - 1) * limit

      const items = Array.from({ length: limit }, (_, i) => ({
        id: startIndex + i + 1,
        name: `Item #${startIndex + i + 1}`,
      })).filter((item) => item.id <= totalItems)

      resolve({
        data: items,
        totalPages: Math.ceil(totalItems / limit),
      })
    }, 600)
  })
}

export default function PaginatedList() {
  // --- STATE MANAGEMENT ---
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [pageInput, setPageInput] = useState('1') // String to allow temporary empty input

  // --- DATA FETCHING ---
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const result = await fetchMockData(currentPage, itemsPerPage)
      setData(result.data)
      setTotalPages(result.totalPages)
      setPageInput(currentPage.toString()) // Keep input field synced with actual page
      setLoading(false)
    }

    loadData()
  }, [currentPage, itemsPerPage])

  // --- EVENT HANDLERS ---
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1) // Reset to first page to avoid out-of-bounds errors
  }

  const handlePageInputSubmit = (e) => {
    e.preventDefault()
    let newPage = parseInt(pageInput, 10)

    // Boundary enforcement
    if (isNaN(newPage) || newPage < 1) {
      newPage = 1
    } else if (newPage > totalPages) {
      newPage = totalPages
    }

    setCurrentPage(newPage)
    setPageInput(newPage.toString())
  }

  // --- RENDER ---
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg font-sans text-gray-800">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Directory</h2>

        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="itemsPerPage" className="font-medium">
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded-md p-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* List Display / Loading State */}
      <div className="min-h-[400px] border border-gray-200 rounded-lg overflow-hidden relative mb-6">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 z-10">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-500 font-medium">
              Fetching records...
            </p>
          </div>
        ) : null}

        <ul className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((item) => (
              <li
                key={item.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-lg text-blue-700">
                  {item.name}
                </h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </li>
            ))
          ) : (
            <li className="p-8 text-center text-gray-500">No items found.</li>
          )}
        </ul>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        {/* Prev/Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            Previous
          </button>
          <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            Next
          </button>
        </div>

        {/* Direct Page Input */}
        <form
          onSubmit={handlePageInputSubmit}
          className="flex items-center gap-2"
        >
          <label
            htmlFor="pageInput"
            className="text-sm font-medium text-gray-700"
          >
            Go to:
          </label>
          <input
            id="pageInput"
            type="number"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            disabled={loading}
            className="w-16 p-1.5 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
            min={1}
            max={totalPages}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Go
          </button>
        </form>
      </div>
    </div>
  )
}
