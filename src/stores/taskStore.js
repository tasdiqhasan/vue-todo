import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref(JSON.parse(localStorage.getItem('tasks')) || [])

    watch(tasks, (newTasks) => {
        localStorage.setItem('tasks', JSON.stringify(newTasks))
    }, { deep: true })

    const addTask = (task) => {
        tasks.value.push({ id: Date.now().toString(), ...task, completed: false })
    }

    const deleteTask = (id) => {
        tasks.value = tasks.value.filter(t => t.id !== id)
    }

    const toggleTask = (id) => {
        const t = tasks.value.find(t => t.id === id)
        if (t) t.completed = !t.completed
    }

    const getTaskById = (id) => tasks.value.find(t => t.id === id)

    const filteredTasks = (filter) => {
        if (filter === 'completed') return tasks.value.filter(t => t.completed)
        if (filter === 'active') return tasks.value.filter(t => !t.completed)
        return tasks.value
    }

    return { tasks, addTask, deleteTask, toggleTask, getTaskById, filteredTasks }
})
