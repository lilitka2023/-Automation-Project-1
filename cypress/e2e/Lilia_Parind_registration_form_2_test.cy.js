beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {
it('User can use only same both first and validation passwords', () => {
    //Fill in different values in the password and confirmation password fields.
    cy.get('#username').type('Summer')
    cy.get('[id="email"]').type('lilitka@gmail.com')
    cy.get('[name="name"]').type('Lilia')
    cy.get('#lastName').type('Parind')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('input[name="password"]').type('Lilitka123')
    cy.get('[name="confirm"]').type('Lilitka321')
    cy.get('h2').contains('Password').click()
    cy.get('.submit_button').should('be.disabled')
    cy.get('#success_message').should('not.be.visible')
    cy.get('#password_error_message').should('be.visible')
    
    })

it('User can use only same both first and validation passwords', () => {
    //Same values in the password and confirmation lassord fields. 
    cy.get('#username').type('Summer')
    cy.get('[id="email"]').type('lilitka@gmail.com')
    cy.get('[name="name"]').type('Lilia')
    cy.get('#lastName').type('Parind')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('input[name="password"]').type('Lilitka123')
    cy.get('[name="confirm"]').type('Lilitka123')
    cy.get('h2').contains('Password').click()
    cy.get('.submit_button').should('be.enabled')
    cy.get('.submit_button').click()
    cy.get('#success_message').should('be.visible')
    })

it('User can submit form with all fields added', ()=>{
    // Add test steps for filling in ALL fields
    cy.get('#username').type('Summer')
    cy.get('[id="email"]').type('lilitka@gmail.com')
    cy.get('[name="name"]').type('Lilia')
    cy.get('#lastName').type('Parind')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#htmlFavLanguage').type('HTML')
    cy.get('#vehicle1').type('Bike')
    cy.get('#cars').type('Audi')
    cy.get('#animal').type('horse')
    cy.get('input[name="password"]').type('Lilitka123')
    cy.get('[name="confirm"]').type('Lilitka123')
    // Assert that submit button is enabled
    cy.get('h2').contains('Password').click()
    cy.get('.submit_button').should('be.enabled')
    // Assert that after submitting the form system show successful message
    cy.get('.submit_button').click()
    cy.get('#success_message').should('be.visible')
    })

it('User can submit form with valid data and only mandatory fields added', ()=>{
    // Test steps for filling in ONLY mandatory fields
    cy.get('#username').type('Summer')
    cy.get('[id="email"]').type('lilitka@gmail.com')
    cy.get('[name="name"]').type('Lilia')
    cy.get('#lastName').type('Parind')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('input[name="password"]').type('Lilitka123')
    cy.get('[name="confirm"]').type('Lilitka123')
     // Assert that submit button is enabled
    cy.get('h2').contains('Password').click()
    cy.get('.submit_button').should('be.enabled')
    // Assert that after submitting the form system shows successful message
    cy.get('.submit_button').click()
    cy.get('#success_message').should('be.visible')
    }) 

    it('Submit button is not enabled when username is not present', () => {
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })

    it('Submit button is not enabled when firstName is absent', () => {
        cy.get('[name="name"]').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })

    it('Submit button is not enabled when lastName is absent', () => {
        cy.get('#lastName').type('Parind') 
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })
});
/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    

    it('Check that cypress logo is correct and has correct size', () => {
        cy.log('Will check cypress logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height, to be equal 88
        cy.get('img').invoke('height').should('be.lessThan', 200)
            .and('be.greaterThan', 70)
        cy.get('img').invoke('width').should('be.equal', 178)
             
    })

    
    it('Check navigation part 2', () => {
        cy.get('nav').children().should('have.length', 2)

        //Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        //Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()
        
        //Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/')
        
        //Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })
    

    
    it('Check that checkbox list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat').and('not.be.checked')

        // Check that all 3 checkboxes can be selected simultaneously
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')
    })


    
    it('Check that Animal dropdown is correct ', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#animal').select(1).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')

        //Get the length of array of elements in Animal dropdown
        cy.get('#animal').children().should('have.length', 6)
       
        //Check  that first element in the dropdown has text Dog
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        
        //Check the content of the Animal dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'spider', 'mouse'])
        })
    })

 

})

