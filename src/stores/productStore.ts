import { KEY_LOCAL_STORAGE } from "@/constants/localStorage";
import { products } from "@/constants/products";
import { ICart, IProduct } from "@/types";
import { betterFilter } from "@/utils/betterFilter";
import { defineStore } from "pinia";
import { watch } from "vue";
import { toast } from "vue-sonner";
interface IProductStore {
  products: IProduct[];
  cart: ICart;
  search: string;
  sort: "asc" | "desc";
}
const getDefaultCart = (): ICart => {
  const cart = localStorage.getItem(KEY_LOCAL_STORAGE);
  return cart ? JSON.parse(cart) : [];
};

export const useProductStore = defineStore("product", {
  state: (): IProductStore => ({
    products,
    cart: getDefaultCart(),
    search: "",
    sort: "asc",
  }),
  getters: {
    getCartTotal: (state) =>
      state.cart.reduce((acc, item) => acc + item.price * item.amount, 0),

    getCartQuantity: (state) =>
      state.cart.reduce((acc, item) => acc + item.quantity, 0),

    getProductTotal: () => (product: IProduct) =>
      product.price * product.quantity,
    isAllProductSelected: (state) => {
      return state.cart.every((c) => c.selected);
    },
    getSelectedProductIds: (state) => {
      return state.cart.filter((c) => c.selected).map((c) => c.id);
    },
    isProductInCart: (state) => (id: string) => {
      return state.cart.some((c) => c.id === id);
    },
  },
  actions: {
    findProductById(id: string) {
      return this.products.find((product) => product.id === id);
    },
    findProductIndexById(id: string) {
      this.products.findIndex((product) => product.id === id);
    },
    addToCart(product: IProduct) {
      const existingProduct = this.findProductById(product.id);
      if (!existingProduct) return toast.error("Product not found.");
      if (existingProduct.quantity === 0)
        return toast.error("Product out of stock!");

      const existingProductInCart = this.cart.find(
        (c) => existingProduct.id === c.id
      );
      if (!existingProductInCart) {
        this.cart.push({ ...product, selected: false, amount: 1 });
        return toast.success("Product added to cart!");
      }
      existingProductInCart.amount++;
      toast.success("Product already in cart, amount increased!");
    },
    removeFromCart(product: IProduct) {
      const existingProduct = this.findProductById(product.id);
      if (!existingProduct) return toast.error("Product not found.");
      const existingProductInCart = this.cart.find(
        (c) => existingProduct.id === c.id
      );
      if (!existingProductInCart) return toast.error("Product not in cart.");
      this.cart = this.cart.filter((c) => c.id !== existingProduct.id);
      toast.success("Product removed from cart!");
    },
    quantityControl(product: IProduct, action: "increment" | "decrement") {
      const existingProduct = this.findProductById(product.id);
      if (!existingProduct) {
        return toast.error("Product not in cart.");
      }
      const existingProductInCart = this.cart.find(
        (c) => existingProduct.id === c.id
      );
      if (!existingProductInCart) {
        return toast.error("Product not in cart.");
      }
      if (action === "increment") {
        existingProductInCart.amount++;
      } else {
        existingProductInCart.amount--;
        if (existingProductInCart.amount === 0) {
          this.removeFromCart(existingProduct);
        }
      }
    },
    removeSelectedProductInCart(ids: string[]) {
      this.cart = this.cart.filter((c) => !ids.includes(c.id));
    },
    toggleSelectProduct(id: string) {
      const existingProductInCart = this.cart.find((c) => c.id === id);
      if (!existingProductInCart) return;
      existingProductInCart.selected = !existingProductInCart.selected;
    },
    toggleSelectAllProducts(value: boolean) {
      this.cart = this.cart.map((c) => ({ ...c, selected: !value }));
    },

    clearCart() {
      this.cart = [];
    },
    sortProducts() {
      this.products.sort((a, b) =>
        this.sort === "asc" ? a.price - b.price : b.price - a.price
      );
    },
    searchProducts(q: string) {
      if (q === "") {
        this.products = products;
        return products;
      }
      this.products = this.products.filter((product) =>
        betterFilter(product.name).includes(betterFilter(q))
      );
      return this.products;
    },
  },
});

export const setupProductStoreWatcher = () => {
  const store = useProductStore();
  watch(
    () => store.cart,
    (newCart) => {
      localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(newCart));
    },
    { deep: true }
  );
  watch(
    () => store.sort,
    () => {
      store.sortProducts();
    }
  );
  watch(
    () => store.search,
    (q) => {
      store.products = store.searchProducts(q);
    }
  );
};
