/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
       getAccessTokenFromRefreshTokenGoogle(clientID: string,clientSecret: string,refreshToken: string): Chainable<Response<any>>;
       listMessagesInGoogleAccount(userId: string, token: string): Chainable<Response<any>>;
       getGmail(userId: string, msgId: string, token: string): Chainable<Response<any>>;
    }
  }