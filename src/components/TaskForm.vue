<template>
    <form @submit.prevent="submit">
        <input v-model="title" placeholder="Tambahkan tugas..." required />
        <select v-model="category" class="border p-2 w-full mb-2">
            <option v-for="cat in store.categories" :key="cat" :value="cat">
                {{ cat }}
            </option>
            <option disabled>──────────</option>
            <option value="__new">➕ Tambah kategori baru</option>
        </select>

        <div v-if="showNewCategory">
        <input
            v-model="newCategory"
            placeholder="Kategori baru"
            class="border p-2 w-full mb-2"
        />
        <button type="button" @click="addNewCategory" class="bg-gray-200 px-2 py-1 rounded text-sm">
            Simpan Kategori
        </button>
        </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Tambah</button>
    </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['add-task'])
const store = useTaskStore()
const toast = useToast()

const title = ref('')
const category = ref(store.categories[0])
const newCategory = ref('')
const showNewCategory = ref(false)

watch(category, (val) => {
    showNewCategory.value = val === '__new'
})

function addNewCategory() {
    if (newCategory.value.trim()) {
        store.addCategory(newCategory.value.trim())
        category.value = newCategory.value.trim()
        newCategory.value = ''
        showNewCategory.value = false
        toast.success('Kategori ditambahkan!')
    }
}

function submit() {
    emit('add-task', {
        title: title.value,
        category: category.value
    })
    title.value = ''
    category.value = store.categories[0]
}
</script>
