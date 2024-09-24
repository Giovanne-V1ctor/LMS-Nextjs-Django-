const Announcements = () => {
  return (
    <div className='bg-white p-4 rounded-md'>
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Announcements</h1>
            <span className="text-xs text-gray-400">View all</span>
        </div>
        <div className="flex flex-col gap-4 mt-4"> 
            <div className="bg-[#EDF9FD] rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">Lorem ipsum dolor sit</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="bg-[#F1F0FF] rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">Lorem ipsum dolor sit</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="bg-[#FEFCE8] rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">Lorem ipsum dolor sit</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
        </div>
    </div>
  )
}

export default Announcements