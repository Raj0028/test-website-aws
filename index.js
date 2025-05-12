import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static frontend files
app.use(express.json()); // For parsing JSON POST body


// Email endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,        // your Gmail
      pass: process.env.EMAIL_PASS,        // app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'team@servicedigitalmarketing.com',
    subject: `Contact Form Submission: ${subject}`,
    text: `You have a new message:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email send to ${mailOptions.to} from ${mailOptions.from}`);
    
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});


app.post('/api/quote', async (req, res) => {
    const { fullName, email, countryCode, mobile, budget, purpose, message } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'team@servicedigitalmarketing.com',
      subject: `Quote Request from ${fullName}`,
      text: `
        Full Name: ${fullName}
        Email: ${email}
        Country Code: ${countryCode}
        Mobile: ${mobile}
        Budget: ${budget}
        Purpose: ${purpose}
        Message: ${message}
            `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
    console.log(`Email send to ${mailOptions.to} from ${mailOptions.from}`);
      res.status(200).json({ message: 'Quote sent successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to send quote email' });
    }
});
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
