import {createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
    productList : [],
    cartItem : []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setDataProduct : (state, action) => {
            state.productList = [...action.payload]
        },
        addCartItem: (state, action) => {
            const check = state.cartItem.some((el) => el._id === action.payload._id);
            if (check) {
                toast('Already In Your Cart');
            } else {
                const total = action.payload.price;
                state.cartItem = [...state.cartItem, { ...action.payload, qty: 1, total: total }];
                toast('Item Added Successfully');
            }
        },
        deleteCartItem: (state, action) => {
           toast("Item Deleted")
           const index = state.cartItem.findIndex((el) => el._id === action.payload)
           state.cartItem.splice(index, 1)
           console.log(index);
        },
        increaseQty: (state, action) => {
           const index = state.cartItem.findIndex((el) => el._id === action.payload)
           state.cartItem[index] = {
            ...state.cartItem[index],
            qty: state.cartItem[index].qty + 1 
          };
        },
        decreseQty: (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            if(state.cartItem[index].qty > 1) {
                state.cartItem[index] = {
                    ...state.cartItem[index],
                    qty: state.cartItem[index].qty - 1 
                };

            }
         },
    }
})

export const {setDataProduct, addCartItem, deleteCartItem, increaseQty, decreseQty} = productSlice.actions
export default productSlice.reducer