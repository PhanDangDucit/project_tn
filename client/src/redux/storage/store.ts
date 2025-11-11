import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rtkQueryLogger } from '../../middlewares/rtkQueryLogger/rtkQueryLogger';
import storage from 'redux-persist/lib/storage';
import { blogApi } from '../../services/blog/blog.services';
import { authApi } from '../../services/auth/auth.services';
import { logoutApi } from '~/services/auth/logout.services';

import authSlice from '../../services/auth/auth.slice';
import { productCategoriesApi } from '~/services/product-category/productCategories.service';
import { productsApi } from '~/services/product/product.service';
import { postCategoriesApi } from '~/services/post-category/post-category.service';
import { cartDetailApi } from '~/services/cart/cart.service';
import { customerApi } from '~/services/customer/customer.service';
import { orderApi } from '~/services/order/order.service';
import { orderDetailApi } from '~/services/order/order-detail.service';
import { paymentMethodsApi } from '~/services/payment-methods/payment-method.service';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'history'],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
  [productCategoriesApi.reducerPath]: productCategoriesApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [cartDetailApi.reducerPath]: cartDetailApi.reducer,
  [postCategoriesApi.reducerPath]: postCategoriesApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [orderDetailApi.reducerPath]: orderDetailApi.reducer,
  [paymentMethodsApi.reducerPath]: paymentMethodsApi.reducer,
  [logoutApi.reducerPath]: logoutApi.reducer,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      blogApi.middleware,
      productCategoriesApi.middleware,
      productsApi.middleware,
      postCategoriesApi.middleware,
      cartDetailApi.middleware,
      customerApi.middleware,
      orderApi.middleware,
      orderDetailApi.middleware,
      paymentMethodsApi.middleware,
      logoutApi.middleware,
      rtkQueryLogger,
    ),
  devTools: import.meta.env.MODE !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default { store, persistor };
