# My Contacts App

A beautiful and modern contacts management application built with Next.js, TypeScript, Tailwind CSS, and Lucide icons.

## Features

- 🔐 **Login Page** - Simple authentication with name and password
- 🔍 **Advanced Search** - Search contacts by name, date of birth, school, and profession
- 🏷️ **Filter Bubbles** - Visual tags showing active search filters
- ➕ **Add Contacts** - Easy-to-use form to add new people with multiple fields
- 💼 **Profession Management** - Select from existing professions or add new ones
- 💾 **Persistent Storage** - All data stored in browser's localStorage
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations

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

### 1. Login
- Enter any name and password to access the application
- Your credentials are stored in session storage for the current session

### 2. Search Contacts
- **Quick Search**: Use the main search bar to search by name
- **Advanced Filters**: Use the four filter inputs to search by:
  - Name
  - Date of Birth
  - School
  - Profession
- **Filter Bubbles**: Active filters appear as bubbles below the search inputs. Click the X to remove them.

### 3. Add New Contact
Click the "Add Person" button to open the form with these fields:
- **Name** (required)
- **Date of Birth** (required)
- **When We Met** (required) - Free text field
- **School** (optional)
- **Profession Description** (optional) - Free text field
- **Select Professions** - Choose one or more from the available list

### 4. Add New Profession
When adding a contact:
1. Click "Add New Profession" button
2. Enter the profession name
3. Click "Add" to save it
4. The new profession is now available for selection

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **localStorage** - Data persistence

## Data Structure

Contacts are stored with the following information:
- ID (auto-generated)
- Name
- Date of Birth
- When We Met
- School (optional)
- Profession Description (optional)
- Selected Professions (array)

## Notes

- All data is stored locally in your browser
- Clearing browser data will remove all contacts
- No backend server required - everything runs in the browser
