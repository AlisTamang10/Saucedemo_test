 it.only('should login with valid email and password', () => {
 cy.fixture("login").then((userData) => {
  cy.login(userData.username, userData.password);
   })
   cy.url().should('include', '/inventory.html');
   cy.contains("Products").should("be.visible")
   cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
   cy.get('[data-test="remove-sauce-labs-backpack"]').should('have.css','color','rgb(226, 35, 26)')
 })

 it('should not login with invalid email and pass' ,() =>{
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type("seeecret_sacue")
    cy.get('[data-test="password"]').type("admin")
    cy.get('[data-test="login-button"]').click();
    cy.contains("Epic sadface: Username and password do not match any user in this service").should("be.visible")
  })
