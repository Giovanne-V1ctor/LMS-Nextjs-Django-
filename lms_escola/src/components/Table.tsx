import React from "react";

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const modifiedRenderRow = (item: any) => {
    // Aqui, você pode modificar o item para formatar a data
    if (item.date) {
      item.date = formatDate(item.date);
    } else if (item.dueDate) {
      item.dueDate = formatDate(item.dueDate);
    }
    return renderRow(item);
  };

  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => modifiedRenderRow(item))}</tbody>
    </table>
  );
};

export default Table;
