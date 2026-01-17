import React, { useEffect, useState, useRef } from 'react'
import Board from './components/Board'
import Header from './components/Header'
import Filters from './components/Filters'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Modal from './components/Modal'

const defaultProject = {
  id: 'p1',
  name: 'Core API Repository',
  icon: 'terminal',
  columns: {
    todo: {
      id: 'todo',
      title: 'Backlog',
      tasks: [
        { id: 't1', title: 'Implement Redis caching for user sessions', description: 'Need to reduce database load on the /auth/session endpoint during peak traffic.', assignee: 'Alex', tags: ['Backend'], date: 'Jan 20', priority: 'High' },
        { id: 't2', title: 'Refactor auth middleware to use JWT', description: 'Current session-based auth is difficult to scale across multiple instances.', assignee: 'Alex', tags: ['Refactor'], date: 'Jan 22', priority: 'Medium' }
      ]
    },
    inprogress: {
      id: 'inprogress',
      title: 'In Development',
      tasks: [
        { id: 't3', title: 'Setup GitHub Actions for CI/CD', description: 'Automate build, test, and deployment to staging environment on every PR.', assignee: 'Alex', tags: ['DevOps'], date: 'Jan 18', progress: 60, priority: 'High' }
      ]
    },
    underreview: {
      id: 'underreview',
      title: 'Code Review',
      tasks: [
        { id: 't5', title: 'Fix memory leak in websocket handler', description: 'Monitor memory usage when clients disconnect abruptly. Possible stale references in connectionPool.', assignee: 'Alex', tags: ['Bug'], date: 'Today', priority: 'Critical' }
      ]
    },
    done: {
      id: 'done',
      title: 'Merged',
      tasks: [
        { id: 't4', title: 'Initial project setup & boilerplate', description: 'Vite + React + Tailwind CSS setup complete.', assignee: 'Alex', tags: ['Dev'], date: 'Jan 10', finished: true, priority: 'Low' }
      ]
    }
  }
}

export default function App() {
  const [projects, setProjects] = useState(() => {
    try {
      const raw = localStorage.getItem('tm:projects');
      return raw ? JSON.parse(raw) : [defaultProject]
    } catch { return [defaultProject] }
  })

  const [currentProjectId, setCurrentProjectId] = useState(() => {
    return localStorage.getItem('tm:active_project') || projects[0]?.id
  })

  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0]
  const columns = currentProject.columns

  const [filters, setFilters] = useState({ search: '', assignee: 'all', tag: 'all', priority: 'all' })
  const bcRef = useRef(null)

  // Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [activeTask, setActiveTask] = useState(null)
  const [targetColumn, setTargetColumn] = useState(null)

  useEffect(() => {
    bcRef.current = new BroadcastChannel('task-channel')
    bcRef.current.onmessage = (ev) => {
      if (ev.data?.type === 'update_projects') setProjects(ev.data.payload)
    }
    return () => bcRef.current.close()
  }, [])

  useEffect(() => {
    localStorage.setItem('tm:projects', JSON.stringify(projects))
    localStorage.setItem('tm:active_project', currentProjectId)
    if (bcRef.current) bcRef.current.postMessage({ type: 'update_projects', payload: projects })
  }, [projects, currentProjectId])

  const setColumns = (updater) => {
    setProjects(prev => prev.map(p => {
      if (p.id === currentProjectId) {
        const nextCols = typeof updater === 'function' ? updater(p.columns) : updater
        return { ...p, columns: nextCols }
      }
      return p
    }))
  }

  // CRUD Handlers
  const addTask = (columnId, taskData) => {
    const newTask = {
      id: `t-${Date.now()}`,
      ...taskData,
    }
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: [...prev[columnId].tasks, newTask]
      }
    }))
    setIsTaskModalOpen(false)
  }

  const editTask = (columnId, taskId, updatedData) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.map(t => t.id === taskId ? { ...t, ...updatedData } : t)
      }
    }))
    setIsTaskModalOpen(false)
    setActiveTask(null)
  }

  const deleteTask = (columnId, taskId) => {
    if (!window.confirm('Delete this task?')) return
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.filter(t => t.id !== taskId)
      }
    }))
  }

  const addColumn = () => {
    const title = window.prompt('Enter section title (e.g. Testing, Staging):')
    if (!title) return
    const id = title.toLowerCase().replace(/\s+/g, '')
    setColumns(prev => ({
      ...prev,
      [id]: { id, title, tasks: [] }
    }))
  }

  const createNewProject = () => {
    const name = window.prompt('Enter repository/project name:')
    if (!name) return
    const newProj = {
      id: `p-${Date.now()}`,
      name,
      icon: 'database',
      columns: {
        todo: { id: 'todo', title: 'Backlog', tasks: [] },
        inprogress: { id: 'inprogress', title: 'Dev', tasks: [] },
        done: { id: 'done', title: 'Merged', tasks: [] }
      }
    }
    setProjects(prev => [...prev, newProj])
    setCurrentProjectId(newProj.id)
  }

  const deleteProject = (projectId) => {
    if (projects.length <= 1) return
    if (!window.confirm('Delete this repository and all its tasks?')) return

    setProjects(prev => {
      const filtered = prev.filter(p => p.id !== projectId)
      if (currentProjectId === projectId) {
        setCurrentProjectId(filtered[0].id)
      }
      return filtered
    })
  }

  const openAddTask = (columnId) => {
    setTargetColumn(columnId)
    setActiveTask(null)
    setIsTaskModalOpen(true)
  }

  const openEditTask = (columnId, task, isEdit = false) => {
    setTargetColumn(columnId)
    setActiveTask({ task, columnId, isEdit })
    setIsTaskModalOpen(true)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-white font-display">
      <Sidebar
        projects={projects}
        activeId={currentProjectId}
        onSwitch={setCurrentProjectId}
        onCreateProject={createNewProject}
        onDeleteProject={deleteProject}
      />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-dark">
        <Header project={currentProject} onAddTask={() => openAddTask('todo')} />
        <Filters filters={filters} setFilters={setFilters} columns={columns} />
        <div className="flex-1 overflow-x-auto p-6 scrollbar-thin">
          <Board
            columns={columns}
            setColumns={setColumns}
            filters={filters}
            onAddTask={openAddTask}
            onEditTask={openEditTask}
            onDeleteTask={deleteTask}
            onAddColumn={addColumn}
          />
        </div>
        <Footer />
      </main>

      <TaskFormModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={activeTask ? (data) => editTask(activeTask.columnId, activeTask.task.id, data) : (data) => addTask(targetColumn, data)}
        initialData={activeTask?.task}
        initialEditing={activeTask?.isEdit}
      />
    </div>
  )
}

