import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { attendancesData, role } from "@/lib/data"
import Image from "next/image"

type Attendance={
  id: number;
  subject: string;
  attendance: string;
  absent: string;
  class: string;
  date: string;
}

const columns = [
  {
    header: "Class", 
    acessor: "class",
  },
  {
    header: "Subject", 
    acessor: "subject",
  },
  {
    header: "Attendance",
    acessor: "attendance",
  },
  {
    header: "Absent",
    acessor: "absent",
  },
  {
    header: "Date", 
    acessor: "date", 
    className: "hidden md:table-cell",
  },
  {
    header: "Actions", 
    acessor: "actions", 
  },
]

const AttendanceListPage = () => {

  const renderRow = (item:Attendance) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]">
      <td className="flex items-center gap-4 p-4">
      {item.class}
      </td>
      <td>{item.subject}</td>
      <td className="hidden md:table-cell">{item.attendance}</td>
      <td className="hidden md:table-cell">{item.absent}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
            <FormModal table="attendance" type="update" data={item}/>
            <FormModal table="attendance" type="delete" id={item.id}/>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch/>
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table="attendance" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={attendancesData}/>
      {/* PAGINNATION */}
        <Pagination/>
    </div>
  );
};

export default AttendanceListPage