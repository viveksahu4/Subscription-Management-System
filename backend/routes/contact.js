const express = require('express');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'cstechsv2531@gmail.com',
      pass: process.env.EMAIL_PASSWORD || '', // App password required for Gmail
    },
  });
};

// POST /api/contact - Send contact form email
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;
    const recipientEmail = process.env.CONTACT_EMAIL || 'cstechsv2531@gmail.com';

    // Create transporter
    const transporter = createTransporter();

    // Email content for gym owner
    const mailOptions = {
      from: process.env.EMAIL_USER || 'cstechsv2531@gmail.com',
      to: recipientEmail,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c1121f;">New Contact Form Message</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #c1121f;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #666; font-size: 12px;">
            This message was sent from The CStech Gym contact form.
          </p>
        </div>
      `,
      replyTo: email, // So you can reply directly to the sender
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Optional: Send confirmation email to the sender
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER || 'cstechsv2531@gmail.com',
      to: email,
      subject: 'Thank you for contacting The CStech Gym',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c1121f;">Thank you for contacting us!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you soon.</p>
          <p>Your message:</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p>Best regards,<br><strong>The CStech Gym Team</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            LPU Unimall, 7P44+855, Phagwara, Punjab - 144411<br>
            Phone: 8966977389, 9981068683<br>
            Email: cstechsv2531@gmail.com
          </p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(confirmationMailOptions);
    } catch (confirmationError) {
      console.log('Confirmation email failed (non-critical):', confirmationError.message);
    }

    res.json({ 
      message: 'Message sent successfully! We will get back to you soon.',
      success: true 
    });
  } catch (err) {
    console.error('Email sending error:', err);
    
    // Provide helpful error messages
    if (err.code === 'EAUTH') {
      return res.status(500).json({ 
        message: 'Email authentication failed. Please configure email credentials in .env file.',
        error: 'Email configuration error'
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later or contact us directly.',
      error: err.message 
    });
  }
});

module.exports = router;
