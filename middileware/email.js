const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});
module.exports.sendEmail = async (userObj) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'sending a mail using node js',
            text: `user_name: ${userObj.email}, user_name: ${userObj.name}, user_mob: ${userObj.mob}, user_body: ${userObj.body} `
        };

        await transporter.sendMail(mailOptions);
        // return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

