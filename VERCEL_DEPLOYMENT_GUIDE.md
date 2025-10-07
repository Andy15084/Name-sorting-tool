# 🚀 Vercel Deployment Guide

## Setting Up Environment Variables in Vercel

Your code is now on GitHub and Vercel will auto-deploy it. However, you **MUST** add environment variables for the app to work!

---

## Step 1: Go to Vercel Dashboard

1. Visit https://vercel.com/dashboard
2. Select your project: **Name-sorting-tool**
3. Click on **Settings** tab
4. Click on **Environment Variables** in the sidebar

---

## Step 2: Add Environment Variables

Add these environment variables **ONE BY ONE**:

### **1. POSTGRES_URL**
- **Key**: `POSTGRES_URL`
- **Value**: Your Postgres connection string from Vercel Storage or Prisma
- **Environment**: Select ALL (Production, Preview, Development)
- Click **Save**

### **2. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**
- **Key**: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Value**: Your Stripe publishable key (starts with `pk_test_`)
- Get from: https://dashboard.stripe.com/test/apikeys
- **Environment**: Select ALL
- Click **Save**

### **3. STRIPE_SECRET_KEY**
- **Key**: `STRIPE_SECRET_KEY`
- **Value**: Your Stripe secret key (starts with `sk_test_`)
- Get from: https://dashboard.stripe.com/test/apikeys
- **Environment**: Select ALL
- Click **Save**

### **4. STRIPE_WEBHOOK_SECRET**
- **Key**: `STRIPE_WEBHOOK_SECRET`
- **Value**: Your production webhook signing secret (starts with `whsec_`)
- Get from: https://dashboard.stripe.com/test/webhooks (after creating production endpoint)
- **Environment**: Select ALL
- Click **Save**

### **5. NEXT_PUBLIC_STRIPE_PRICE_ID**
- **Key**: `NEXT_PUBLIC_STRIPE_PRICE_ID`
- **Value**: Your Stripe price ID (starts with `price_`)
- Get from: https://dashboard.stripe.com/test/products
- **Environment**: Select ALL
- Click **Save**

### **6. NEXT_PUBLIC_APP_URL**
- **Key**: `NEXT_PUBLIC_APP_URL`
- **Value**: `https://name-sorting-tool.vercel.app` (or your custom domain)
- **Environment**: Select ALL
- Click **Save**

---

## Step 3: Update Stripe Webhook URL

Your webhook is currently set to `localhost:3000`. You need to add a production webhook:

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click **Add endpoint**
3. Enter your production URL:
   ```
   https://name-sorting-tool.vercel.app/api/webhooks/stripe
   ```
4. Select the same events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. You'll get a NEW webhook secret for production
7. **Update the `STRIPE_WEBHOOK_SECRET` in Vercel** with this new secret

---

## Step 4: Redeploy

After adding all environment variables:

1. Go to **Deployments** tab in Vercel
2. Find the latest deployment
3. Click the **three dots (...)** menu
4. Click **Redeploy**
5. Select **Use existing Build Cache**
6. Click **Redeploy**

OR simply:
1. Make a small change to any file (add a space)
2. Commit and push to GitHub
3. Vercel will auto-deploy with the new env vars

---

## Step 5: Run Database Migration on Vercel

After deployment, you need to run the database migration:

### Option A: Use Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Link to your project:
   ```bash
   cd "/Users/andrejpaulicka/Desktop/untitled folder 4/Name-sorting-tool"
   vercel link
   ```

4. Run migration:
   ```bash
   vercel env pull .env.production
   npx prisma generate
   npx prisma db push
   ```

### Option B: Use Vercel Dashboard (Alternative)

1. Go to your Vercel project settings
2. Navigate to **Storage** tab
3. Connect/Create PostgreSQL database
4. The schema should auto-sync

---

## Step 6: Test Your Deployed App

1. Visit: https://name-sorting-tool.vercel.app
2. Click **"Get Started - €1.99/mo"**
3. Create an account
4. Test the subscription flow
5. Add contacts
6. Test all features

---

## Troubleshooting

### **App shows errors after deployment**
- Check that ALL environment variables are added
- Make sure there are no typos in variable names
- Verify the values are correct
- Redeploy after adding env vars

### **Database errors**
- Make sure `POSTGRES_URL` is correct
- Run `npx prisma db push` with production env
- Check Vercel logs for specific errors

### **Stripe checkout not working**
- Verify all Stripe keys are correct
- Check that `NEXT_PUBLIC_APP_URL` matches your domain
- Update webhook URL to production domain
- Test with Stripe test card: 4242 4242 4242 4242

### **Webhooks not receiving events**
- Make sure you created a PRODUCTION webhook endpoint
- Verify webhook URL is `https://name-sorting-tool.vercel.app/api/webhooks/stripe`
- Update `STRIPE_WEBHOOK_SECRET` with the production webhook secret
- Check Stripe Dashboard > Webhooks > Event logs

---

## Environment Variables Summary

You need to add these 6 environment variables in Vercel:

1. `POSTGRES_URL` - Your database connection string
2. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key (pk_test_...)
3. `STRIPE_SECRET_KEY` - Stripe secret key (sk_test_...)
4. `STRIPE_WEBHOOK_SECRET` - Production webhook secret (whsec_...)
5. `NEXT_PUBLIC_STRIPE_PRICE_ID` - Your price ID (price_...)
6. `NEXT_PUBLIC_APP_URL` - Your app URL (https://name-sorting-tool.vercel.app)

---

## Quick Checklist

- [ ] Added all 6 environment variables in Vercel
- [ ] Created production webhook in Stripe
- [ ] Updated `STRIPE_WEBHOOK_SECRET` with production secret
- [ ] Redeployed the app
- [ ] Ran database migration (prisma db push)
- [ ] Tested signup flow
- [ ] Tested subscription payment
- [ ] Tested contacts functionality

---

## 🎉 You're Ready!

Once all environment variables are set and the app is deployed, your contacts app will be live and fully functional!

Visit: **https://name-sorting-tool.vercel.app**

---

## Security Notes

⚠️ **Important Security Tips:**

1. **Never share your SECRET keys** (anything with `sk_test_` or `sk_live_`)
2. **Webhook secrets** should never be exposed
3. **Database URLs** contain credentials - keep them private
4. **NEXT_PUBLIC_** variables are visible to users - only use for public keys
5. When going to production, switch all keys from `test` to `live` mode

---

Built with ❤️ by NextLayer Studio
