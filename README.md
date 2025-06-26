# Mactic Tools Product Catalog

A modern, responsive product catalog website built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## Features

- Responsive design for all devices
- Product listing with search and filter functionality
- Detailed product pages with enquiry forms
- Contact page with Google Maps integration
- About page with company information
- Firebase integration for data storage and authentication
- Modern UI with Tailwind CSS

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Firebase (Firestore, Authentication, Storage)
- React Hot Toast for notifications

## Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Firebase account

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dodia-brothers.git
   cd dodia-brothers
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up Firebase:

   - Create a new Firebase project
   - Enable Firestore, Authentication, and Storage
   - Get your Firebase configuration
   - Create a `.env.local` file in the root directory and add your Firebase configuration:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── products/          # Products pages
│   │   └── [id]/         # Individual product page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── EnquiryForm.tsx   # Product enquiry form
│   ├── Footer.tsx        # Site footer
│   └── Navbar.tsx        # Navigation bar
└── lib/                  # Utility functions
    └── firebase.ts       # Firebase configuration
```

## Deployment

1. Build the project:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy to Firebase Hosting:
   ```bash
   npm run deploy
   # or
   yarn deploy
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
