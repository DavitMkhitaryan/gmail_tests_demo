/// <reference types="cypress" />

import { EmailSender } from "../../utils/emailSender";

module.exports = (on, config) => {
  on('task', {
    sendMail({user, pass, from, to, subject, text}) {
      EmailSender.sendAnEmail(user, pass, from, to, subject, text);
      return null;
    }
  })
}
