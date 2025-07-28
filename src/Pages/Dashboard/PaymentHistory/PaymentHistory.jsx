import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { CreditCard, DollarSign, Calendar, CheckCircle } from 'lucide-react';

const PaymentHistory = () => {
  const {user} = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payments/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        fontFamily: '"Inter", sans-serif'
      }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading Payment History...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        fontFamily: '"Inter", sans-serif'
      }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-2">Error Loading Payment History</h2>
            <p className="text-white/70">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.3"/><circle cx="75" cy="25" r="1" fill="%23ffffff" opacity="0.2"/><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.4"/><circle cx="25" cy="75" r="1" fill="%23ffffff" opacity="0.3"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>')`,
          backgroundRepeat: 'repeat',
          width: '100%',
          height: '100%'
        }} />
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-xl">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-100">
                Payment History
              </h1>
            </div>
          </div>
          <p className="text-amber-300 text-sm font-medium tracking-wide">
            BISTRO BOSS RESTAURANT • TRANSACTION RECORDS
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">{payments?.length || 0}</h3>
                <p className="text-white/70 font-medium">Total Payments</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">
                  ${payments?.reduce((total, payment) => total + (parseFloat(payment.price) || 0), 0).toFixed(2)}
                </h3>
                <p className="text-white/70 font-medium">Total Amount</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl max-w-7xl mx-auto">
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-6 text-amber-300 font-semibold">#</th>
                    <th className="text-left py-4 px-6 text-amber-300 font-semibold">Email</th>
                    <th className="text-left py-4 px-6 text-amber-300 font-semibold">Transaction ID</th>
                    <th className="text-left py-4 px-6 text-amber-300 font-semibold">Amount</th>
                    <th className="text-left py-4 px-6 text-amber-300 font-semibold">Status</th>
                    <th className="text-left py-4 px-6 text-amber-300 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments?.length > 0 ? (
                    payments.map((payment, index) => (
                      <tr key={payment._id || index} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                        <td className="py-4 px-6">
                          <span className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-white font-medium">{payment.email}</td>
                        <td className="py-4 px-6">
                          <span className="bg-white/20 text-white px-3 py-1 rounded-lg font-mono text-sm">
                            {payment.transactionId}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-green-400 font-bold text-lg">
                            ${parseFloat(payment.price).toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            payment.status === 'paid' || payment.status === 'complete' || payment.status === 'succeeded'
                              ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                              : payment.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                              : 'bg-red-500/20 text-red-300 border border-red-400/30'
                          }`}>
                            <CheckCircle className="w-4 h-4 inline mr-1" />
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-white/80">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">
                              {payment.date ? new Date(payment.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }) : 'N/A'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-12">
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-xl">
                            <CreditCard className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">No Payment History Found</h3>
                          <p className="text-white/70">Your payment transactions will appear here once you make a purchase</p>
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
    </div>
  );
};

export default PaymentHistory;