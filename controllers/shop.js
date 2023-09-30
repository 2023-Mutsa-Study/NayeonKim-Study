// const products = [];

/* const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {    // 아래와 라우트 경로는 같아 보이지만 메서드가 다르기 때문에 실질적으로는 다른 라우트
    /* res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</form>');
    next() 함수 호출하는 대신 응답 전송, send() 메서드로 기본적인 content type 지정 */
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
/*    res.render('add-product', {pageTitle: 'Add Product', 
                               path: '/admin/add-product', 
                               formsCSS: true, 
                               productCSS: true,
                               activeAddProduct: true});
} 

exports.postAddProduct =  (req, res) => {    // app.use()를 app.post()로 바꿔줌으로써 post에 대한 요청만 받음, get일 경우에도 마찬가지
    // products.push({title: req.body.title});    // form에 입력 시  출력되는 key:value 값이 title:
    const product = new Product(req.body.title);
    product.save();
    // console.log(req.body);
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    /* console.log(adminData.products);
    res.sendFile(path.join(rootDir, 'views', 'shop.html')); */    // next() 함수 호출하는 대신 응답 전송 
                                                                 // send() 메서드로 기본적인 content type 지정
                                                                 // sendFile() 인수로 기본적으로 하듯이 경로 지정하면 x path 패키지 임포트 필요
                                                                 // __dirname 은 /(루트 경로)를 운영체제가 아닌 현재 파일이 위치한 폴더(views)로 고정시켜줌
                                                                 // '../'은 상위 폴더로 올라가라
/*    Product.fetchAll(products => {
        res.render('shop', {prods: products, 
                            pageTitle: 'Shop', 
                            path:'/',    /// 템플릿 엔진 반환, pug를 기본 엔진으로 정의했으므로 .pug 필요 x
                            hasProducts: products.length > 0,    // hasProducts: products.length > 0 -> handlebars 에서는 값만 전달 가능하기 떄문에 해당 키 추가해 줘야
                            activeShop: true,
                            productCSS: true,
                            layout: false 
        });    
                                                                                                 

    });
    
}; sec7까지 */

const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts =[];
      for (product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cart.products.find(prod => prod.id === product.id)){
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    })
  })
  
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
      Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart')
  })
  Cart.deleteProduct(prodId);
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
