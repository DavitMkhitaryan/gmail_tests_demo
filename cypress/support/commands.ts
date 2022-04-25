// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="cypress" />


Cypress.Commands.add("getAccessTokenFromRefreshTokenGoogle", (clientID: string, clientSecret: string, refreshToken: string) => {

    return cy.request( {
        "method": "POST",
        "url": "https://accounts.google.com/o/oauth2/token",
        "body" :{
            "client_id" : clientID,
            "client_secret" : clientSecret,
            "refresh_token" : refreshToken,
            "grant_type" : "refresh_token" 
        }
    });
});

Cypress.Commands.add("listMessagesInGoogleAccount",(userId,token)=>{

    return cy.request( {
        "method": "GET",
        "url":  "https://gmail.googleapis.com/gmail/v1/users/"+userId+"/messages",
        "headers" :{
            "Authorization" : "Bearer "+ token
        }
    });
});

Cypress.Commands.add("getGmail", (userId,msgId,token)=>{
    return cy.request({
        "method": "GET",
        "url": "https://gmail.googleapis.com/gmail/v1/users/"+userId+"/messages/"+msgId,
        "headers" :{
            "Authorization" : "Bearer "+ token
        }
    });
});