class LoginPage {
  visit() {
    cy.visit('/');
  }

  fillUsername(username) {
    cy.get('[data-test="username"]').clear().type(username);
  }

  fillPassword(password) {
    cy.get('[data-test="password"]').clear().type(password);
  }

  clickLogin() {
    cy.get('[data-test="login-button"]').click();
  }

  assertErrorMessage(message) {
    cy.get('[data-test="error"]').should('contain.text', message);
  }
}

export default new LoginPage();
