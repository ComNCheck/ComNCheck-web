export default function EventCheck() {
  return (
    <div className="w-80">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="mb-4">
          <div className="text-sm text-gray-500">| 2025년 7월 11일 (금)</div>
          <div className="text-red-500 font-medium">D-3</div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium">1학기 개강총회</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium">1학기 개강총회</div>
          </div>
          <div className="bg-gray-50 p-3 rounded flex justify-between items-center">
            <div className="font-medium">1학기 개강총회</div>
            <button className="bg-red-500 text-white w-6 h-6 rounded text-xs">
              II
            </button>
          </div>
        </div>

        <button className="w-full bg-gray-100 text-gray-600 py-2 rounded text-sm">
          행사일정 추가하기
        </button>
      </div>
    </div>
  );
}
