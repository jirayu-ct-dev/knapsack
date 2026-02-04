<script setup lang="ts">
// Simple layout logic if needed
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <header class="bg-white shadow-sm sticky top-0 z-10">
            <div class="container mx-auto px-4 h-16 flex items-center justify-between">
                <h1 class="text-xl font-bold text-gray-800">Knapsack</h1>
                <nav>
                    <ul class="flex space-x-4">
                        <li>
                            <NuxtLink to="/" class="text-gray-600 hover:text-gray-900 transition-colors">Home</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/about" class="text-gray-600 hover:text-gray-900 transition-colors">About</NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

        <main class="flex-1 container mx-auto px-4 py-8">
            <slot />
        </main>

        <footer class="bg-white border-t border-gray-200 py-6">
            <div class="container mx-auto px-4 text-center text-gray-500 text-sm">
                &copy; {{ new Date().getFullYear() }} Knapsack App. All rights reserved.
            </div>
        </footer>
    </div>
</template>
