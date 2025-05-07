# Common Ground

A platform for facilitating meaningful civic conversations and collaborative problem-solving through AI-assisted group discussions.

## Features

- Modern, responsive UI built with Next.js and shadcn/ui
- State management with Zustand
- Data fetching with TanStack Query
- Beautiful color scheme with dark mode support
- User authentication (coming soon)

## Tech Stack

- **Frontend Framework**: Next.js 14
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cg-next
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   └── header.tsx     # Header component
├── store/             # Zustand stores
├── services/          # Service integrations
└── styles/            # Global styles
    └── globals.css    # Tailwind and custom styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Color Scheme

The application uses a sophisticated color palette:

- **Myrtle Green** (#3a7d7d) - Primary color
- **Xanthous** (#f2b134) - Secondary color
- **Isabelline** (#f7f4ed) - Background
- **Jet** (#2d2d2d) - Text
- **Indian Red** (#d9645a) - Accent

## Development Notes

### State Management

We use Zustand for state management.

### API Integration

TanStack Query is used for data fetching:
- User data
- Thread and comment data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
