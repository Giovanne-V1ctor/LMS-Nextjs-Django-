"use client"
import Image from 'next/image';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Seg',
    presenca: 60,
    falta: 40,
  },
  {
    name: 'Ter',
    presenca: 70,
    falta: 60,
  },
  {
    name: 'Qua',
    presenca: 90,
    falta: 75,
  },
  {
    name: 'Qui',
    presenca: 90,
    falta: 75,
  },
  {
    name: 'Sex',
    presenca: 65,
    falta: 55,
  },
];

const AttendanceChart = () => {
  return (
    <div className='bg-white rounded-lg p-4 h-full'>
        <div className=''>
            <h1>Attendance</h1>
            <Image src="/moreDark.png" alt='' width={20} height={20}/>
        </div>
        <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend align='left' verticalAlign='top' wrapperStyle={{paddingTop:"20px", paddingBottom:"40px"}}/>
          <Bar dataKey="falta" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="presenca" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttendanceChart