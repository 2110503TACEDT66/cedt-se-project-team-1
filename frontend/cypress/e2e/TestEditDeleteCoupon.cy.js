describe('template spec', () => {
  // it("Test each ShopOwer can edit, delete and create new coupon separately for each Ower's Shop.", () => {
  //   cy.visit('http://localhost:3000/')
  //   cy.get('#buttomTosign').should('exist').contains('Sign-In').should('be.visible').click();
  //   cy.url().should('include', '/auth/signIn?callbackUrl=http%3A%2F%2Flocalhost%3A3000');
  //   cy.get('#Username').type('shopOwner1@admin.com');
  //   cy.get('#Password').type('123456');
  //   cy.get('.bg-green-600').click();
  //   cy.url().should('not.include', '/auth/signIn?callbackUrl=http%3A%2F%2Flocalhost%3A3000');
  //   cy.get('[href="/massage"]').should('exist').contains('Massage').should('be.visible').click();
  //   cy.get('[href="/massage"]').should('exist').click();
  //   cy.get('#massageitem6602f1e55275387a7855d32e').should('exist').click();
  //   cy.get(':nth-child(1) > .flex-row > .w-full > :nth-child(1) > .flex > :nth-child(1) > .rounded-md').should('exist').click();
  //   cy.get('#discount').then($input => {
  //     $input.get(0).select();
  //   }).type('55');
  //   cy.get('#coverage').then($input => {
  //     $input.get(0).select();
  //   }).type('100');
  //   cy.get('.MuiModal-root > .flex-col > .px-4').should('exist').click();
  //   cy.get(':nth-child(1) > .flex-row > .w-full > :nth-child(1) > .flex > :nth-child(2) > .rounded-md').should('exist').click();
  //   cy.get(':nth-child(3) > div > .rounded-md').should('exist').click();
  //   cy.get('.h-full > .MuiFormControl-root > .MuiInputBase-root').should('exist').type('10122024');
  //   cy.get('#discount').then($input => {
  //     $input.get(0).select();
  //   }).type('15');
  //   cy.get('#coverage').then($input => {
  //     $input.get(0).select();
  //   }).type('20');
  //   cy.get('#point').then($input => {
  //     $input.get(0).select();
  //   }).type('10');
  //   cy.get('.MuiModal-root > .flex-col > .px-4').click();
  //   })
  it("Test 2", () => {
    cy.visit('http://localhost:3000/')
    cy.get('#buttomTosign').should('exist').contains('Sign-In').should('be.visible').click();
    cy.get('#Username').type('shopOwner1@admin.com');
    cy.get('#Password').type('123456');
    cy.get('.bg-green-600').click();
    cy.url().should('not.include', '/auth/signIn?callbackUrl=http%3A%2F%2Flocalhost%3A3000');
    cy.get('[href="/mypoint"]').should('exist').contains('My point').should('be.visible').click();
    cy.wait(4000);
    cy.get(':nth-child(1) > .flex-row > .w-full > :nth-child(1) > .flex > :nth-child(1) > .rounded-md').click();
    cy.get('#discount').then($input => {
      $input.get(0).select();
    }).type('15');
    cy.get('.h-full > .MuiFormControl-root > .MuiInputBase-root').type('11222024');
    cy.get('#point').then($input => {
      $input.get(0).select();
    }).type('42');
    cy.get('#coverage').then($input => {
      $input.get(0).select();
    }).type('25');
    cy.get('#usableUserType').select('Member');
    cy.get('.flex-col > .px-4').click();
    // cy.get(':nth-child(1) > .flex-row > .w-full > :nth-child(1) > .flex > :nth-child(2) > .rounded-md').click();
    cy.get(':nth-child(5) > div > .rounded-md').click();
    cy.get('#massage-shop').select('Haven');
    cy.get('#discount').type('80');
    cy.get('#coverage').type('5');
    cy.get('.h-full > .MuiFormControl-root > .MuiInputBase-root').type('04222024');
    cy.get('#point').type('200');
    cy.get('.flex-col > .px-4').click();


    // cy.get('.flex-col > .px-4').click();
    // cy.get(':nth-child(1) > .flex-row > .w-full > :nth-child(1) > .flex > :nth-child(2) > .rounded-md').click();
    // cy.get(':nth-child(16) > div > .rounded-md').click();





  })
 
  
})