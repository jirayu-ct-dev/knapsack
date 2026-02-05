<script setup lang="ts">
// SEO
useSeoMeta({
    title: 'สมาชิกกลุ่ม - Knapsack Calculator',
    description: 'รายชื่อสมาชิกกลุ่มโปรเจค Knapsack Calculator วิชาการออกแบบและการวิเคราะห์ขั้นตอนวิธี',
    ogTitle: 'สมาชิกกลุ่ม',
    ogDescription: 'รายชื่อสมาชิกกลุ่มโปรเจค Knapsack Calculator'
})

const members = [
    { id: "660112230038", name: "นายจิรายุ ชมทอง" },
    { id: "660112230065", name: "นางสาวปัณฑารีย์ สุดหล้า" },
    { id: "660112230062", name: "นางสาวชลธิชา ศรีเชื้อ" },
    { id: "660112230067", name: "นางสาวศริวิมล ทองขันธ์" },
    { id: "660112230068", name: "นางสาวศิรประภา วิชาศรี" },
]
</script>

<template>
    <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">สมาชิกกลุ่ม</h1>
            <p class="text-gray-600">โปรเจค Knapsack Calculator</p>
        </div>

        <!-- Members List -->
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-gray-200 bg-gray-50">
                        <th class="py-3 px-4 text-left font-medium text-gray-700">ลำดับ</th>
                        <th class="py-3 px-4 text-left font-medium text-gray-700">รหัสนักศึกษา</th>
                        <th class="py-3 px-4 text-left font-medium text-gray-700">ชื่อ-นามสกุล</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(member, index) in members" :key="member.id"
                        class="border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                        <td class="py-3 px-4 text-gray-600">{{ index + 1 }}</td>
                        <td class="py-3 px-4 text-gray-900 font-mono">{{ member.id }}</td>
                        <td class="py-3 px-4 text-gray-900">{{ member.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>