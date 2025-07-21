describe('Add Multiple Products Test', () => {

  beforeEach(() => {
    cy.login("standard_user", "secret_sauce");
  });

  it("should add 2 items to the cart and verify contents", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    cy.get('.shopping_cart_badge').should('have.text', '2');
    cy.get('.inventory_item_name').eq(0).invoke('text').then((name1) => {
      cy.log("Product 1:", name1);
      console.log("Product 1:", name1);
    });

    cy.get('.inventory_item_name').eq(1).invoke('text').then((name2) => {
      cy.log("Product 2:", name2);
      console.log("Product 2:", name2);
    });

    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 2);
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('be.visible');
    cy.contains('.inventory_item_name', 'Sauce Labs Bike Light').should('be.visible');
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('have.css', 'color', 'rgb(226, 35, 26)');
  });

});
