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
        pricePerUnit: 0,
        totalPrice: 0,
      });
    },

    deleteInvoiceItem(id) {
      this.invoiceItemList = this.invoiceItemList.filter(
        (item) => item.id !== id
      );
    },

    sumInvoiceTotal() {
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach((invoice) => {
        this.invoiceTotal += invoice.totalPrice;
      });
    },

    async addInvoiceToDatabase(details) {
      const {} = details;

      if (this.invoiceItemList.length <= 0) {
        throw new Error('Please make sure no field is empty');
      }

      this.sumInvoiceTotal();
    },
  },
});
