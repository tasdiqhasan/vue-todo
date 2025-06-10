<template>
    <div>
        <label>Filter:</label>
        <select v-model="selected" @change="emit('change-filter', selected)">
            <option value="all">Semua</option>
            <option value="active">Belum Selesai</option>
            <option value="completed">Selesai</option>
        </select>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['change-filter'])
const props = defineProps({ currentFilter: String })
const selected = ref(props.currentFilter)
</script>
