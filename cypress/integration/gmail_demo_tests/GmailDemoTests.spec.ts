import '../../support/commands';
import {SendEmailData} from "../../fixtures/sendEmailData";

describe("Gmail Demo Tests Suite", () => {

    beforeEach(function() {
        cy.fixture('google_credentials/credentials.json').then((credentials: string) => {
            this.credentials = credentials;
        })

        cy.fixture('google_credentials/token.json').then((token: string) => {
            this.token = token;
        })
    })

    it("C1: Verify email Body and Subject texts ", function () {
        
        const sendEmailData = new SendEmailData();

        const user: string = sendEmailData.demoGmailAccountData.user;
        const pass: string = sendEmailData.demoGmailAccountData.pass;
        const from: string = sendEmailData.emailDataC1.from;
        const to: string = sendEmailData.emailDataC1.to;
        const subject: string = sendEmailData.emailDataC1.subject;
        const text: string = sendEmailData.emailDataC1.text;
        
        cy.task('sendMail', {user, pass, from, to, subject, text});

        cy.wait(2000);
        
        cy.getAccessTokenFromRefreshTokenGoogle(this.credentials.installed.client_id, this.credentials.installed.client_secret, this.token.refresh_token)
        .then((response) => {
            expect(response.body.access_token).to.exist;
            let token: string = response.body.access_token;

            cy.listMessagesInGoogleAccount("davit.mkhitaryan.testprofile@gmail.com", token).then((response) => {
                expect(response.body.messages[0]).to.exist;
                let msgId = response.body.messages[0].id;

                cy.getGmail("davit.mkhitaryan.testprofile@gmail.com", msgId, token).then((response) => {
                    expect(response.body.id).to.eq(msgId);

                    expect(response.body.payload.headers[5].value).to.eq(sendEmailData.emailDataC1.subject);
                    expect(response.body.snippet).to.eq(sendEmailData.emailDataC1.text);
                })
            })
        })
    })

    it("C2: Verify To and From fields", function () {
        
        const sendEmailData = new SendEmailData();

        const user: string = sendEmailData.demoGmailAccountData.user;
        const pass: string = sendEmailData.demoGmailAccountData.pass;
        const from: string = sendEmailData.emailDataC2.from;
        const to: string = sendEmailData.emailDataC2.to;
        const subject: string = sendEmailData.emailDataC2.subject;
        const text: string = sendEmailData.emailDataC2.text;
        
        cy.task('sendMail', {user, pass, from, to, subject, text});

        cy.wait(2000);
        
        cy.getAccessTokenFromRefreshTokenGoogle(this.credentials.installed.client_id, this.credentials.installed.client_secret, this.token.refresh_token)
        .then((response) => {
            expect(response.body.access_token).to.exist;
            let token: string = response.body.access_token;

            cy.listMessagesInGoogleAccount("davit.mkhitaryan.testprofile@gmail.com", token).then((response) => {
                expect(response.body.messages[0]).to.exist;
                let msgId = response.body.messages[0].id;

                cy.getGmail("davit.mkhitaryan.testprofile@gmail.com", msgId, token).then((response) => {
                    expect(response.body.id).to.eq(msgId);
                    
                    expect(response.body.payload.headers[3].value).to.eq(sendEmailData.emailDataC2.to);
                    expect(response.body.payload.headers[4].value).to.eq(sendEmailData.emailDataC2.from);
                })
            })
        })
    })

    it("C3: Verify SENT and INBOX labels", function () {
        
        const sendEmailData = new SendEmailData();

        const user: string = sendEmailData.demoGmailAccountData.user;
        const pass: string = sendEmailData.demoGmailAccountData.pass;
        const from: string = sendEmailData.emailDataC3.from;
        const to: string = sendEmailData.emailDataC3.to;
        const subject: string = sendEmailData.emailDataC3.subject;
        const text: string = sendEmailData.emailDataC3.text;
        
        cy.task('sendMail', {user, pass, from, to, subject, text});

        cy.wait(2000);
        
        cy.getAccessTokenFromRefreshTokenGoogle(this.credentials.installed.client_id, this.credentials.installed.client_secret, this.token.refresh_token)
        .then((response) => {
            expect(response.body.access_token).to.exist;
            let token: string = response.body.access_token;

            cy.listMessagesInGoogleAccount("davit.mkhitaryan.testprofile@gmail.com", token).then((response) => {
                expect(response.body.messages[0]).to.exist;
                let msgId = response.body.messages[0].id;

                cy.getGmail("davit.mkhitaryan.testprofile@gmail.com", msgId, token).then((response) => {
                    expect(response.body.id).to.eq(msgId);
                    
                    expect(response.body.labelIds[1]).to.eq("SENT");
                    expect(response.body.labelIds[2]).to.eq("INBOX");
                })
            })
        })
    })

    it("C4: Verify sending email to a non-existing email address", function () {
        
        const sendEmailData = new SendEmailData();

        const user: string = sendEmailData.demoGmailAccountData.user;
        const pass: string = sendEmailData.demoGmailAccountData.pass;
        const from: string = sendEmailData.emailDataC4.from;
        const to: string = sendEmailData.emailDataC4.to;
        const subject: string = sendEmailData.emailDataC4.subject;
        const text: string = sendEmailData.emailDataC4.text;
        
        cy.task('sendMail', {user, pass, from, to, subject, text});

        cy.wait(5000);
        
        cy.getAccessTokenFromRefreshTokenGoogle(this.credentials.installed.client_id, this.credentials.installed.client_secret, this.token.refresh_token)
        .then((response) => {
            expect(response.body.access_token).to.exist;
            let token: string = response.body.access_token;

            cy.listMessagesInGoogleAccount("davit.mkhitaryan.testprofile@gmail.com", token).then((response) => {
                expect(response.body.messages[0]).to.exist;
                let msgId = response.body.messages[0].id;

                cy.getGmail("davit.mkhitaryan.testprofile@gmail.com", msgId, token).then((response) => {
                    expect(response.body.snippet).to.contain("Address not found");
                    expect(response.body.payload.headers[22].value).to.eq("Mail Delivery Subsystem <mailer-daemon@googlemail.com>");
                    expect(response.body.labelIds[1]).to.eq("CATEGORY_UPDATES");
                })
            })
        })
    })
})