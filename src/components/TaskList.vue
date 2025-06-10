<template>
    <ul>
        <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle-complete="$emit('toggle-complete', task.id)"
        @delete-task="$emit('delete-task', task.id)"
        />
    </ul>
</template>

<script setup>
import TaskItem from './TaskItem.vue'
defineProps({ tasks: Array })
defineEmits(['toggle-complete', 'delete-task'])
</script>
