describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#buttomTosign').click();
    cy.get('#Username').type("user@gmail.com");
    cy.get('#Password').type("12345678");
    cy.get('.bg-green-600').click();
    //add deleay here
    cy.wait(2000);
    cy.get('[href="/massage"]').click();
    cy.wait(2000);
    cy.visit('http://localhost:3000/mypoint')
  
    cy.wait(10000);

    cy.get(':nth-child(5) > .flex-row > .w-full > .justify-end > .MuiButtonBase-root').click();
    cy.wait(10000);
    cy.visit('http://localhost:3000/myreservation')
    cy.wait(2000);
        
    
    cy.get('#hospital').should('exist').should('be.visible').click()
    cy.get('[data-value="66014f1d3ab7a4db54e4f1ab"]').should('exist').should('be.visible').click().type('{enter}')
    cy.wait(3000)
    cy.get('.MuiFormControl-root > .MuiInputBase-root').type('05262021')
    cy.get('#coupon').should('exist').should('be.visible').click()
    cy.contains('% Maximum').click()
    cy.wait(3000)
    cy.get('.bg-green-600').click()
    cy.wait(5000)
    cy.get('.bg-gray-600').click()

  })
})