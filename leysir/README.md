Mini Prompt Manager
A React application for managing AI prompts with full CRUD operations, search, filtering, and rating functionality.
How to Run the Project
Prerequisites

Node.js (v16 or higher)
npm or yarn

Installation & Setup

Clone the repository

bash   git clone https://github.com/Seyi-React/Leysir
   cd leysir

Install dependencies

bash   npm install

Start the development server

bash   npm run dev

Open your browser
Navigate to http://localhost:5173

Build for Production
bashnpm run build
npm run preview
Key Design & Technical Decisions
Architecture

Component Structure: Organized into logical folders (Auth, Dashboard, UI) for maintainability
Custom Hooks: usePrompts hook encapsulates all API logic and state management
Type Safety: Full TypeScript implementation with comprehensive type definitions
Separation of Concerns: Business logic separated from UI components

Rating Normalization
The most critical feature is the accurate rating normalization system:
typescript// Rating transformation pipeline:
1. Clamp: r1 = MIN(100, MAX(0, rawRating))
2. Scale: r2 = r1 / 20  (converts 0-100 to 0-5)
3. Round: final = ROUND(r2 * 2) / 2  (rounds to nearest 0.5)
Implementation Details:

normalizeRating(): Converts API ratings (0-100) to UI ratings (0-5 with 0.5 steps)
denormalizeRating(): Converts UI ratings back to API format when saving
All conversions happen at the data boundary (API service layer)
UI consistently works with 0-5 scale throughout

Examples:

Raw 10 → 0.5 stars
Raw 50 → 2.5 stars
Raw 80 → 4.0 stars
Raw 5 → 0.5 stars (rounds up)
Raw 120 → 5.0 stars (clamped)

Form Validation
Comprehensive validation with clear error messages:

Title: Required, 3-100 characters
Description: Required, 10-500 characters
Category: Required, non-empty
Rating: Must be between 0-5

State Management

React hooks for local state
Custom usePrompts hook for data fetching and mutations
Optimistic UI updates for better UX

Error Handling

Loading states during API calls
Error boundaries for network failures
User-friendly error messages
Retry functionality

UI/UX Decisions

Responsive Design: Mobile-first approach with Tailwind CSS
Visual Feedback: Loading spinners, disabled states during operations
Toast Notifications
Star Rating Display: Visual representation with half-star support
Modal Forms: Clean, focused experience for adding prompts
Search & Filter: Real-time filtering for better usability

API Integration

Centralized API service (services/api.ts)
Proper error handling and response parsing
RESTful operations (GET, POST, PUT, DELETE)
Rating conversion at the API boundary


What's Next (If More Time)
Testing

Unit tests for rating normalization logic
Component tests with React Testing Library
E2E tests with Playwright/Jest/Vitest

Enhancements

Persistent Login: Store username in localStorage
Pagination: For large datasets
Sorting: By rating, date, title
Bulk Operations: Delete multiple prompts
Confirmation Dialogs: Prevent accidental deletions
Advanced Filtering: Multiple categories, rating ranges
Edit Full Prompt: Not just rating
Add beautiful fonts
Animation: Smooth transitions for better UX

Performance
Debounced search input
Memoization optimizations
Code splitting