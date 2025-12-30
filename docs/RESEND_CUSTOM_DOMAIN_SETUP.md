# Resend Custom Domain Setup Guide

This guide will help you set up a custom domain with Resend to send professional emails from your own domain (e.g., `contact@yourdomain.com`).

## Why Set Up a Custom Domain?

With Resend's free tier and shared domain (`onboarding@resend.dev`):

- You can only send emails to **your own verified email address**
- Emails may look less professional
- Limited deliverability

With a custom domain:

- Send emails to **any email address**
- Professional appearance (`noreply@yourdomain.com`)
- Better deliverability and trust
- Full control over sender identity

## Step 1: Add Your Domain in Resend

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter your domain name (e.g., `yourdomain.com`)
4. Click **"Add"**

## Step 2: Configure DNS Records

Resend will provide you with DNS records to add. You'll need to add these to your domain's DNS settings:

### Required DNS Records

| Type | Name                    | Value                                                  |
| ---- | ----------------------- | ------------------------------------------------------ |
| TXT  | `resend._domainkey`     | `p=MIGfMA0GCSqGSIb3...` (Resend will provide)          |
| TXT  | `@` or `yourdomain.com` | `v=spf1 include:amazonses.com ~all`                    |
| MX   | `@` or `yourdomain.com` | `feedback-smtp.us-east-1.amazonses.com` (Priority: 10) |

### Where to Add DNS Records

- **Vercel**: Go to your project → Settings → Domains → DNS Records
- **Cloudflare**: Go to your domain → DNS → Add record
- **Namecheap**: Domain List → Manage → Advanced DNS
- **GoDaddy**: My Products → DNS → Manage DNS

## Step 3: Verify Your Domain

1. After adding DNS records, go back to Resend dashboard
2. Click **"Verify"** next to your domain
3. DNS propagation can take up to 48 hours (usually 15-30 minutes)
4. Once verified, you'll see a green checkmark ✓

## Step 4: Update Your Code

After your domain is verified, update the `from` field in your API route:

### Update `/src/app/api/contact/route.ts`

Find this line:

```typescript
from: "Portfolio Contact <onboarding@resend.dev>",
```

Change it to:

```typescript
from: "Portfolio Contact <contact@yourdomain.com>",
```

Or use an environment variable:

```typescript
from: process.env.EMAIL_FROM || "Portfolio Contact <onboarding@resend.dev>",
```

### Update `.env.local`

Add your custom from email:

```bash
# Email sender address (after domain verification)
EMAIL_FROM="Idhan Zarkasyah <contact@yourdomain.com>"
```

## Step 5: Test Your Setup

1. Restart your development server
2. Submit a test message through the contact form
3. Check if the email arrives with your custom domain

## Troubleshooting

### Domain Not Verifying

- Double-check DNS record values (copy exactly from Resend)
- Wait for DNS propagation (can take up to 48 hours)
- Ensure no typos in record names

### Emails Not Sending

- Check Resend dashboard for error logs
- Verify API key is correct in `.env.local`
- Check the "Emails" tab in Resend for delivery status

### Emails Going to Spam

- Make sure SPF and DKIM records are correctly configured
- Add a DMARC record for better deliverability:
  ```
  Type: TXT
  Name: _dmarc
  Value: v=DMARC1; p=none; rua=mailto:your@email.com
  ```

## Free Tier Limits

Resend free tier includes:

- 3,000 emails/month
- 100 emails/day
- 1 custom domain

This is more than enough for a personal portfolio contact form!

## Need Help?

- [Resend Documentation](https://resend.com/docs)
- [Resend Discord Community](https://discord.gg/resend)
