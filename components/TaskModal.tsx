'use client'

import { useState, useEffect } from 'react'
import { Task, TaskStatus, TaskPriority, CreateTaskInput, UpdateTaskInput } from '@/lib/types'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Select } from './ui/Select'
import { Textarea } from './ui/Textarea'
import { X } from 'lucide-react'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateTaskInput | UpdateTaskInput) => void
  task?: Task | null
  defaultStatus?: TaskStatus
}

export function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  task,
  defaultStatus = 'todo',
}: TaskModalProps) {
  const [formData, setFormData] = useState<CreateTaskInput>({
    title: '',
    description: '',
    status: defaultStatus,
    priority: 'medium',
    due_date: null,
  })

  const isEditing = !!task

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        due_date: task.due_date,
      })
    } else {
      setFormData({
        title: '',
        description: '',
        status: defaultStatus,
        priority: 'medium',
        due_date: null,
      })
    }
  }, [task, defaultStatus, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const handleChange = (
    field: keyof CreateTaskInput,
    value: string | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            {isEditing ? 'Edit Task' : 'Create Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-slate-700">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Enter task title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-slate-700">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
            />
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium text-slate-700">
                Status
              </label>
              <Select
                id="status"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value as TaskStatus)}
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium text-slate-700">
                Priority
              </label>
              <Select
                id="priority"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value as TaskPriority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label htmlFor="due_date" className="text-sm font-medium text-slate-700">
              Due Date
            </label>
            <Input
              id="due_date"
              type="date"
              value={formData.due_date ? formData.due_date.split('T')[0] : ''}
              onChange={(e) =>
                handleChange('due_date', e.target.value ? new Date(e.target.value).toISOString() : null)
              }
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {isEditing ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}