it('User can use only same both first and validation passwords', () => {
    // Add test steps for filling in only mandatory fields
    // Type confirmation password which is different from first password
    // Assert that submit button is not enabled
    // Assert that successful message is not visible
    // Assert that error message is visible
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('ByPass')
    cy.get('h2').contains('Password').click()
    cy.get('.submit_button').should('not.be.enabled')
    cy.get('#success_message').should('not.be.visible')
    cy.get('#password_error_message').should('have.css', 'display')
})

it('User can submit form with all fields added', () => {
    // Add test steps for filling in ALL fields
    // Assert that submit button is enabled
    // Assert that after submitting the form system show successful message
    // Add test steps for filling in ALL fields
    cy.get('#username').type('suvakasutaja')
    cy.get('#email').type('test@test123.fi')
    cy.get('[data-cy="name"]').type('Simmo')
    cy.get('#lastName').type('Paidest')
    cy.get('[data-testid="phoneNumberTestId"]').type('56565677')
    cy.get('#javascriptFavLanguage').click()
    cy.get('#vehicle1').click()
    cy.get('#vehicle2').click()
    cy.get('#vehicle3').click()
    cy.get('#cars').select('saab')
    cy.get('#animal').select('cat')
    cy.get('#password').type('salas6na')
    cy.get('#confirm').type('salas6na')
    // Assert that submit button is enabled
    cy.get('h2').contains('Password').click()
    cy.get('.submit_button').should('be.enabled')
    cy.get('.submit_button').click()
    // Assert that after submitting the form system show successful message
    cy.get('#success_message').should('contain', 'User successfully submitted registration')
})

it('User can submit form with valid data and only mandatory fields added', () => {
    // Add test steps for filling in ONLY mandatory fields
    cy.get('#username').type('suvakasutaja')
    cy.get('#email').type('test@test123.fi')
    cy.get('[data-cy="name"]').type('Simmo')
    cy.get('#lastName').type('Paidest')
    cy.get('[data-testid="phoneNumberTestId"]').type('56565677')
    cy.get('#password').type('salas6na')
    cy.get('#confirm').type('salas6na')
    // Assert that submit button is enabled
    cy.get('h2').contains('Password').click()
    cy.get('.submit_button').should('be.enabled')
    cy.get('.submit_button').click()
    // Assert that after submitting the form system shows successful message
    cy.get('#success_message').should('contain', 'User successfully submitted registration')
})

it('User can NOT submit form unless all mandatory fields are filled', () => {
    inputValidData('john.doe')
    cy.get('#confirm').clear();
    cy.get('h2').contains('Password').click()
    cy.get('.submit_button').should('be.disabled')
    cy.get('#success_message').should('not.be.visible')
})


    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })
    it('Check that second logo is correct and has correct size', () => {
        cy.log('Will check second logo source and size')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element for second picture and check its parameter height, to be equal 88
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('eq', 88);
    })

    // Create similar test for checking second link to Cerebrum Hub homepage
    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        // Check that URL to Cerebrum Hub page is correct and clickable
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()
        // Check that the URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/')
        cy.go('back')
    })
    it.only('Check that checkbox list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat').and('not.be.checked')
        // Marking the first checkbox as checked and assert its state
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        // Marking the second checkbox as checked and asserting the state of the first and second checkboxes
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })
    it('Animals dropdown is correct', () => {
        // Verify that the animal dropdown has six choices.
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        // Verify all values in the dropdown
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
    })
    it('User can submit form with all fields added', ()=>{
        inputValidData()
        inputNonMandatory()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible');
    })
    it.only('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()
        cy.url().should('contain', 'https://cerebrumhub.com/')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })
