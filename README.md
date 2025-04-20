# Infovity Webinar Registration Frontend

A modern, responsive webinar registration site built with React, TypeScript, Vite, and Tailwind CSS.

<!-- ![Infovity Webinar Registration](https://via.placeholder.com/800x400?text=Infovity+Webinar+Registration) -->

## Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark/Light Mode**: Toggle between dark and light themes
- **Interactive UI**: Engaging user experience with real-time feedback
- **Form Validation**: Client-side validation for user inputs
- **API Integration**: Connects to backend for data persistence
- **Enhanced Thank You Page**: Detailed confirmation after successful registration

## Tech Stack

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast development and build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, consistent icons

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/infovity-webinar.git
   cd infovity-webinar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following content:
   ```
   # API URL - Update when you deploy your Express API
   VITE_API_URL=http://localhost:3001
   ```

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

### Building for Production

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
infovity-webinar/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   │   └── InfovityLandingPage.tsx  # Main landing page component
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles and Tailwind imports
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Customization

### Adding New Webinar Topics

Edit the `topics` array in `InfovityLandingPage.tsx`:

```typescript
const topics: Topic[] = [
  { 
    id: 'new-topic-id', 
    name: 'New Webinar Topic', 
    date: 'June 1, 2025', 
    time: '7:00 PM IST' 
  },
  // ...other topics
];
```

### Changing Theme Colors

Modify the Tailwind theme in `tailwind.config.js` to change the color scheme.

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Set the environment variables in the Vercel dashboard.
4. Deploy!

### Other Hosting Options

- **Netlify**: Similar process to Vercel
- **GitHub Pages**: Run `npm run build` and deploy the `dist` folder
- **AWS S3**: Upload the `dist` folder to an S3 bucket configured for static website hosting

## Backend Integration

This frontend is designed to work with the Infovity Webinar API backend. Make sure to:

1. Deploy the backend API (see its README for instructions)
2. Update the `VITE_API_URL` in your environment variables to point to the deployed API

## License

[MIT](LICENSE)

## Contributors

- Your Name - Initial work

## Acknowledgments

- Tailwind CSS for the utility classes
- Lucide React for the beautiful icons
- The React and Vite teams for the amazing tools