import loginPage from '../pages/loginPage.js';
import productPage from '../pages/productPage.js';

// const loginPage = new LoginPage();
// const productPage = new ProductPage();

describe('Assignment 1 - Product Page Tests', () => {
  beforeEach(() => {
    loginPage.visit();
    loginPage.fillUsername('standard_user');
    loginPage.fillPassword('secret_sauce');
    loginPage.clickLogin();

    cy.url().should('include', '/inventory');
  });

  it('should add all products to cart and verify badge count, then remove all and verify badge is gone', () => {
    productPage.addAllProductsToCart();

    productPage.addToCartButtons.then(($btns) => {
      const productCount = $btns.length;
      productPage.verifyCartBadgeCount(productCount);

      productPage.removeAllProductsFromCart();
      productPage.verifyCartBadgeCount(0);
    });
  });

  it('should sort products by Price (high to low) correctly', () => {
    productPage.selectSortOption('Price (high to low)');
    productPage.verifyPriceSortedHighToLow();
  });

  it('should sort products by Name (A to Z) correctly', () => {
    productPage.selectSortOption('Name (A to Z)');
    productPage.verifyNameSortedAToZ();
  });
});