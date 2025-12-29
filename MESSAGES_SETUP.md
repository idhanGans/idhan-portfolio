# Contact Form & Messages System

This contact form system allows visitors to send you messages directly from your portfolio.

## How It Works

### 1. **Contact Form** (`/contact`)

- Visitors can submit messages with their name, email, subject, and message
- Form validation ensures all required fields are filled
- Messages are automatically stored locally in `messages.json`

### 2. **Message Storage**

- All messages are stored in a `messages.json` file in the project root
- Each message includes:
  - Unique ID (timestamp)
  - Sender name, email, and subject
  - Full message content
  - Timestamp of submission
  - Read status

### 3. **Messages Dashboard** (`/admin/messages`)

- View all incoming contact form submissions
- Click on any message to see the full details
- Quick reply button to send email responses directly
- Delete messages you don't need
- Auto-refreshes every 10 seconds to show new messages

## Setup Instructions

### Option 1: Local Storage Only (No Email Notifications)

The form works out of the box! Messages are stored locally and you can view them at `/admin/messages`.

### Option 2: With Email Notifications (Recommended)

1. **Sign up for Resend** (free email service for developers):

   - Go to https://resend.com
   - Create an account and verify your email
   - Get your API key

2. **Add Environment Variable**:

   - Copy `.env.example` to `.env.local`
   - Add your Resend API key:
     ```
     RESEND_API_KEY=re_xxxxxxxxxxxxx
     ```

3. **Install Resend Package**:
   ```bash
   npm install resend
   ```

With Resend configured, you'll receive email notifications whenever someone submits the contact form.

## File Structure

```
src/app/
├── api/
│   ├── contact/route.ts      # API endpoint for form submissions
│   └── messages/route.ts     # API endpoint to fetch all messages
├── contact/page.tsx           # Contact form page
└── admin/
    └── messages/page.tsx      # Messages dashboard
```

## Features

✅ **Form Validation**

- Required field validation
- Email format validation
- Real-time error display

✅ **User Feedback**

- Success message on submission
- Error handling with helpful messages
- Loading states

✅ **Message Management**

- View all messages in one place
- Search/filter by sender
- Quick reply via email
- Delete messages
- Timestamp tracking

✅ **Security**

- HTML escaping to prevent XSS attacks
- Server-side validation
- Safe error messages

## Testing

1. Go to `http://localhost:3000/contact`
2. Fill out the form with test data
3. Submit the form
4. Go to `http://localhost:3000/admin/messages` to view the message
5. Click on a message to see full details and reply

## Optional: Enable Email Notifications

To receive email notifications when someone submits the form:

1. Set up a Resend account (https://resend.com)
2. Add your API key to `.env.local`
3. The system will automatically send you emails when messages are submitted

## Customization

### Change Notification Email

Edit `src/app/api/contact/route.ts` line with:

```typescript
to: "your-email@example.com",
```

### Add More Form Fields

1. Update the `formState` in `src/app/contact/page.tsx`
2. Update the form JSX
3. Update the API endpoint validation

### Style the Dashboard

Edit `src/app/admin/messages/page.tsx` to customize colors and layout using Tailwind classes.

## Troubleshooting

**Messages not saving?**

- Check file permissions in the project root
- Ensure `messages.json` file is writable

**Email notifications not working?**

- Verify Resend API key is correct
- Check network tab for API errors
- Ensure `.env.local` file exists and is in `.gitignore`

**Form not submitting?**

- Check browser console for errors
- Verify API route is accessible at `/api/contact`
- Check network tab for request details
