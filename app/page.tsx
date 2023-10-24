"use client";
import {React, useEffect, useState} from 'react';
import {Doughnut, Line} from 'react-chartjs-2';
import {Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title} from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const data = {
  labels: [ 'New Leads', 'Current Clients', 'Inactive' ],
  datasets: [{
    label: 'Client Data Chart',
    data: [325, 73, 108],
    backgroundColor: [
      'rgb(8,60,93)',
      'rgb(217,131,16)',
      'rgb(50,140,193)'
    ],
    hoverOffset: 4
  }],
}

const lineLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const lineData = {
  labels: lineLabels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [398, 287, 498, 145, 255, 389, 350],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [101, 255, 185, 305, 289, 441, 500],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export default function Home() {
  
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const getData= async () => {
      const query = await fetch('https://jsonplaceholder.typicode.com/users');
      const response = await query.json();
      setUserInfo(response);
    }
    getData();
  }, []);

  console.log(userInfo);

  return (
    <main className="p-24">
      <h1 className="text-center">Data Dashboard</h1>
      <div className="flex items-center justify-between p-24">
        <div className="doughnut-chart">
          <Doughnut data={data} />
        </div>
        <div className="table-chart">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Website</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userInfo && userInfo.length && userInfo.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.website}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="line-chart">
        <Line options={lineOptions} data={lineData} />
      </div>
    </main>
  )
}