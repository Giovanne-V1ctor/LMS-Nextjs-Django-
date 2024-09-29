import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, teachersData } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

type Teacher={
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
}

const columns = [
  {
    header: "Info", acessor: "info"
  },
  {
    header: "Teacher ID", 
    acessor: "teacherId", 
    className:"hidden md:table-cell"
  },
  {
    header: "Subjects", 
    acessor: "subjects", 
    className:"hidden md:table-cell"
  },
  {
    header: "Classes", 
    acessor: "classes", 
    className:"hidden md:table-cell"
  },
  {
    header: "Phone", 
    acessor: "phone", 
    className:"hidden lg:table-cell"
  },
  {
    header: "Address", 
    acessor: "address", 
    className:"hidden lg:table-cell"
  },
  {
    header: "Actions", 
    acessor: "actions", 
  },
]

const TeacherListPage = () => {

  const renderRow = (item:Teacher) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]">
      <td className="flex items-center gap-4 p-4">
        <Image src={item.photo} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover"/>
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.teacherId}
      </td>
      <td className="hidden md:table-cell">
        {item.subjects.join(",")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.join(",")}
      </td>
      <td className="hidden md:table-cell">
        {item.phone}
      </td>
      <td className="hidden md:table-cell">
        {item.address}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
            <FormModal table="teacher" type="update" id={item.id}/>
            <FormModal table="teacher" type="delete" id={item.id}/>
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
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
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
              <FormModal table="teacher" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={teachersData}/>
      {/* PAGINNATION */}
        <Pagination/>
    </div>
  );
};

export default TeacherListPage