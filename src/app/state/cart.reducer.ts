import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  buyNow,
  getTotalAmount,
  stepDownCounter,
  stepUpCounter,
  updateQuantity,
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
    console.log(products[index].qty);
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
    state = {
      ...state,
      products: products,
      totalAmount: amount,
    };
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
  }),
  on(updateQuantity, (state, Qty) => {
    let products =
      JSON.parse(localStorage.getItem('cart') || '[]')?.products ||
      state.products;

    const index = products.findIndex((item: any) => item._id === Qty.productId);
    console.log(Qty);

    products[index].qty = Qty.productQty;
    products[index].totalPrice = products[index].qty * products[index].price;

    console.log(products[index].totalPrice);

    state = {
      ...state,
      products: products,
    };

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
    // const index = products.findIndex((item: any) => item._id === id.productId);
  })
);

export const buyReducer = createReducer(
  initialState,
  on(buyNow, (state,product: any) => {

    state =  {
      ...state,
      products : [product],
      totalAmount : product.price
    }
    return state;
  }),
)
