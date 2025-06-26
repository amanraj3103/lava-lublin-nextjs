import dynamic from 'next/dynamic';
 
const OrderLoading = dynamic(() => import('./OrderLoadingClient'), { ssr: false });
export default OrderLoading; 