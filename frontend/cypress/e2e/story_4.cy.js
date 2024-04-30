describe('template spec', () => {
it('passes', () => {
    cy.visit('http://localhost:3000')

    cy.get('#buttomTosign').should('exist').should('be.visible').click()
    cy.get('#Username').should('exist').should('be.visible').type('user@gmail.com')
    cy.get('#Password').should('exist').should('be.visible').type('12345678')
    cy.get('.bg-green-600').should('exist').should('be.visible').click()

    cy.url().should('not.include', '/auth/signIn?callbackUrl=http%3A%2F%2Flocalhost%3A3000')

    cy.get('[href="/massage"]').should('exist').should('be.visible').click()
    cy.get('[href="/massage/66014f1d3ab7a4db54e4f1ab"]').should('exist').should('be.visible').click()
    cy.wait(19000)
    cy.get('.p-3').should('exist').should('be.visible').click()
    cy.wait(3000)

    cy.get('#JoinBtn').should('exist').should('be.visible').click()
    cy.wait(3000)
    cy.reload()
    cy.wait(6000)

    cy.go(-1)
    cy.wait(20000)
    cy.get(':nth-child(3) > .flex-row > .w-full > .justify-end > .MuiButtonBase-root').should('exist').should('be.visible').click()
    cy.get('[href="/myreservation"]').should('exist').should('be.visible').click()
    cy.wait(3000)

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

