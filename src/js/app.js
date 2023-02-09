import CategoryView from './CategoryView.js';
import ProductView from './ProductView.js';

document.addEventListener('DOMContentLoaded', () => {
  CategoryView.setApp();
  //   console.log(CategoryView);
  //   create category options
  CategoryView.createCategoriesList();
  ProductView.setApp();
  ProductView.createProductsList();
});
