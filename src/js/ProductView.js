import Storage from './Storage.js';

const productTitle = document.querySelector('#product-title');
const productQuantity = document.querySelector('#product-quantity');
const productCategory = document.querySelector('#product-category');
const addNewProductBtn = document.querySelector('#add-new-product');
const searchInput = document.querySelector('#search-product');
const sortProducts = document.querySelector('#sort-product');

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener('click', (event) => this.addNewProduct(event));
    searchInput.addEventListener('input', (event) => this.searchProducts(event));
    sortProducts.addEventListener('change', (event) => this.sortProducts(event));
    this.products = [];
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  addNewProduct(event) {
    event.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;
    if (!title || !quantity || !category) return;
    Storage.saveProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    // updated dom
    this.createProductsList(this.products);
    productTitle.value = '';
    productQuantity.value = '';
  }

  createProductsList(products) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let result = ` `;
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find((c) => c.id == item.category);
      result += ` <div  class="flex items-center justify-between mb-4">
      <span class="text-slate-700 font-bold">${item.title}</span>
      <div class="flex items-center justify-between gap-x-2">
        <span>${new Date().toLocaleDateString(undefined, options)}</span>
        <span class="border border-slate-400 px-3 py-0.5 rounded-2xl">${selectedCategory.title}</span>
        <span
          class="w-7 h-7 border border-2 border-slate-400 rounded-full flex items-center justify-center bg-blue-600 text-white text-sm"
          >${item.quantity}</span>
        <button class="delete-btn border border-red-600 text-red-600 px-2 py-0.5 rounded-2xl"  data-product-id=${
          item.id
        }>delete</button>
      </div>
    </div>`;
    });
    const productsListDiv = document.querySelector('#products-list');
    productsListDiv.innerHTML = result;
    const deleteProductsBtn = [...document.querySelectorAll('.delete-btn')];
    deleteProductsBtn.forEach((item) => {
      item.addEventListener('click', (event) => this.deleteProducts(event));
    });
  }
  searchProducts(event) {
    const value = event.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((item) => item.title.toLowerCase().includes(value));
    this.createProductsList(filteredProducts);
  }
  sortProducts(event) {
    const value = event.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }
  deleteProducts(event) {
    const productId = event.target.dataset.productId;
    Storage.deleteProducts(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
}

export default new ProductView();
