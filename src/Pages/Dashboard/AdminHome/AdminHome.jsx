import React, { useContext } from 'react';
import { Wallet, Users, ShoppingBag, Truck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector,  ResponsiveContainer, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const AdminHome = () => {
  const {user} =useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data:stats ={}, isLoading, error } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const response = await axiosSecure.get('/admin-stats');
      console.log('Admin Stats Response:', response.data);
      return response.data;
    }
  })
  const { data:chartData =[] } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const response = await axiosSecure.get('/order-stats');
      console.log('Admin Stats Response:', response.data);
      return response.data;
    }
  })


  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading admin statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading admin statistics: {error.message}</div>
      </div>
    );
  }
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// Prepare chart data
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const pieChartData = chartData.map(data => {
  return {
    name: data.category, // Legend uses 'name' property
    category: data.category,
    value: data.revenue
  };
})
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className='mb-6'> <h1 className="text-2xl font-bold text-gray-800 ">Hi, WELCOME BACK! </h1>
      <span  className="text-2xl font-bold text-gray-800 mb-6">{user?.displayName? user?.displayName:"Black"}</span></div>
     

      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                ${stats?.revenue}
              </div>
              <div className="text-purple-100">Revenue</div>
            </div>
            <Wallet className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                { stats?.users}
              </div>
              <div className="text-orange-100">Customers</div>
            </div>
            <Users className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                {stats?.products}
              </div>
              <div className="text-pink-100">Products</div>
            </div>
            <ShoppingBag className="w-8 h-8 text-pink-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                {stats?.orders }
              </div>
              <div className="text-blue-100">Orders</div>
            </div>
            <Truck className="w-8 h-8 text-blue-200" />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Items Sold by Category</h3>
         <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 6]} />
        ))}
      </Bar>
    </BarChart></div>
    {/* Pie Chart Section */}
         <div className="w-1/2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Revenue by Category</h3>
          <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px'
            }}
          />
        </PieChart></div>
      </div>
     
    </div>
  );
};

export default AdminHome;