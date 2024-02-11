import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

const sendVerificationEmail = async (email, verificationToken) => {
  sgMail.setApiKey(process.env.API_KEY2);

  const msg = {
    to: `${email}`,
    from: 'cryptozeidun@gmail.com',
    subject: 'Verify your account',
    text: 'Copy and paste link on your browser or press link to verify your account',
    html: ` <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333333;">Witaj!</h2>
                <p style="color: #666666;">Thanks for creating account. To verify your account click in link below or copy paste in browser:</p>
                <p><a href="http://localhost:3000/api/users/verify/${verificationToken}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none;">http://localhost:3000/api/users/verify/${verificationToken}</a></p>
                <p style="color: #666666;">If you were not creating account, please ignore this message.</p>
                <p style="color: #666666;">Dziękujemy,<br>Team of Crypto</p>
            </div>`,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch(err => console.log(err));
};

export { sendVerificationEmail };
