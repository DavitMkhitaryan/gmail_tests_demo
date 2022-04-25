export class EmailSender {

    public static sendAnEmail = (user: string, pass: string, from: string, to: string, subject: string, text: string) => {

        const nodemailer = require('nodemailer');

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass: pass
            }
        });

        const email = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            //html: '<b>Hello world</b>'
        };

        transporter.sendMail(email, function (error: any, info: any) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}



