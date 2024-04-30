describe('template spec', () => {
    it('Sign-In', () => {
      cy.visit('http://localhost:3000')
  
      // Click the sign-in button
      cy.get('#buttomTosign').should('exist').should('be.visible').click()
  
      // Enter username and password
      cy.get('#Username').should('exist').should('be.visible').type('user@gmail.com')
      cy.get('#Password').should('exist').should('be.visible').type('12345678')
  
      // Click the sign-in button
      cy.get('.bg-green-600').should('exist').should('be.visible').click()
  
      // Verify navigation
      cy.url().should('not.include', '/auth/signIn?callbackUrl=http%3A%2F%2Flocalhost%3A3000')
  
      // Click on a link
      cy.get('[href="/massage"]').should('exist').should('be.visible').click()
      
  
      // Click on another link
      cy.get('[href="/massage/66014f1d3ab7a4db54e4f1ab"]').should('exist').should('be.visible').click()
  
      cy.wait(19000)
  
      // Perform another action
      cy.get('.p-3').should('exist').should('be.visible').click()
  
      cy.wait(3000)
  
      cy.get('.MuiButtonBase-root').should('exist').should('be.visible').click()
  
      cy.wait(3000)
  
      cy.reload()
  
      cy.wait(6000)
  
      cy.go(-1)

      cy.wait(19000)
  
      // cy.get('.p-2').should('exist').should('be.visible').click()
  
  
      // cy.get('[href="/myreservation"]').should('exist').should('be.visible').click()
  
      // cy.get('#\:r1o\:').type('05262021')
  
      // cy.get('#coupon').click()
  
    })
  })
  
  //shopowner@admin.com