<template>
    <form @submit.prevent="submit">
        <input v-model="title" placeholder="Tambahkan tugas..." required />
        <select v-model="category">
            <option value="Pekerjaan">Pekerjaan</option>
            <option value="Pribadi">Pribadi</option>
            <option value="Belajar">Belajar</option>
        </select>
        <button type="submit">Tambah</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-task'])

const title = ref('')
const category = ref('Pekerjaan')

function submit() {
    emit('add-task', {
        title: title.value,
        category: category.value
    })
    title.value = ''
}
</script>
