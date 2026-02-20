**Modern Task Manager** — Stack: Next.js, TypeScript, Tailwind CSS, Supabase | Repo: https://github.com/Muhammad-Anique/modern-task-manager-32991 | Status: In Progress

**Tasks:**
1. - [x] Init Next.js skeleton — deps: next, react, react-dom, @supabase/supabase-js, lucide-react; configs: tsconfig.json, next.config.ts, .gitignore
2. - [x] Tailwind config — tailwind.config.ts, postcss.config.js, app/globals.css
3. - [x] Supabase setup — lib/supabase.ts, lib/types.ts (Task model), .env.example
4. - [x] DB migration — supabase/migrations/20240101000000_create_tasks_table.sql (tasks table, RLS)
5. - [x] Root layout — app/layout.tsx (metadata, fonts, styles)
6. - [x] Shared components — StatusBadge.tsx, atomic UI
7. - [ ] TaskCard + TaskBoard — Kanban layout
8. - [ ] TaskModal — CRUD form
9. - [ ] Dashboard — app/page.tsx (Supabase fetch, real-time subs)
10. - [ ] README — features, schema, setup