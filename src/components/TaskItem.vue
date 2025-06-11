<template>
    <li>
        <input type="checkbox" v-model="task.completed" @change="$emit('toggle-task')" />
        <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
        {{ task.title }} ({{ task.category }})
        </span>
        <button @click="$emit('delete-task')">Hapus</button>
    </li>
</template>

<script setup>
    defineProps({ task: Object })
    defineEmits(['toggle-task', 'delete-task'])
</script>
