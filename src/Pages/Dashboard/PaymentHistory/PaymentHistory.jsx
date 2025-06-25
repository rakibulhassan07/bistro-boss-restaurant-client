import React, { use, useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { findValueType } from 'framer-motion';
import { div } from 'framer-motion/client';

const PaymentHistory = () => {
  const {user} =useContext(AuthContext);
  const axisSecure = useAxiosSecure();
  const { data: payments =[]  } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const response = await axisSecure.get(`/payments/${user?.email}`);
      return response.data;
     
    },

  })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-orange-400 text-sm italic mb-4">---At a Glance!---</p>
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">PAYMENT HISTORY</h1>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Total Payments */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Total Payments: {payments?.length}</h2>
            <div className="text-lg font-semibold text-green-600">
              Total Amount: ${payments?.reduce((total, payment) => total + (parseFloat(payment.price) || 0), 0).toFixed(2)}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="bg-orange-400">
                   <th className="text-white font-semibold py-4 px-6 text-left rounded-tl-lg">EMAIL</th>
                  <th className="text-white font-semibold py-4 px-6 text-left">TRANSACTION ID</th>
                  <th className="text-white font-semibold py-4 px-6 text-left">PRICE</th>
                  <th className="text-white font-semibold py-4 px-6 text-left">STATUS</th>
                  <th className="text-white font-semibold py-4 px-6 text-left rounded-tr-lg">DATE</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-4 px-6 text-gray-700">{payment.email}</td>
                    <td className="py-4 px-6 text-gray-700">{payment.transactionId}</td>
                    <td className="py-4 px-6 text-gray-700">{payment.price}</td>
                    <td className="py-4 px-6 text-gray-700">{payment.status}</td>
                    <td className="py-4 px-6 text-gray-700">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;