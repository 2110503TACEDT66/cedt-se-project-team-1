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
    cy.visit('http://localhost:3000/massage/66014f1d3ab7a4db54e4f1ab/')
    cy.get('.p-3').click();
    cy.wait(4000);
    // cy.get('#JoinBtn').click();
    // cy.wait(2000);
    // cy.reload();
    cy.visit('http://localhost:3000/massage/66014f1d3ab7a4db54e4f1ab/')
  })
})