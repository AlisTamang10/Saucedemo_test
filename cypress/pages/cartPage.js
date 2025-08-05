class CartPage {
  goToCart() {
    cy.get('.shopping_cart_link').click();
  }

  assertProductInCart(productName) {
    cy.get('.cart_item .inventory_item_name').invoke('text').should('include', productName);
  }

  proceedToCheckout() {
    cy.get('[data-test="checkout"]').click();
  }

  fillCheckoutForm(first = '', last = '', zip = '') {
    if (first) {
      cy.get('[data-test="firstName"]').type(first);
    }

    if (last) {
      cy.get('[data-test="lastName"]').type(last);
    }

    if (zip) {
      cy.get('[data-test="postalCode"]').type(zip);
    }

    cy.get('[data-test="continue"]').click();
  }

  assertError(message) {
    cy.get('[data-test="error"]').should('contain.text', message);
  }

  assertProductInOverview(productName) {
    cy.get('.inventory_item_name').should('contain.text', productName);
  }
}

export default new CartPage();