"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getTeachers } from "@/api/actionsServer"; // Importando a função que você criou


const columns = [
  {
    header: "Info",
    acessor: "info",
  },
  {
    header: "Teacher ID",
    acessor: "teacherid",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    acessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    acessor: "classes",
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

const TeacherListPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]); // Estado para armazenar os professores
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Número de itens por página
  const [totalItems, setTotalItems] = useState(0); // Total de professores

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getTeachers(); // Chamando a função para buscar professores
      console.log(data);
      setTeachers(data); // Atualizando o estado
      setTotalItems(data.length);
    };
    fetchTeachers();
  }, []); // O array vazio garante que a função seja chamada apenas uma vez

  const totalPages = Math.ceil(totalItems / itemsPerPage);


  const renderRow = (item: Teacher) => (
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
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.teacherid}</td>
      <td className="hidden md:table-cell">{item.subjects}</td>
      <td className="hidden md:table-cell">{item.classes}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>

      <td>
        <div className="flex items-center gap-2">
          <Link href={"/dashboard/list/teachers/${item.id}"}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#C3EBFA]">
              <Image src="/view.png" alt="" width={16} height={16}/>
            </button>
          </Link>
          {role === "admin" && (
            
            <FormModal table="teacher" type="delete" id={item.id}/>
          )}
        </div>
      </td>
    </tr>
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems = teachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={currentItems} />
      {/* PAGINNATION */}
      <Pagination 
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange} />
    </div>
  );
};


export default TeacherListPage;
