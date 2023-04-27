describe('SwagLabs', () => {
  context('Login test', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/')
    })
    it('Failed Login', () => {
      cy.get('#user-name').type('usuario-invalido')
      cy.get('#password').type('senha-invalida')
      cy.get('#login-button').click()
      cy.get('[data-test=error]').should('exist')
    })

    it('Successful Login', () => {
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
      cy.url().should('include', '/inventory.html')
    })
  })

  context('Add 2 items and finish purchase', () => {

    it('Add 3 items to the cart', () => {
      cy.login('standard_user', 'secret_sauce')
      cy.get('.inventory_item').eq(0).find('.btn_primary').click()
      cy.get('.inventory_item').eq(1).find('.btn_primary').click()
      cy.get('.inventory_item').eq(2).find('.btn_primary').click()
      cy.get('.shopping_cart_badge').should('contain', '3')

      cy.get('.shopping_cart_link').click()
      cy.get('.cart_item').eq(0).find('.cart_button').click()
      cy.get('.cart_list').should('not.contain', 'Sauce Labs Backpack')

      cy.get('.checkout_button').click()
      cy.get('#first-name').type('John')
      cy.get('#last-name').type('Doe')
      cy.get('#postal-code').type('12345')
      cy.get('[data-test="continue"]').click()
      cy.get('[data-test="finish"]').click()
      cy.url().should('contain', 'checkout-complete')
      cy.get('.complete-header').should('contain', 'Thank you for your order!')
    })
  })
})