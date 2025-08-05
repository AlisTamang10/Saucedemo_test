import loginPage from '../pages/loginPage';

describe('Login Spec', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('should login with valid credentials', () => {
    loginPage.fillUsername('standard_user');
    loginPage.fillPassword('secret_sauce');
    loginPage.clickLogin();
    cy.url().should('include', '/inventory');
    cy.get('.app_logo').should('be.visible');
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
  });

  it('should not login with invalid credentials', () => {
    loginPage.fillUsername('invalid_user');
    loginPage.fillPassword('wrong_pass');
    loginPage.clickLogin();
    loginPage.assertErrorMessage('Username and password do not match');
    cy.get('[data-test="login-button"]').should('exist');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
