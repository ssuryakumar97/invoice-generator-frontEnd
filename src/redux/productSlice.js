import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const updatedArray = state.map((item1) => {
        const found = action.payload.find(
          (item2) => item1.itemName == item2.itemName
        );
        return found ? { ...item1, ...found, productId: item1.productId } : item1;
      });
      action.payload.forEach((item2) => {
        if (!state.some((item1) => item1.itemName == item2.itemName)) {
          const updatedItem = {...item2, productId: updatedArray.length+1}
          updatedArray.push(updatedItem);
        }
      });
      return state = updatedArray;
    },
    updateProduct: (state, action) => {
      return state.map((val) => {
        if(val.itemName == action.payload.itemName){
          return {
            ...val,
            ...action.payload
          } 
        } else{
          return val
        }
      })
    },
  },
});

export const { addProduct, updateProduct } = productSlice.actions;

export default productSlice.reducer;
