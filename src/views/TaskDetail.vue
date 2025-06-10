<template>
    <div class="p-4">
        <router-link to="/" class="text-blue-500">← Kembali</router-link>
        <h2 class="text-2xl font-bold mt-4">{{ task?.title }}</h2>
        <p>Kategori: {{ task?.category }}</p>
        <p>Status: {{ task?.completed ? 'Selesai' : 'Belum selesai' }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useRoute } from 'vue-router'

const store = useTaskStore()
const route = useRoute()
const task = ref(null)

onMounted(() => {
    task.value = store.getTaskById(route.params.id)
})
</script>
