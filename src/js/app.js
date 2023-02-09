import CategoryView from './CategoryView.js';

document.addEventListener('DOMContentLoaded', () => {
  CategoryView.setApp();
  console.log(CategoryView);
  //   create category options
  CategoryView.createCategoriesList();
});
