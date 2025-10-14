# My Contacts App

A beautiful and modern contacts management application built with Next.js, TypeScript, Tailwind CSS, and Lucide icons.

## Features

- 🔐 **User Authentication** - Secure signup and login with email and password
- 🔄 **Remember Me** - Stay signed in across sessions and devices
- 🌐 **Cross-Device Access** - Access your contacts from any device
- 🔍 **Advanced Search** - Search contacts by name, date of birth, school, and profession
- 🏷️ **Filter Bubbles** - Visual tags showing active search filters
- ➕ **Rich Contact Profiles** - Add emails, phones, social media, and more
- 💼 **Profession Management** - Select from existing professions or add new ones
- 💾 **Database Storage** - All data securely stored in PostgreSQL
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 💯 **100% Free** - No subscriptions, no paywalls, completely free forever

## Getting Started

### Installation

1. Navigate to the project directory:
   ```bash
   cd contacts-app
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## How to Use

### 1. Create an Account
- Click "Get Started Free" on the homepage
- Enter your email, name, and password
- Your account is created and you're automatically logged in

### 2. Login (Returning Users)
- Enter your email and password
- Check "Keep me signed in" to stay logged in across sessions
- Your data is accessible from any device

### 3. Search Contacts
- **Quick Search**: Use the main search bar to search by name
- **Advanced Filters**: Use the four filter inputs to search by:
  - Name
  - Date of Birth
  - School
  - Profession
- **Filter Bubbles**: Active filters appear as bubbles below the search inputs. Click the X to remove them.

### 4. Add New Contact
Click the "Add Person" button to open the form with these fields:
- **Name** (required)
- **Date of Birth** (required)
- **When We Met** (required) - Free text field
- **Contact Information** - Add emails and phone numbers
- **Social Media** - Link social profiles
- **School** (optional)
- **Profession Description** (optional) - Free text field
- **Select Professions** - Choose one or more from the available list

### 5. Add New Profession
When adding a contact:
1. Click "Add New Profession" button
2. Enter the profession name
3. Click "Add" to save it
4. The new profession is now available for selection

## Tech Stack

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Modern styling
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **bcryptjs** - Password encryption
- **Lucide React** - Beautiful icons

## Data Structure

### User Accounts
- Email (unique)
- Name
- Password (encrypted)
- Created/Updated timestamps

### Contacts
Each contact includes:
- ID (auto-generated)
- Name
- Date of Birth
- When We Met
- School (optional)
- Profession Description (optional)
- Selected Professions (array)
- Contact Information (emails & phones)
- Social Media Links
- Comments & Notes (timestamped)

## Security

- Passwords are encrypted using bcrypt
- Session-based authentication
- "Remember Me" feature for persistent login
- Per-user data isolation
- SQL injection protection via Prisma
