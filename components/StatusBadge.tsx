import { TaskStatus, TaskPriority } from '@/lib/types'

interface StatusBadgeProps {
  status: TaskStatus
}

interface PriorityBadgeProps {
  priority: TaskPriority
}

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  todo: {
    label: 'To Do',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  done: {
    label: 'Done',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
}

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  low: {
    label: 'Low',
    className: 'bg-slate-100 text-slate-700 border-slate-200',
  },
  medium: {
    label: 'Medium',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  high: {
    label: 'High',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  )
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority]
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  )
}