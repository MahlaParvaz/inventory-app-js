import Storage from './Storage.js';
const categoryTitle = document.querySelector('#category-title');
const categoryDescription = document.querySelector('#category-description');
const addNewCategoryBtn = document.querySelector('#add-new-category');

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener('click', (event) => this.addNewCategory(event));
    this.categories = [];
  }
  addNewCategory(event) {
    event.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategories({ title, description });
    this.categories = Storage.getAllCategories();
    // updated dom
    this.createCategoriesList();
    categoryTitle.value = '';
    categoryDescription.value = '';
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList() {
    let result = ` <option value="">select a category</option>`;
    this.categories.forEach((element) => {
      result += `<option value=${element.id}>${element.title}</option>`;
    });
    const categoriesOption = document.querySelector('#product-category');
    categoriesOption.innerHTML = result;
  }
}
export default new CategoryView();
