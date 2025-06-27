import React, { use, useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { findValueType } from 'framer-motion';
import { div } from 'framer-motion/client';
import './PaymentHistory.css';

const PaymentHistory = () => {
  const {user} = useContext(AuthContext);
  const axisSecure = useAxiosSecure();
  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const response = await axisSecure.get(`/payments/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) {
    return (
      <div className="payment-history-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-history-container">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Payment History</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-history-container">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-orange-500 text-sm italic mb-4">---At a Glance!---</p>
          <h1 className="text-4xl font-bold text-gray-800 tracking-wide">PAYMENT HISTORY</h1>
        </div>

        {/* Summary Cards */}
        <div className="summary-section">
          <div className="summary-card">
            <h3>{payments?.length || 0}</h3>
            <p>Total Payments</p>
          </div>
          <div className="summary-card">
            <h3>${payments?.reduce((total, payment) => total + (parseFloat(payment.price) || 0), 0).toFixed(2)}</h3>
            <p>Total Amount</p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="payment-history-card p-8">
          {/* Table */}
          <div className="payment-table-container overflow-x-auto">
            <table className="payment-table">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th>EMAIL</th>
                  <th>TRANSACTION ID</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {payments?.length > 0 ? (
                  payments.map((payment, index) => (
                    <tr key={payment._id || index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="index-cell">{index + 1}</td>
                      <td className="email-cell">{payment.email}</td>
                      <td>
                        <span className="transaction-id">{payment.transactionId}</span>
                      </td>
                      <td className="price-cell">${parseFloat(payment.price).toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${
                          payment.status === 'paid' || payment.status === 'complete' || payment.status === 'succeeded'
                            ? 'status-success'
                            : payment.status === 'pending'
                            ? 'status-pending'
                            : 'status-failed'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="date-cell">
                        {payment.date ? new Date(payment.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      <div className="flex flex-col items-center">
                        <div className="text-4xl mb-4">💳</div>
                        <p className="text-lg font-medium">No payment history found</p>
                        <p className="text-sm">Your payment transactions will appear here</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;