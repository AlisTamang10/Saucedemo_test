

class ProductPage {
  get sortDropdown() {
    return cy.get('.product_sort_container');
  }

  get productPrices() {
    return cy.get('.inventory_item_price');
  }

  get productNames() {
    return cy.get('.inventory_item_name');
  }

 get addToCartButtons() {
  return cy.get('.inventory_item').find('button').contains('Add to cart');
}

get removeButtons() {
  return cy.get('.inventory_item').find('button').contains('Remove');
}

  get shoppingCartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  selectSortOption(optionText) {
    this.sortDropdown.select(optionText);
  }

  verifyPriceSortedHighToLow() {
    this.productPrices.then(($prices) => {
      const priceTexts = Cypress._.map($prices, p => p.innerText);
      const onlyDigits = str => str.replace(/[^0-9.]/g, '');
      const digits = priceTexts.map(onlyDigits);
      const numbers = digits.map(parseFloat);
      const sortedLowToHigh = Cypress._.sortBy(numbers);
      const sortedHighToLow = sortedLowToHigh.slice().reverse();

      expect(numbers).to.deep.equal(sortedHighToLow);
    });

    
    cy.get('.inventory_item_price').should('have.length.greaterThan', 0);
    cy.get('.product_sort_container').should('have.value', 'hilo');
  }

  verifyNameSortedAToZ() {
    this.productNames.then(($names) => {
      const names = Cypress._.map($names, el => el.innerText);
      const sortedNames = [...names].sort();

      expect(names).to.deep.equal(sortedNames);
    });

   
    cy.get('.inventory_item_name').should('have.length.greaterThan', 0);
    cy.get('.product_sort_container').should('have.value', 'az');
  }

  addAllProductsToCart() {
    this.addToCartButtons.then(($buttons) => {
      for (let i = 0; i < $buttons.length; i++) {
        cy.wrap($buttons[i]).click();
        cy.wait(100);
      }
    });
  }

  removeAllProductsFromCart() {
    this.removeButtons.then(($buttons) => {
      for (let i = 0; i < $buttons.length; i++) {
        cy.wrap($buttons[i]).click();
        cy.wait(100);
      }
    });
  }

  verifyCartBadgeCount(expectedCount) {
    if (expectedCount === 0) {
      this.shoppingCartBadge.should('not.exist');
    } else {
      this.shoppingCartBadge.should('have.text', expectedCount.toString());
    }
  }
}

export default new ProductPage();