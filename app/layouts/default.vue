<script setup lang="ts">
// Simple layout logic if needed
</script>

<template>
    <div class="min-h-screen flex flex-col bg-gray-50 ">
        <header class="bg-white shadow-sm sticky top-0 z-10">
            <div class="container mx-auto px-4 h-16 flex items-center justify-between">
                <h1 class="text-xl font-bold text-gray-800">Knapsack</h1>
                <nav>
                    <ul class="flex space-x-4">
                        <li>
                            <NuxtLink to="/" class="text-gray-600 hover:text-gray-900 transition-colors"
                                active-class="text-gray-900 font-medium">
                                หน้าแรก
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/member" class="text-gray-600 hover:text-gray-900 transition-colors"
                                active-class="text-gray-900 font-medium">
                                สมาชิกกลุ่ม
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/manual" class="text-gray-600 hover:text-gray-900 transition-colors"
                                active-class="text-gray-900 font-medium">
                                เอกสารประกอบ
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

        <main class="flex-1 container mx-auto px-4 py-8">
            <slot />
        </main>

        <footer class="bg-white border-t border-gray-200 py-6">
            <div class="container mx-auto px-4 text-gray-500 text-sm">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p>&copy; {{ new Date().getFullYear() }} Knapsack App</p>
                    <p>วิชาการออกแบบและการวิเคราะห์ขั้นตอนวิธี ปี 3 หมู่ที่ 2 / 2569</p>
                    <p>อาจารย์ผู้สอน ดร. ชาติวุฒิ ธนาจิรันธร</p>
                </div>
            </div>
        </footer>
    </div>
</template>
