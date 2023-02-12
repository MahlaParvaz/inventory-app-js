import CategoryView from './CategoryView.js';
import ProductView from './ProductView.js';

document.addEventListener('DOMContentLoaded', () => {
  CategoryView.setApp();
  ProductView.setApp();
  //   console.log(CategoryView);
  //   create category options
  CategoryView.createCategoriesList();
  ProductView.createProductsList(ProductView.products);
});
