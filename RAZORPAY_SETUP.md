# Razorpay Payment Gateway Setup

## Quick Setup Guide

### Step 1: Create Razorpay Account
1. Go to [https://razorpay.com/](https://razorpay.com/)
2. Sign up for a free account
3. Complete the verification process

### Step 2: Get Test API Keys
1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to **Settings** → **API Keys**
3. Click on **Generate Test Key** (if you don't have one)
4. Copy your **Key ID** and **Key Secret**

### Step 3: Add Keys to Backend
1. Open `backend/.env` file
2. Replace the placeholder values:
   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_key_secret_here
   ```
3. Save the file
4. Restart your backend server

### Step 4: Test Payment
Use Razorpay test card details:
- **Card Number:** `4111 1111 1111 1111`
- **CVV:** Any 3 digits (e.g., `123`)
- **Expiry:** Any future date (e.g., `12/25`)
- **OTP:** `1234`

## Important Notes

- **Test Mode:** The keys starting with `rzp_test_` are for testing only
- **Live Mode:** For production, use keys starting with `rzp_live_`
- **Security:** Never commit your `.env` file to version control
- **Key Format:** 
  - Key ID: `rzp_test_xxxxxxxxxxxxx` (starts with rzp_test_)
  - Key Secret: Long alphanumeric string

## Troubleshooting

### Error: "Authentication failed"
- Check if keys are correctly set in `.env` file
- Ensure there are no extra spaces or quotes
- Verify keys are from the same Razorpay account (test/live)
- Restart backend server after updating `.env`

### Error: "Failed to create payment order"
- Verify Razorpay keys are valid
- Check backend console for detailed error messages
- Ensure backend server is running on port 5000

## Support
- Razorpay Documentation: [https://razorpay.com/docs/](https://razorpay.com/docs/)
- Razorpay Support: [https://razorpay.com/support/](https://razorpay.com/support/)
