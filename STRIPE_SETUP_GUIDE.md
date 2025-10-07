# 🔐 Stripe Subscription Setup Guide

## Complete setup for your €1.99/month subscription

---

## Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Click "Start now" and create your account
3. Complete the account verification process

---

## Step 2: Get Your API Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)
3. Keep these keys safe - you'll need them in Step 5

---

## Step 3: Create Your Product and Price

1. Go to https://dashboard.stripe.com/test/products
2. Click **"Add product"**
3. Fill in the details:
   - **Name**: "My Contacts Pro Plan" (or your preferred name)
   - **Description**: "Monthly subscription for unlimited contacts management"
   - **Pricing**: Select "Recurring"
   - **Price**: 1.99
   - **Currency**: EUR
   - **Billing period**: Monthly
4. Click **"Save product"**
5. After saving, you'll see a **Price ID** (starts with `price_`)
6. **Copy this Price ID** - you'll need it in Step 5

---

## Step 4: Set Up Webhook (for subscription events)

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click **"Add endpoint"**
3. Enter your endpoint URL:
   ```
   http://localhost:3000/api/webhooks/stripe
   ```
   *(For production, use your actual domain)*
4. Click **"Select events"** and choose:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Click **"Add endpoint"**
6. After creation, click on the webhook to reveal the **Signing secret** (starts with `whsec_`)
7. **Copy this Signing secret** - you'll need it in Step 5

## Step 5: Configure Environment Variables

1. In your project root, create a file named `.env.local` (if it doesn't exist)
2. Add the following variables with YOUR keys:

```env
# Database (already set)
POSTGRES_URL="file:./dev.db"

# Stripe Keys (from Step 2)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE

# Stripe Webhook Secret (from Step 4)
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Stripe Price ID (from Step 3)
NEXT_PUBLIC_STRIPE_PRICE_ID=price_YOUR_PRICE_ID_HERE

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

3. **Replace** the placeholder values with your actual keys
4. Save the file

⚠️ **IMPORTANT**: Never commit `.env.local` to git! It contains sensitive keys.

---

## Step 6: Restart Your Development Server

1. Stop your current dev server (Ctrl+C)
2. Restart it:
   ```bash
   npm run dev
   ```

---

## Step 7: Test the Subscription Flow

1. Go to http://localhost:3000
2. Click **"Subscribe Now - €1.99/mo"**
3. You'll be redirected to the pricing page
4. Click **"Subscribe Now"**
5. Use Stripe's test card number:
   ```
   Card number: 4242 4242 4242 4242
   Expiry date: Any future date (e.g., 12/25)
   CVC: Any 3 digits (e.g., 123)
   ZIP: Any 5 digits (e.g., 12345)
   ```
6. Complete the checkout
7. You should be redirected to your contacts page

---

## Step 8: Test Webhooks Locally (Optional but Recommended)

For webhooks to work on localhost, use Stripe CLI:

1. Install Stripe CLI:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Or download from https://stripe.com/docs/stripe-cli
   ```

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. The CLI will display a webhook signing secret starting with `whsec_`
5. Update your `.env.local` file with this new `STRIPE_WEBHOOK_SECRET`
6. Keep the CLI running while testing

---

## Step 9: Go Live (When Ready)

1. Complete your Stripe account activation
2. In Stripe Dashboard, toggle from "Test mode" to "Live mode"
3. Get your LIVE API keys from https://dashboard.stripe.com/apikeys
4. Create a new product/price in Live mode (same as Step 3)
5. Set up webhook endpoint with your production domain
6. Update `.env.local` (or production environment variables) with LIVE keys
7. **Remove the `_test_` keys and use `pk_live_` and `sk_live_` keys**

---

## 🎉 You're All Set!

Your subscription system is now configured!

### What Happens Next:

✅ Users see the pricing page with €1.99/month plan
✅ They can subscribe via Stripe Checkout
✅ After payment, they get access to the contacts app
✅ Webhooks handle subscription updates automatically
✅ Cancellations are handled through Stripe Customer Portal

---

## 📝 Additional Features to Add (Optional)

### 1. **Subscription Check in Contacts Page**
Currently, the contacts page is accessible after login. You may want to add subscription validation:

```typescript
// Add this to /app/contacts/page.tsx
useEffect(() => {
  const checkSubscription = async () => {
    const response = await fetch('/api/check-subscription');
    const { hasActiveSubscription } = await response.json();
    
    if (!hasActiveSubscription) {
      router.push('/pricing');
    }
  };
  
  checkSubscription();
}, []);
```

### 2. **Customer Portal for Subscription Management**
Allow users to manage their subscription:
- Cancel subscription
- Update payment method
- View billing history

This requires setting up Stripe Customer Portal in your dashboard.

### 3. **Database Integration**
Store subscription status in your database:
- Add `Subscription` model to Prisma schema
- Track subscription ID, status, current period end
- Update via webhooks

---

## 🆘 Troubleshooting

### Checkout not working?
- Check that all environment variables are set correctly
- Verify the Price ID matches what's in Stripe Dashboard
- Check browser console for errors

### Webhooks not receiving events?
- Make sure Stripe CLI is running (for local testing)
- Verify webhook endpoint URL is correct
- Check that signing secret matches

### "Invalid API Key" error?
- Make sure you're using the correct keys (test vs live)
- Verify keys are copied completely without spaces
- Restart your dev server after updating .env.local

---

## 📞 Support

If you need help:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com

---

Built with ❤️ by NextLayer Studio
