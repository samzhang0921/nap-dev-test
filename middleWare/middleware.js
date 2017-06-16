var config = require('../config/config');
var allProducts = require(config.ROOT + "/fixtures/products.json").data;
var utility = require('./utility');

function init(req, res, next) {
  res.locals.allProducts = allProducts;
  res.locals.allDesigners = utility.getDesigners(allProducts);
  next();
}

function setLanguage(req, res, next) {
  res.locals.language = req.params.language;
  next();
}

// function setCategories(req, res, next) {
//     res.locals.categories = req.query.cat;
//     next();
// }
//
// function setCaregoriesProducts(req, res, next){
//
//     if (res.locals.categories == 'all') {
//         res.locals.allProducts = res.locals.allProducts;
//     } else {
//         res.locals.allProducts = utility.getAllCategoriesProducts(res.locals.allProducts, res.locals.categories);
//     }
//
//     next();
// }
function setQuery(req, res, next) {
  res.locals.offset = parseInt(req.query.offset) || 0;
  res.locals.limit = parseInt(req.query.limit) || 60;
  res.locals.sort = req.query.sort;
  res.locals.brandId = req.query.brand;
  res.locals.categories = req.query.cat;
  res.locals.colorId = req.query.color || '';
  next();
}

function processProducts(req, res, next) {
  if (res.locals.sort) {
    res.locals.allProducts = utility.sortBy(res.locals.allProducts, res.locals.sort);
  }
  if (res.locals.colorId) {
      var colorArray = res.locals.colorId.split(',');
      var colorProducts = utility.getAllProductsColor(res.locals.allProducts, colorArray);
      res.locals.allProducts = colorProducts;
  }
  if (res.locals.categories) {
      res.locals.allProducts = utility.getAllCategoriesProducts(res.locals.allProducts, res.locals.categories);
  } else {
      res.locals.allProducts = res.locals.allProducts;
  }
  if (res.locals.brandId) {
      var brandArray = res.locals.brandId.split(',');
      var brandProducts = utility.getAllBrandsProducts(res.locals.allProducts, brandArray);
      res.locals.allProducts = brandProducts;
  }


  next();
}

module.exports = {
  init: init,
  setQuery: setQuery,
  setLanguage: setLanguage,
  processProducts: processProducts
};
