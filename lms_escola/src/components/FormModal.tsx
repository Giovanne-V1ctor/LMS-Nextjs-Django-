"use client"

const FormModal = ({table, type, data, id}:{
    table: "teacher" | "student" | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
    type: "create" | "update" | "delete";
    data?:any;
    id?:number; 
}) => {

    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-[#FAE27C]" : type === "update" ? "bg-[#C3EBFA]" : "bg-[#CFCEFF]";
        return  <>
        <button className=""/>
        </>
}

export default FormModal