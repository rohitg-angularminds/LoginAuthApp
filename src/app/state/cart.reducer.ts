import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  getTotalAmount,
  removeItem,
  stepDownCounter,
  stepUpCounter,
} from './cart.actions';
import { product } from './product.model';

export const initialState: any = {
  products: [],
  totalAmount: 0,
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, product: any) => {
    let products =
      JSON.parse(localStorage.getItem('cart') || '[]')?.products ||
      state.products;

    const index = products?.findIndex((item: any) => item._id === product._id);
    products = index === -1 ? [...products, product] : [...products];

    state = {
      ...state,
      products: products,
    };

    localStorage.setItem('cart', JSON.stringify(state));
    return state;
  }),

  on(stepUpCounter, (state, id: any) => {
    let products =
      JSON.parse(localStorage.getItem('cart') || '[]')?.products ||
      state.products;

    const index = products.findIndex((item: any) => item._id === id.productId);
    products[index].qty++;
    products[index].totalPrice = products[index].qty * products[index].price;

    state = {
      ...state,
      products: products,
    };
    localStorage.setItem('cart', JSON.stringify(state));
    return state;
  }),

  on(stepDownCounter, (state, id) => {
    let products =
      JSON.parse(localStorage.getItem('cart') || '[]')?.products ||
      state.products;

    const index = products.findIndex((item: any) => item._id === id.productId);
    products[index].qty--;
    if (products[index].qty === 0) {
      products = products.filter((item: any) => item._id !== id.productId);
    } else {
      products[index].totalPrice = products[index].qty * products[index].price;
    }

    state = {
      ...state,
      products: products,
    };

    localStorage.setItem('cart', JSON.stringify(state));
    return state;
  }),
  on(getTotalAmount, (state) => {
    let products =
      JSON.parse(localStorage.getItem('cart') || '[]')?.products ||
      state.products;

    let amount = 0;
    products.map((item: any) => (amount += item.totalPrice));
    return {
      ...state,
      totalAmount: amount,
    };
  }),
  on(removeItem, (state, id) => {
    let products =
      JSON.parse(localStorage.getItem('cart') || '[]')?.products ||
      state.products;

    products = products.filter((item: any) => item._id !== id.productId);

    state = {
      ...state,
      products: products,
    };

    localStorage.setItem('cart', JSON.stringify(state));
    return state;
  })
);

export const totalAmountReducer = createReducer(initialState);
