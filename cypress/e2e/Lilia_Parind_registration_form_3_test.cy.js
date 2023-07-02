beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

//BONUS TASK: add visual tests for registration form 3


/*
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */

  describe('Section 1: visual tests', ()=> {
    
        
    it('Check that radio buttons list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
    })   


    it('Check that country dropdown is correct ', () => {
        //Get the length of array of elements in Country dropdown
        cy.get('#country').children().should('have.length', 4)
       
        //Check 4 elements in the country dropdown 
        cy.get('#country').select('')
        cy.get('#country').select('Spain')
        cy.get('#country').select('Estonia')
        cy.get('#country').select('Austria')
        
        
        //Selecting a country
        cy.get('#country').select('Spain')
        
        //Get the length of array of elements in Spain dropdown
        cy.get('#city').children().should('have.length', 5)
        //Check 5 elements in the Spain dropdown
        cy.get('#city').find('option').eq(0).should('not.have.text')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')
        
        
    })    

    it('Check the content of checkboxes and link', () => {

        cy.get('[type="checkbox"]').should('have.length', 2)
        cy.get('[type="checkbox"]').eq(1).check()
        cy.get('[type="checkbox"]').eq(1).next().should('have.text', 'Accept our cookie policy')
        
        //Verify that second checkbox has a link. 
        cy.get('[type="checkbox"]').eq(1).parent().find('a[href="cookiePolicy.html"]').should('exist');
    }) 

    it('This is a test to check email format', () => { 
        cy.get('[name="email"]').should('have.attr', 'type', 'email')
        cy.get('[name="email"]').type('lilitka@gmail.com')
  })

});

//BONUS TASK: add functional tests for registration form 3

describe('Section2: functional tests', () => {
    it('This is a test which fills all data in registration form 3 and submit', () => {
        cy.get('#name').clear().type('Lilia')
        cy.get('[name="email"').type('lilitka@gmail.com')
        cy.get('#country').select('Austria')
        cy.get('#city').select('Vienna')
        cy.contains('Date of birth').next().type('1986-08-01')
        cy.get('[value="Weekly"]').check()
        cy.get('#birthday').type('1986-08-01')
        cy.get('[type="checkbox"]').check()
        cy.get('[type="checkbox"]').first().check()
        cy.get('[type="submit"]').should('be.enabled')
        cy.get('[type="submit"]').last().click()
        cy.contains('Submission received').should('be.visible')
    });
    
    it('This is the test to fill in only mandatory fields and validate', () => {
        cy.get('#name').clear().type('Lilia')
        cy.get('[name="email"').type('lilitka@gmail.com')
        cy.get('#country').select('Austria')
        cy.get('#city').select('Vienna') 
        cy.contains('Date of birth').next().type('1986-08-01')
        cy.get('[value="Weekly"]').check()
        cy.get('[type="checkbox"]').first().check()
        cy.get('[type="submit"]').should('be.enabled')
        cy.get('[type="submit"]').last().click()
        cy.contains('Submission received').should('be.visible')
    });
    
    
});

  


