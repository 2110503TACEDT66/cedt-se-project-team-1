describe('template spec', () => {
  // it('passes', () => {
  //   cy.visit('http://localhost:3000/')
  // // })
  // // it('check page is loaded correctly', () => {
  // //   cy.visit('http://localhost:3000/')
  // //   cy.get('body').should('be.visible');
  //   })
  it("Test each ShopOwer can edit, delete and create new coupon separately for each Ower's Shop.", () => {
    cy.visit('http://localhost:3000/')
    cy.get('#buttomTosign').should('exist').contains('Sign-In').should('be.visible').click();
    cy.url().should('include', '/auth/signIn?callbackUrl=http%3A%2F%2Flocalhost%3A3000');
    cy.get('#Username').type('shopOwner1@admin.com');
    cy.get('#Password').type('123456');
    cy.get('.bg-green-600').click();
    cy.url().should('not.include', '/auth/signIn?callbackUrl=http%3A%2F%2Flocalhost%3A3000');
    cy.get('[href="/massage"]').should('exist').contains('Massage').should('be.visible').click();
    cy.get('[href="/massage"]').should('exist').click();
    cy.get('#massageitem6602f1e55275387a7855d32e').should('exist').click();
    cy.get(':nth-child(1) > .flex-row > .w-full > :nth-child(1) > .flex > :nth-child(1) > .rounded-md').should('exist').click();
    cy.get('#discount').clear().type('5');
    cy.get('#coverage').clear().type('10');
    cy.get('.MuiModal-root > .flex-col > .px-4').should('exist').click();
    cy.get(':nth-child(1) > .flex-row > .w-full > :nth-child(1) > .flex > :nth-child(2) > .rounded-md').should('exist').click();
    cy.get(':nth-child(3) > div > .rounded-md').should('exist').click();
    cy.get('.h-full > .MuiFormControl-root > .MuiInputBase-root').should('exist').type('10122024');
    cy.get('#discount').clear().type('1');
    cy.get('#coverage').clear().type('2');
    cy.get('#point').clear().type('5');
    cy.get('.MuiModal-root > .flex-col > .px-4').click();
    })
 
  
})