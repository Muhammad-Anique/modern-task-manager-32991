# Modern Task Manager

A beautiful Kanban-style task management application built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Kanban Board**: Organize tasks in three columns - To Do, In Progress, and Done
- **Real-time Updates**: Tasks update instantly across all connected clients using Supabase Realtime
- **CRUD Operations**: Create, read, update, and delete tasks with a beautiful modal interface
- **Task Priorities**: Assign Low, Medium, or High priority to tasks
- **Due Dates**: Set and track due dates for tasks
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, minimalist design with smooth animations

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Supabase Realtime subscriptions
- **Icons**: Lucide React

## Database Schema

### Tasks Table

| Column      | Type                     | Description                          |
|-------------|--------------------------|--------------------------------------|
| id          | UUID                     | Primary key, auto-generated          |
| title       | TEXT                     | Task title (required)                |
| description | TEXT                     | Task description (optional)          |
| status      | ENUM (todo/in_progress/done) | Task status (default: todo)       |
| priority    | ENUM (low/medium/high)   | Task priority (default: medium)      |
| due_date    | TIMESTAMP                | Due date (optional)                  |
| created_at  | TIMESTAMP                | Auto-generated creation timestamp    |
| updated_at  | TIMESTAMP                | Auto-updated on modification         |

### Enums

- `task_status`: `todo`, `in_progress`, `done`
- `task_priority`: `low`, `medium`, `high`

### Indexes

- `idx_tasks_status` - For filtering by status
- `idx_tasks_priority` - For sorting by priority
- `idx_tasks_due_date` - For sorting by due date

### Row Level Security (RLS)

The tasks table has RLS enabled with a policy allowing all operations for demo purposes. In production, you should implement proper authentication checks.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Muhammad-Anique/modern-task-manager-32991.git
cd modern-task-manager-32991
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor
3. Run the migration file: `supabase/migrations/20240101000000_create_tasks_table.sql`
4. Enable Realtime for the `tasks` table:
   - Go to Database → Replication
   - Toggle on "Realtime" for the `tasks` table

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Supabase credentials:
   - Go to Project Settings → API
   - Copy the "Project URL" and "anon/public" key

3. Update `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── StatusBadge.tsx      # Status and priority badges
│   ├── TaskBoard.tsx        # Kanban board component
│   ├── TaskCard.tsx         # Individual task card
│   ├── TaskModal.tsx        # Create/edit task modal
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       └── Textarea.tsx
├── lib/
│   ├── supabase.ts          # Supabase client & realtime
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Utility functions
├── supabase/
│   └── migrations/          # Database migrations
└── ...config files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add your environment variables in Vercel's dashboard
4. Deploy!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.