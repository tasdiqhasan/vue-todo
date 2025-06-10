<template>
    <div class="container">
        <h1>📋 To-Do List Vue</h1>
        <TaskForm @add-task="addTask" />

        <!-- 🔍 Search Bar -->
        <input
        v-model="search"
        placeholder="Cari tugas..."
        class="border p-2 w-full mb-4"
        />

        <TaskFilter :currentFilter="filter" @change-filter="setFilter" />
        <TaskList
        :tasks="filteredTasks"
        @toggle-complete="toggleTask"
        @delete-task="deleteTask"
        />
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'
import TaskFilter from '../components/TaskFilter.vue'
import { useTaskStore } from '../stores/taskStore'

const store = useTaskStore()
const filter = ref('all')
const search = ref('')
const tasks = ref([])

// Load dari localStorage saat aplikasi dimulai
onMounted(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
        tasks.value = JSON.parse(storedTasks)
    }
})

// Simpan setiap kali `tasks` berubah
watch(tasks, (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
}, { deep: true })

function addTask(task) {
    tasks.value.push({ id: Date.now(), ...task, completed: false })
}

function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.completed = !task.completed
}

function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
}

function setFilter(value) {
    filter.value = value
}

// Gabungan filter + pencarian
const filteredAndSearchedTasks = computed(() => {
  return store.filteredTasks(filter.value).filter(task =>
    task.title.toLowerCase().includes(search.value.toLowerCase())
  )
})

const filteredTasks = computed(() => {
    if (filter.value === 'completed') return tasks.value.filter(t => t.completed)
    if (filter.value === 'active') return tasks.value.filter(t => !t.completed)
    return tasks.value
})
</script>


<style>
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 1rem;
        font-family: Arial, sans-serif;
    }
</style>
