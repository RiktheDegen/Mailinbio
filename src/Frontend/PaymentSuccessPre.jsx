import React from 'react'
import { useLocation } from 'react-router-dom';

function PaymentSuccessPre() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successParam = queryParams.get('success');
  const failureParam = queryParams.get('canceled');


  if (successParam) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl text-green-500 mb-4">&#10003;</div>
      <div className="text-2xl font-semibold mb-8">Your payment was a success</div>
      {/* You can add additional details or links here */}
    </div>
    )
  } else if (failureParam) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl text-red-500 mb-4">&#10008;</div>
      <div className="text-2xl font-semibold mb-8">Your payment was a failure</div>
      {/* You can add additional details or links here */}
    </div>
    )
  } 

 
}

export default PaymentSuccessPre