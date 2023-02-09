const products = [
  {
    id: 1,
    title: 'React.js',
    category: 'frontend ',
    createdAt: '2021-9-31T15:03:23.556Z',
  },
  {
    id: 2,
    title: 'Node.js',
    category: 'backend ',
    createdAt: '2021-10-31T15:03:23.556Z',
  },
  {
    id: 3,
    title: 'Vue.js',
    category: 'frontend ',
    createdAt: '2021-11-31T15:03:23.556Z',
  },
];
const categories = [
  {
    id: 1,
    title: 'frontend',
    description: 'frontend of application',
    createdAt: '2021-11-01T10:47:26.889Z',
  },
  {
    id: 2,
    title: 'backend',
    description: 'the backend of application',
    createdAt: '2021-10-31T15:03:23.556Z',
  },
];

export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem('category')) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }
  static saveCategories(categoryToSave) {
    const categories = Storage.getAllCategories();
    const existedCategories = categories.find((category) => category.id === categoryToSave.id);
    if (existedCategories) {
      existedCategories.title = categoryToSave.title;
      existedCategories.description = categoryToSave.description;
      existedCategories.createdAt = new Date().toISOString();
    } else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      categories.push(categoryToSave);
    }
    localStorage.setItem('category', JSON.stringify(categories));
  }

  static getAllProducts() {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const sortedProducts = savedProducts.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedProducts;
  }
  static saveProducts(productToSave) {
    const Products = Storage.getAllProducts();
    const existedProducts = categories.find((product) => product.id === productToSave.id);
    if (existedProducts) {
      // edit
      existedProducts.title = categoryToSave.title;
      existedProducts.category = categoryToSave.category;
      existedProducts.quantity = categoryToSave.quantity;
      existedProducts.createdAt = new Date().toISOString();
    } else {
      // new
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      Products.push(categoryToSave);
    }
    localStorage.setItem('products', JSON.stringify(Products));
  }
}
