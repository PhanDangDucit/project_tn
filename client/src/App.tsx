import { ReactElement } from 'react';
import AppRoutes from './routes';
import { CartProvider } from './context/CartContext';


function App(): ReactElement {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}


export default App;