# Facebook Page Insights Dashboard

A web application that allows users to view insights and analytics for their Facebook pages. Built with React, TypeScript, and Tailwind CSS.

## Features

- Facebook OAuth Authentication
- Page Selection for multiple Facebook pages
- Insights Dashboard showing:
  - Total Followers
  - Engagement Metrics
  - Page Impressions
  - Reaction Analytics
- Date Range Selection for insights data
- Responsive Design

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Facebook Graph API
- Axios for API calls
- React Router for navigation
- Date-fns for date manipulation

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js >=18.0.0
- A Facebook Developer Account
- A Facebook App with necessary permissions
- Access to Facebook Pages you want to analyze

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sunilkumar27/mojo-fb-insights-front-end.git
   cd facebook-insights-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=your_backend_api_url
   VITE_FACEBOOK_APP_ID=your_facebook_app_id
   ```

## Development

For local development with HTTPS:

1. Generate SSL certificates (required for Facebook OAuth):
   ```bash
   mkcert localhost
   ```

2. Place the certificates in a `certificates` folder:
   ```
   certificates/
   ├── localhost+2-key.pem
   └── localhost+2.pem
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `https://localhost:5173`

## Building for Production

```bash
npm run build
```

## Deployment

The project is configured for deployment on Vercel. To deploy:

1. Connect your GitHub repository to Vercel
2. Configure the environment variables in Vercel:
   - `VITE_API_URL`
   - `VITE_FACEBOOK_APP_ID`
3. Deploy!

## Facebook App Configuration

1. Create a Facebook App in the [Facebook Developers Console](https://developers.facebook.com/)
2. Add Facebook Login product
3. Configure OAuth settings:
   - Add your domain to App Domains
   - Add OAuth redirect URIs
   - Enable Client OAuth Login
4. Request necessary permissions:
   - pages_read_engagement
   - pages_show_list
   - pages_manage_metadata

## Project Structure

```
src/
├── components/         # React components
│   ├── Auth/          # Authentication components
│   ├── Dashboard/     # Dashboard components
│   └── Layout/        # Layout components
├── hooks/             # Custom React hooks
├── services/          # API services
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email sunilkumar27@gmail.com or open an issue in the GitHub repository.