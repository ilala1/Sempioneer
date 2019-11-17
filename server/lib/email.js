const sendInBlue = require('sib-api-v3-sdk');

exports.sendEmail = async (to, subject, html) => {
    // Initialise send in blue
    const sibClient = sendInBlue.ApiClient.instance;
    const sibApiKey = sibClient.authentications['api-key'];

    sibApiKey.apiKey = process.env.EMAIL_API_KEY;

    const sibApi = new sendInBlue.SMTPApi();

    let sibSmtpEmail = new sendInBlue.SendSmtpEmail();

    // Send email
    sibSmtpEmail = {
        sender: {
            name: process.env.EMAIL_FROM_NAME,
            email: process.env.EMAIL_FROM_EMAIL,
        },
        to,
        subject,
        htmlContent: html,
    };

    let send;

    try {
        send = await sibApi.sendTransacEmail(sibSmtpEmail);
    } catch (err) {
        return { error: err };
    }

    return { success: send };
};
