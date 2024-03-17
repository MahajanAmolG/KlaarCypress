export class credentials{
    username(){
        cy.get('input[name="txtUsername"]').type('Admin');
    }
    password(){
        cy.get('input[name="txtPassword"]').type('SyN6Ktl@O0');
    }
    Login(){
        cy.get('button[type="submit"]').click(); 
    }
}