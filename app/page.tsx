'use client'

import { useState, useEffect, useCallback } from 'react'
import { Task, TaskStatus, CreateTaskInput, UpdateTaskInput } from '@/lib/types'
import { supabase, subscribeToTasks } from '@/lib/supabase'
import { TaskBoard } from '@/components/TaskBoard'
import { TaskModal } from '@/components/TaskModal'
import { Button } from '@/components/ui/Button'
import { Plus, Loader2 } from 'lucide-react'

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('todo')

  // Fetch tasks on mount
  const fetchTasks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()

    // Subscribe to real-time changes
    const unsubscribe = subscribeToTasks((payload) => {
      const { eventType, new: newRecord, old: oldRecord } = payload

      if (eventType === 'INSERT') {
        setTasks((prev) => [newRecord, ...prev])
      } else if (eventType === 'UPDATE') {
        setTasks((prev) =>
          prev.map((task) => (task.id === newRecord.id ? newRecord : task))
        )
      } else if (eventType === 'DELETE') {
        setTasks((prev) => prev.filter((task) => task.id !== oldRecord.id))
      }
    })

    return () => {
      unsubscribe()
    }
  }, [fetchTasks])

  // Create task
  const handleCreateTask = async (data: CreateTaskInput) => {
    try {
      const { error } = await supabase.from('tasks').insert([
        {
          title: data.title,
          description: data.description || null,
          status: data.status || 'todo',
          priority: data.priority || 'medium',
          due_date: data.due_date || null,
        },
      ])

      if (error) throw error
    } catch (error) {
      console.error('Error creating task:', error)
      alert('Failed to create task')
    }
  }

  // Update task
  const handleUpdateTask = async (data: UpdateTaskInput) => {
    if (!editingTask) return

    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          due_date: data.due_date,
        })
        .eq('id', editingTask.id)

      if (error) throw error
    } catch (error) {
      console.error('Error updating task:', error)
      alert('Failed to update task')
    }
  }

  // Delete task
  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('Failed to delete task')
    }
  }

  // Open modal for creating new task
  const handleAddTask = (status: TaskStatus) => {
    setEditingTask(null)
    setDefaultStatus(status)
    setIsModalOpen(true)
  }

  // Open modal for editing task
  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  // Handle form submission
  const handleSubmit = (data: CreateTaskInput | UpdateTaskInput) => {
    if (editingTask) {
      handleUpdateTask(data as UpdateTaskInput)
    } else {
      handleCreateTask(data as CreateTaskInput)
    }
  }

  // Calculate task counts
  const todoCount = tasks.filter((t) => t.status === 'todo').length
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length
  const doneCount = tasks.filter((t) => t.status === 'done').length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Task Manager</h1>
            <p className="text-slate-600 mt-1">
              Organize your work with our Kanban board
            </p>
          </div>
          <Button onClick={() => handleAddTask('todo')} className="self-start">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-amber-600">{todoCount}</div>
            <div className="text-sm text-slate-600">To Do</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-blue-600">{inProgressCount}</div>
            <div className="text-sm text-slate-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-2xl font-bold text-green-600">{doneCount}</div>
            <div className="text-sm text-slate-600">Done</div>
          </div>
        </div>
      </div>

      {/* Task Board */}
      <div className="max-w-7xl mx-auto">
        <TaskBoard
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onAddTask={handleAddTask}
        />
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        task={editingTask}
        defaultStatus={defaultStatus}
      />
    </div>
  )
}