<template>
    <div class="p-4 max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-4">📋 To-Do List</h1>

        <!-- Statistik -->
        <div class="bg-white p-4 shadow rounded mb-4">
        <h2 class="text-xl font-semibold mb-2">📊 Statistik</h2>
        <p>🧾 Total Tugas: <strong>{{ store.totalTasks }}</strong></p>
        <p>✅ Selesai: <strong>{{ store.completedTasks }}</strong></p>
        <p>📌 Belum Selesai: <strong>{{ store.activeTasks }}</strong></p>

        <div class="mt-2">
            <h3 class="font-semibold">📂 Tugas per Kategori:</h3>
            <ul class="list-disc ml-5">
            <li v-for="(count, cat) in store.tasksPerCategory" :key="cat">
                {{ cat }}: {{ count }}
            </li>
            </ul>
        </div>
        </div>

        <TaskForm @add-task="addTask" />

        <!-- 🔍 Search Bar -->
        <input
        v-model="search"
        placeholder="Cari tugas..."
        class="border p-2 w-full mb-4"
        />

        <TaskFilter :currentFilter="filter" @change-filter="setFilter" />
        <TaskList
        :tasks="filteredAndSearchedTasks"
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
import { useToast } from 'vue-toastification'
import { useTaskStore } from '../stores/taskStore'

const toast = useToast()
const store = useTaskStore()
const filter = ref('all')
const search = ref('')

function addTask(task) {
    store.addTask(task)
    toast.success('Tugas berhasil ditambahkan!')
}

function deleteTask(id) {
    store.deleteTask(id)
    toast.info('Tugas dihapus.')
}

function toggleTask(id) {
    store.toggleTask(id)
    toast('Status tugas diperbarui.', { type: 'default' })
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

</script>


<style>
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 1rem;
        font-family: Arial, sans-serif;
    }
</style>
