import { createAction, props } from "@ngrx/store";
import {product } from './product.model'

export const addToCart = createAction('[cart component] Addtocart', props<{product : product}>())
export const stepUpCounter = createAction('[cart component] stepUpCounter',props<{productId : number}>())
export const stepDownCounter = createAction('[cart component] stepDownCounter',props<{productId : number}>())
export const getTotalAmount = createAction('[cart component] getTotalAmount')
export const removeItem = createAction('[cart component] removeItem', props<{productId : number}>())