function TaskFormModal({ isOpen, onClose, onSubmit, initialData, initialEditing }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: 'Alex',
    tags: ['Feature'],
    date: '',
    progress: 0,
    priority: 'Medium'
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      setIsEditing(initialEditing || false)
    } else {
      setFormData({
        title: '',
        description: '',
        assignee: 'Alex',
        tags: ['Feature'],
        date: 'Today',
        progress: 0,
        priority: 'Medium'
      })
      setIsEditing(true)
    }
  }, [initialData, initialEditing, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? (initialData ? "Edit Task" : "New Dev Task") : "Task Details"}
    >
      <div className="relative">
        {initialData && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute -top-11 right-0 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-all font-mono"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            EDIT_CORE
          </button>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#4e6a85] uppercase tracking-wider">Title</label>
              <input
                autoFocus required
                className="bg-[#0b1016] border border-[#233648] rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                value={formData.title}
                onChange={e => setFormData(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Implement OAuth2 flow..."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#4e6a85] uppercase tracking-wider">Description (Optional)</label>
              <textarea
                rows="4"
                className="bg-[#0b1016] border border-[#233648] rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono resize-none scrollbar-thin scrollbar-thumb-[#233648]"
                value={formData.description || ''}
                onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                placeholder="Detailed technical specs or context..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#4e6a85] uppercase tracking-wider">Priority</label>
                <select
                  className="bg-[#0b1016] border border-[#233648] rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-primary cursor-pointer appearance-none"
                  value={formData.priority}
                  onChange={e => setFormData(f => ({ ...f, priority: e.target.value }))}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#4e6a85] uppercase tracking-wider">Type</label>
                <select
                  className="bg-[#0b1016] border border-[#233648] rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-primary cursor-pointer appearance-none"
                  value={formData.tags[0]}
                  onChange={e => setFormData(f => ({ ...f, tags: [e.target.value] }))}
                >
                  <option>Feature</option>
                  <option>Bug</option>
                  <option>Refactor</option>
                  <option>DevOps</option>
                  <option>Backend</option>
                  <option>Frontend</option>
                  <option>Docs</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-[#4e6a85] uppercase tracking-wider">Progress</label>
                <span className="text-[11px] text-primary font-mono">{formData.progress}%</span>
              </div>
              <input
                type="range" min="0" max="100" step="5"
                className="accent-primary w-full h-1.5 bg-[#233648] rounded-full cursor-pointer appearance-none"
                value={formData.progress || 0}
                onChange={e => setFormData(f => ({ ...f, progress: parseInt(e.target.value) }))}
              />
            </div>
            <div className="pt-2 pb-1">
              <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 font-mono">
                {initialData ? "SAVE_CHANGES" : "COMMIT_TASK"}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#4e6a85] uppercase tracking-wider">Title</label>
              <h4 className="text-lg font-bold text-white leading-tight">{formData.title}</h4>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#4e6a85] uppercase tracking-wider">Description</label>
              <p className="text-sm text-[#92adc9] font-mono leading-relaxed bg-[#0b1016] p-4 rounded-xl border border-[#233648] whitespace-pre-wrap">
                {formData.description || 'No detailed description provided for this task.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#4e6a85] uppercase tracking-wider">Metadata</label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#4e6a85]">priority_high</span>
                    <span className={`text-xs font-bold uppercase ${formData.priority === 'Critical' ? 'text-red-500' : formData.priority === 'High' ? 'text-amber-500' : 'text-white'}`}>
                      {formData.priority} Priority
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#4e6a85]">tag</span>
                    <span className="text-xs text-white">{formData.tags[0]}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#4e6a85] uppercase tracking-wider">Assignee</label>
                <div className="flex items-center gap-3">
                  <div className="size-6 rounded-full bg-cover bg-center border border-primary/30" style={{ backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.assignee}')` }}></div>
                  <span className="text-xs text-white">{formData.assignee}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pb-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-[#4e6a85] uppercase tracking-wider">
                <span>Task Progress</span>
                <span className="text-primary">{formData.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#233648] rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${formData.progress}%` }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
