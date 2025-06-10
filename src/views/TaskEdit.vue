<template>
    <div class="p-4 max-w-lg mx-auto">
        <h2 class="text-2xl font-bold mb-4">✏️ Edit Tugas</h2>
        <form @submit.prevent="updateTask">
        <input v-model="taskData.title" class="border p-2 w-full mb-2" placeholder="Judul tugas" />
        <select v-model="taskData.category" class="border p-2 w-full mb-2">
            <option value="Pekerjaan">Pekerjaan</option>
            <option value="Pribadi">Pribadi</option>
            <option value="Belajar">Belajar</option>
        </select>
        <div class="flex gap-2 items-center mb-2">
            <label>Status:</label>
            <input type="checkbox" v-model="taskData.completed" /> Selesai
        </div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Simpan</button>
        <router-link to="/" class="ml-2 text-gray-600">Batal</router-link>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const store = useTaskStore()
const route = useRoute()
const router = useRouter()

const taskData = ref({
    title: '',
    category: '',
    completed: false,
})

onMounted(() => {
    const task = store.getTaskById(route.params.id)
    if (task) {
        taskData.value = { ...task }
    }
})

function updateTask() {
    const index = store.tasks.findIndex(t => t.id === route.params.id)
    if (index !== -1) {
        store.tasks[index] = { ...taskData.value }
    }
    router.push('/')
}
</script>
