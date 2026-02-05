<script setup lang="ts">
const props = defineProps<{
    message: string
    show: boolean
}>()

const emit = defineEmits<{
    close: []
}>()

const closeAlert = () => {
    emit('close')
}

// Auto hide after 3 seconds when shown
watch(() => props.show, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            emit('close')
        }, 3000)
    }
})
</script>

<template>
    <Teleport to="body">
        <Transition name="slide">
            <div v-if="show"
                class="fixed top-5 left-1/2 -translate-x-1/2 z-50 p-4 bg-white border border-red-200 rounded-lg shadow-lg flex items-center gap-3 max-w-sm">
                <span class="text-red-500 text-lg">⚠</span>
                <p class="text-sm text-gray-700 flex-1">{{ message }}</p>
                <button @click="closeAlert" class="text-gray-400 hover:text-gray-600">✕</button>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from {
    opacity: 0;
    transform: translate(-50%, -20px);
}

.slide-leave-to {
    opacity: 0;
    transform: translate(-50%, -20px);
}
</style>