# Salt & Solvent Configuration

A modern web application for configuring and analyzing salt and solvent electrolytes.

## Features

- **Salt Configuration**: Configure cation and anion selection with mole ratio calculations
- **Solvent Configuration**: Manage SMILES strings and fraction inputs
- **Analysis Results**: View system properties, cluster analysis, and charts
- **Analysis Records**: Track and manage past analysis configurations
- **Interactive UI**: Modern, responsive interface with real-time validation

## Live Demo

🌐 **[View Live Demo](https://yourusername.github.io/MD/)**

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/MD.git
cd MD
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5001](http://localhost:5001) in your browser.

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── FormulationPage.tsx
│   ├── ResultsPage.tsx
│   ├── AnalysisRecords.tsx
│   └── ...
├── styles/             # Global styles
└── main.tsx           # Application entry point
```

## Deployment

This project is configured for GitHub Pages deployment. The build process automatically deploys to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.