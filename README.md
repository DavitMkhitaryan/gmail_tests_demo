# Gmail Demo Tests Suite Project 

This is a demo test suite project for testing gmail functionality. As Google blocks/restricts automation on Gmail UI making testing at the UI level at least not desireable, the tests are done fully on the API Level.

- Nodemailer was used for sending emails to a real gmail account - https://github.com/nodemailer/nodemailer.
- Gmail Tester was used for retrieving emails and checking specific email data from a real gmail account - https://github.com/levz0r/gmail-tester.
- Mochawesome reporter was used for reporting - https://www.npmjs.com/package/mochawesome
- Personal test gmail account: davit.mkhitaryan.testprofile@gmail.com is used by default for demonstration. Follow the instructions below to run tests using the needed gmail account.
- Test Cases can be found using the following TestRail Link - https://dmdemo.testrail.io/index.php?/suites/view/1 (Credentials will be sent privately)

# Steps to setup the project and run tests (using default Gmail account already set up for demonstration):

- Clone the project 
- Install dependencies by using `npm i` command
- Run the tests using `npm test` command
- Generate HTML report using `npm run generate:html:report` command

# Steps to setup the project and run tests (using the desired Gmail account):
- Clone the project 
- Install dependencies by using `npm i` command
- Use the instructions in https://github.com/levz0r/gmail-tester or https://support.google.com/cloud/answer/6158849 to create a project in Google Cloud, activate Gmail API, create OAuth client ID and download "credentials.json" file.
- Replace the "credentials.json" file in "fixtures/google_credentials" folder with your "credentials.json" file
- Make sure to have `        "redirect_uris": [
            ["urn:ietf:wg:oauth:2.0:oob"]
        ]` the following code in the "credentials.json" file
- Run `node <node_modules>/gmail-tester/init.js <path-to-credentials.json> <path-to-token.json> <target-email>` where `<path-to-token.json` will be generated if does not exist. Give the path to token.json file in the same "fixtures/google_credentials" folder
- For more detailed information for setting up gmail-tester, see https://github.com/levz0r/gmail-tester
- Modify "fixtures/sendEmailData.ts" file with the corresponding test data
- Run the tests using `npm test` command
- Generate HTML report using `npm run generate:html:report` command





