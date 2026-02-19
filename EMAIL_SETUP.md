# Email Setup Guide for Contact Form

## Gmail Setup (Recommended)

### Step 1: Enable 2-Step Verification
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", enable **2-Step Verification**
4. Follow the setup process

### Step 2: Generate App Password
1. Still in **Security** settings
2. Scroll down to "Signing in to Google"
3. Click on **App passwords** (you may need to search for it)
4. Select **Mail** as the app
5. Select **Other (Custom name)** and enter "Gym Contact Form"
6. Click **Generate**
7. Copy the 16-character password (you'll see it only once)

### Step 3: Configure Backend
1. Open `backend/.env` file
2. Add/Update these lines:
   ```
   EMAIL_USER=cstechsv2531@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   CONTACT_EMAIL=cstechsv2531@gmail.com
   ```
3. Replace `xxxx xxxx xxxx xxxx` with your App Password (remove spaces)
4. Save the file
5. Restart your backend server

## Alternative: Other Email Providers

### Outlook/Hotmail
```env
EMAIL_USER=your_email@outlook.com
EMAIL_PASSWORD=your_password
CONTACT_EMAIL=your_email@outlook.com
```

Update `backend/routes/contact.js`:
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

### Custom SMTP Server
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.yourdomain.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## Testing

1. Start backend server: `npm run dev` (in backend folder)
2. Fill out the contact form on the website
3. Check your email inbox (cstechsv2531@gmail.com)
4. You should receive:
   - **Email to gym:** Contact form message with sender details
   - **Email to sender:** Confirmation that message was received

## Troubleshooting

### Error: "Email authentication failed"
- Make sure you're using App Password, not regular password
- Verify 2-Step Verification is enabled
- Check that EMAIL_USER and EMAIL_PASSWORD are correct in .env

### Error: "Failed to send message"
- Check backend console for detailed error
- Verify email credentials are correct
- Ensure backend server is running
- Check internet connection

### Emails going to spam
- This is normal for automated emails
- Check spam/junk folder
- Consider using a professional email service for production

## Security Notes

- **Never commit** `.env` file to version control
- App Passwords are safer than regular passwords
- Use environment variables for all sensitive data
- Consider using a dedicated email account for the website
