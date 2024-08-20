import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex((invoice) => {
        return invoice.id === action.payload.id;
      });
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    updateInvoiceWithProduct: (state, action) => {
      if (state.length != 0) {
        const arr = state.map((item) => {
          const updatedItems = item.items.map((val) => {
            const filteredArray = action.payload.filter((item2) => {
              return item2.itemName === val.itemName;
            });
            if (filteredArray.length > 0) {
              return {
                ...val,
                itemDescription: filteredArray[0].itemDescription,
                itemType: filteredArray[0].itemType,
                itemPrice: filteredArray[0].itemPrice,
              };
            } else {
              return val;
            }
          });
          let subTotal = 0;
          updatedItems.forEach((item) => {
            subTotal +=
              parseFloat(item.itemPrice).toFixed(2) *
              parseInt(item.itemQuantity);
          });

          const taxAmount = parseFloat(
            subTotal * (item.taxRate / 100)
          ).toFixed(2);
          const discountAmount = parseFloat(
            subTotal * (item.discountRate / 100)
          ).toFixed(2);
          const total = (
            subTotal -
            parseFloat(discountAmount) +
            parseFloat(taxAmount)
          ).toFixed(2);
          return {
            ...item,
            items: updatedItems,
            subTotal: parseFloat(subTotal).toFixed(2),
            taxAmount,
            discountAmount,
            total,
          };
        });
        return (state = arr);
      }
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  updateInvoiceWithProduct,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
