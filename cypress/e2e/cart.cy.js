import loginPage from '../pages/loginPage';
import productPage from '../pages/productPage';
import cartPage from '../pages/cartPage';

describe('Cart Spec', () => {
  beforeEach(() => {
    // Log in and add all products before each test
    loginPage.visit();
    loginPage.fillUsername('standard_user');
    loginPage.fillPassword('secret_sauce');
    loginPage.clickLogin();

    productPage.addAllProductsToCart();
    cartPage.goToCart();
  });

  it('Ensure added product is in the cart', () => {
    cartPage.assertProductInCart('Sauce Labs Backpack');

    cy.get('.cart_item').should('have.length.at.least', 1);
    cy.get('.inventory_item_price').first().invoke('text').should('contain', '$');
    cy.get('.cart_quantity').first().should('have.text', '1');
  });

  it('Checkout with empty fields shows error', () => {
    cartPage.proceedToCheckout();
    cartPage.fillCheckoutForm(); // leave fields empty
    cartPage.assertError('Error: First Name is required');

    cy.get('[data-test="error"]').should('be.visible');
    cy.url().should('include', 'checkout-step-one');
    cy.get('[data-test="continue"]').should('exist');
  });

  it('Go to Checkout overview and assert product is there with multiple assertions', () => {
    cartPage.proceedToCheckout();
    cartPage.fillCheckoutForm('John', 'Doe', '12345');

    cy.url().should('include', 'checkout-step-two');
    cartPage.assertProductInOverview('Sauce Labs Backpack');
    cy.get('.cart_quantity').first().should('have.text', '1');
    cy.get('.summary_total_label').invoke('text').should('include', 'Total');
  });
});
