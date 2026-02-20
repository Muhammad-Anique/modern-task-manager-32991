'use client'

import { Task, TaskStatus } from '@/lib/types'
import { TaskCard } from './TaskCard'
import { Plus, Circle, Clock, CheckCircle2 } from 'lucide-react'

interface TaskBoardProps {
  tasks: Task[]
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onAddTask: (status: TaskStatus) => void
}

interface ColumnConfig {
  id: TaskStatus
  title: string
  icon: React.ReactNode
  color: string
}

const columns: ColumnConfig[] = [
  {
    id: 'todo',
    title: 'To Do',
    icon: <Circle className="w-5 h-5 text-amber-500" />,
    color: 'bg-amber-50 border-amber-200',
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    icon: <Clock className="w-5 h-5 text-blue-500" />,
    color: 'bg-blue-50 border-blue-200',
  },
  {
    id: 'done',
    title: 'Done',
    icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    color: 'bg-green-50 border-green-200',
  },
]

export function TaskBoard({ tasks, onEditTask, onDeleteTask, onAddTask }: TaskBoardProps) {
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.id)
        
        return (
          <div
            key={column.id}
            className={`flex flex-col rounded-xl border-2 ${column.color} min-h-[500px]`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between p-4 border-b border-inherit">
              <div className="flex items-center gap-2">
                {column.icon}
                <h2 className="font-semibold text-slate-900">{column.title}</h2>
                <span className="bg-white px-2 py-0.5 rounded-full text-xs font-medium text-slate-600">
                  {columnTasks.length}
                </span>
              </div>
              <button
                onClick={() => onAddTask(column.id)}
                className="p-1 hover:bg-white/50 rounded transition-colors"
              >
                <Plus className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Tasks List */}
            <div className="flex-1 p-3 space-y-3">
              {columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
              
              {columnTasks.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">
                  No tasks in {column.title.toLowerCase()}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}