import React from 'react';

const PaymentHistory = () => {
  const payments = [
    {
      email: 'info@gmail.com',
      category: 'Food Order',
      totalPrice: '$71.5',
      paymentDate: 'Monday, April 10, 2023'
    },
    {
      email: 'info@gmail.com',
      category: 'Food Order',
      totalPrice: '$71.5',
      paymentDate: 'Monday, April 10, 2023'
    },
    {
      email: 'info@gmail.com',
      category: 'Food Order',
      totalPrice: '$71.5',
      paymentDate: 'Monday, April 10, 2023'
    },
    {
      email: 'info@gmail.com',
      category: 'Food Order',
      totalPrice: '$71.5',
      paymentDate: 'Monday, April 10, 2023'
    },
    {
      email: 'info@gmail.com',
      category: 'Food Order',
      totalPrice: '$71.5',
      paymentDate: 'Monday, April 10, 2023'
    },
    {
      email: 'info@gmail.com',
      category: 'Food Order',
      totalPrice: '$71.5',
      paymentDate: 'Monday, April 10, 2023'
    }
  ];

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
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Total Payments: 6</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="bg-orange-400">
                  <th className="text-white font-semibold py-4 px-6 text-left rounded-tl-lg">EMAIL</th>
                  <th className="text-white font-semibold py-4 px-6 text-left">CATEGORY</th>
                  <th className="text-white font-semibold py-4 px-6 text-left">TOTAL PRICE</th>
                  <th className="text-white font-semibold py-4 px-6 text-left rounded-tr-lg">PAYMENT DATE</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-4 px-6 text-gray-700">{payment.email}</td>
                    <td className="py-4 px-6 text-gray-700">{payment.category}</td>
                    <td className="py-4 px-6 text-gray-700">{payment.totalPrice}</td>
                    <td className="py-4 px-6 text-gray-700">{payment.paymentDate}</td>
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