"use client"

import { getStudents } from "@/api/actionsServer";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role} from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const columns = [
  {
    header: "Info",
    acessor: "info",
  },
  {
    header: "Student ID",
    acessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    acessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    acessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    acessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    acessor: "actions",
  },
];

const StudentListPage = () => {
  const [students, setStudents] = useState<Student[]>([]); // Estado para armazenar os professores

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents(); // Chamando a função para buscar professores
      console.log(data);
      setStudents(data); // Atualizando o estado
    };
    fetchStudents();
  }, []); // O array vazio garante que a função seja chamada apenas uma vez

  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={"/dashboard/list/students/${item.id}"}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#C3EBFA]">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            //<button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#CFCEFF]">
            //  <Image src="/delete.png" alt="" width={16} height={16}/>
            //</button>
            <FormModal table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              //<button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              //  <Image src="/plus.png" alt="" width={14} height={14} />
              //</button>
              <FormModal table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={students} />
      {/* PAGINNATION */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;
