# AI CA Assistant

AI CA Assistant is an innovative web application designed to automate accounting and tax planning tasks using AI technology. Built with React, it integrates Firebase for authentication and data management, the Gemini API for intelligent responses, and features a responsive UI with Tailwind CSS. The app includes a real-time chatbot for CA advice, transaction tracking, budget monitoring, financial analytics, and more, making it a comprehensive tool for individuals and businesses handling Indian tax laws (e.g., GST, deductions under 80C).

## Key Features
- **AI-Powered Chatbot**: Interactive consultation for tax savings, GST filing, auditing, and financial planning. Supports natural language queries with markdown-formatted responses.
- **Dashboard Overview**: Year-based selection for viewing total income, expenses, and balance.
- **Transaction Management**: Add, list, and categorize incomes/expenses with real-time updates via Firestore.
- **Budget Tracking**: Set budgets, track spending, and receive alerts for over-budget scenarios.
- **Financial Analytics**: Visual bar charts using Recharts to compare incomes and expenses.
- **Authentication**: Anonymous sign-in with Firebase for quick access; expandable to full auth.
- **Report Generation**: Export transactions to PDF using jsPDF.
- **Responsive and Styled UI**: Modern design with glassmorphism effects, custom scrollbars, and loading animations via Tailwind CSS.
- **PWA-Ready**: Includes service worker and manifest for offline capabilities and mobile installation.
- **Error Handling**: Built-in error boundaries and loading states for a smooth user experience.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Recharts for charts, React Markdown for rendering responses.
- **Backend Integration**: Firebase (Auth, Firestore), Gemini API for AI.
- **Tools**: jsPDF for PDF exports, Intersection Observer for animations, npm for dependency management.
- **Other**: Progressive Web App features with service worker and manifest.

## Prerequisites
- Node.js v14+ and npm v6+ installed.
- Firebase project set up with Firestore and Authentication enabled.
- Gemini API key for AI features.
