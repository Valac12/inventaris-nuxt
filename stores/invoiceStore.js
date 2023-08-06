import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    invoiceItemList: [],
    invoiceTotal: 0,
  }),
  actions: {
    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uuidv4(),
        itemName: '',
        quantity: 0,
      });
    },

    deleteInvoiceItem(id) {
      this.invoiceItemList = this.invoiceItemList.filter(
        (item) => item.id !== id
      );
    },
  },
});
