<script setup lang="ts">
import type { ResultGreedyFractional, ResultKnapsackDP } from '~/types'

// SEO
useSeoMeta({
    title: 'Knapsack Calculator - เครื่องคำนวณปัญหากระเป๋าเป้',
    description: 'เครื่องคำนวณปัญหา Knapsack เปรียบเทียบ Fractional Knapsack (Greedy) และ 0/1 Knapsack (Dynamic Programming)',
    ogTitle: 'Knapsack Calculator',
    ogDescription: 'เปรียบเทียบ Greedy Algorithm vs Dynamic Programming'
})

// Input State
const capacity = ref<number>(50)
const itemsInput = ref<Array<{ value: number; weight: number }>>([
    { value: 60, weight: 10 },
    { value: 100, weight: 20 },
    { value: 120, weight: 30 }
])

// Results State
const greedyResult = ref<ResultGreedyFractional | null>(null)
const dpResult = ref<ResultKnapsackDP | null>(null)
const isCalculated = ref(false)

// Alert State
const alertMessage = ref('')
const showAlertBox = ref(false)

const showAlert = (message: string) => {
    alertMessage.value = message
    showAlertBox.value = true
}

const closeAlert = () => {
    showAlertBox.value = false
}

// Add new item
const addItem = () => {
    itemsInput.value.push({ value: 0, weight: 0 })
}

// Remove item
const removeItem = (index: number) => {
    if (itemsInput.value.length > 1) {
        itemsInput.value.splice(index, 1)
    }
}

// Calculate both algorithms
const calculate = () => {
    const values = itemsInput.value.map(item => item.value)
    const weights = itemsInput.value.map(item => item.weight)
    const n = itemsInput.value.length
    const W = capacity.value

    if (W <= 0) {
        showAlert('กรุณาใส่ความจุกระเป๋าที่มากกว่า 0')
        return
    }

    if (values.some(v => v < 0) || weights.some(w => w <= 0)) {
        showAlert('กรุณาใส่มูลค่าและน้ำหนักที่ถูกต้อง')
        return
    }

    greedyResult.value = greedyFractionalKnapsack(n, values, weights, W)
    dpResult.value = dynamicProgrammingKnapsack(n, values, weights, W)
    isCalculated.value = true
}

// Reset form
const resetForm = () => {
    capacity.value = 50
    itemsInput.value = [
        { value: 10, weight: 1 },
        { value: 30, weight: 2 },
        { value: 40, weight: 3 }
    ]
    greedyResult.value = null
    dpResult.value = null
    isCalculated.value = false
}

const formatNumber = (num: number) => {
    return Number.isInteger(num) ? num : num.toFixed(2)
}

const formatPercentage = (fraction: number) => {
    return (fraction * 100).toFixed(0) + '%'
}
</script>

<template>
    <!-- Alert Component -->
    <Alert :message="alertMessage" :show="showAlertBox" @close="closeAlert" />

    <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Knapsack Calculator</h1>
            <p class="text-gray-600">เปรียบเทียบ Fractional Knapsack (Greedy) vs 0/1 Knapsack (DP)</p>
        </div>

        <!-- Input Section -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">ข้อมูลสินค้า</h2>

            <!-- Capacity -->
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">ความจุกระเป๋า (W)</label>
                <input v-model.number="capacity" type="number" min="1"
                    class="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400" />
            </div>

            <!-- Items Table -->
            <div class="overflow-x-auto mb-4">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b border-gray-200">
                            <th class="py-2 px-3 text-left font-medium text-gray-700">#</th>
                            <th class="py-2 px-3 text-left font-medium text-gray-700">มูลค่า (V)</th>
                            <th class="py-2 px-3 text-left font-medium text-gray-700">น้ำหนัก (W)</th>
                            <th class="py-2 px-3 text-left font-medium text-gray-700">V/W</th>
                            <th class="py-2 px-3 text-left font-medium text-gray-700"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in itemsInput" :key="index" class="border-b border-gray-100">
                            <td class="py-2 px-3 text-gray-900">{{ index + 1 }}</td>
                            <td class="py-2 px-3">
                                <input v-model.number="item.value" type="number" min="0"
                                    class="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400" />
                            </td>
                            <td class="py-2 px-3">
                                <input v-model.number="item.weight" type="number" min="1"
                                    class="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400" />
                            </td>
                            <td class="py-2 px-3 text-gray-600 font-mono">
                                {{ item.weight > 0 ? (item.value / item.weight).toFixed(2) : '-' }}
                            </td>
                            <td class="py-2 px-3">
                                <button @click="removeItem(index)" :disabled="itemsInput.length <= 1"
                                    class="text-gray-400 hover:text-gray-600 disabled:opacity-30">
                                    ✕
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Buttons -->
            <div class="flex gap-3">
                <button @click="addItem" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                    + เพิ่มสินค้า
                </button>
                <button @click="calculate"
                    class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-sm">
                    คำนวณ
                </button>
                <button @click="resetForm" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                    รีเซ็ต
                </button>
            </div>
        </div>

        <!-- Results -->
        <div v-if="isCalculated" class="space-y-6">
            <!-- Fractional Knapsack -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-1">Fractional Knapsack (Greedy)</h2>
                <p class="text-sm text-gray-500 mb-4">สิ่งของแบ่งส่วนได้</p>

                <div v-if="greedyResult">
                    <div class="mb-4 p-4 bg-gray-50 rounded-md">
                        <div class="text-sm text-gray-600">มูลค่ารวมสูงสุด</div>
                        <div class="text-2xl font-bold text-gray-900">{{ formatNumber(greedyResult.totalValue) }}</div>
                        <div class="text-sm text-gray-500">น้ำหนักรวม: {{ formatNumber(greedyResult.totalWeight) }} / {{
                            capacity }}</div>
                    </div>

                    <div class="text-sm font-medium text-gray-700 mb-2">ลำดับการหยิบ:</div>
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="py-2 text-left font-medium text-gray-600">ลำดับ</th>
                                <th class="py-2 text-left font-medium text-gray-600">สินค้า</th>
                                <th class="py-2 text-left font-medium text-gray-600">น้ำหนักที่หยิบ</th>
                                <th class="py-2 text-left font-medium text-gray-600">มูลค่าที่ได้</th>
                                <th class="py-2 text-left font-medium text-gray-600">สัดส่วน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, idx) in greedyResult.selectedItems" :key="idx"
                                class="border-b border-gray-100">
                                <td class="py-2 text-gray-900">{{ idx + 1 }}</td>
                                <td class="py-2 text-gray-900">ชิ้นที่ {{ item.index }}</td>
                                <td class="py-2 text-gray-600">{{ formatNumber(item.weightTaken) }}</td>
                                <td class="py-2 text-gray-600">{{ formatNumber(item.valueTaken) }}</td>
                                <td class="py-2">
                                    <span :class="item.fraction === 1 ? 'text-gray-900' : 'text-gray-500'">
                                        {{ formatPercentage(item.fraction) }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 0/1 Knapsack -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-1">0/1 Knapsack (Dynamic Programming)</h2>
                <p class="text-sm text-gray-500 mb-4">เลือกหรือไม่เลือก</p>

                <div v-if="dpResult">
                    <div class="mb-4 p-4 bg-gray-50 rounded-md">
                        <div class="text-sm text-gray-600">มูลค่ารวมสูงสุด</div>
                        <div class="text-2xl font-bold text-gray-900">{{ dpResult.maxValue }}</div>
                        <div class="text-sm text-gray-500">
                            น้ำหนักรวม: {{dpResult.selectedItems.reduce((sum, i) => sum + i.weight, 0)}} / {{ capacity
                            }}
                        </div>
                    </div>

                    <div class="text-sm font-medium text-gray-700 mb-2">สินค้าที่เลือก:</div>
                    <table class="w-full text-sm mb-6">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="py-2 text-left font-medium text-gray-600">สินค้า</th>
                                <th class="py-2 text-left font-medium text-gray-600">มูลค่า</th>
                                <th class="py-2 text-left font-medium text-gray-600">น้ำหนัก</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in dpResult.selectedItems" :key="item.index"
                                class="border-b border-gray-100">
                                <td class="py-2 text-gray-900">ชิ้นที่ {{ item.index }}</td>
                                <td class="py-2 text-gray-600">{{ item.value }}</td>
                                <td class="py-2 text-gray-600">{{ item.weight }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="text-sm font-medium text-gray-700 mb-2">ตาราง DP:</div>
                    <div class="overflow-x-auto">
                        <table class="text-xs border-collapse">
                            <thead>
                                <tr>
                                    <th class="px-2 py-1 bg-gray-100 border border-gray-200 font-medium">i \ W</th>
                                    <th v-for="(_, colIdx) in dpResult.dpTable[0]" :key="colIdx"
                                        class="px-2 py-1 bg-gray-100 border border-gray-200 font-medium">
                                        {{ colIdx }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, rowIdx) in dpResult.dpTable" :key="rowIdx">
                                    <td class="px-2 py-1 bg-gray-50 border border-gray-200 font-medium">{{ rowIdx }}
                                    </td>
                                    <td v-for="(cell, cellIdx) in row" :key="cellIdx"
                                        class="px-2 py-1 border border-gray-200 text-center" :class="{
                                            'bg-gray-900 text-white': rowIdx === dpResult.dpTable.length - 1 && cellIdx === row.length - 1
                                        }">
                                        {{ cell }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Comparison -->
            <div v-if="greedyResult && dpResult" class="bg-white border border-gray-200 rounded-lg p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">เปรียบเทียบผลลัพธ์</h2>
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div class="p-4 bg-gray-50 rounded-md">
                        <div class="text-sm text-gray-600 mb-1">Fractional</div>
                        <div class="text-xl font-bold text-gray-900">{{ formatNumber(greedyResult.totalValue) }}</div>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-md">
                        <div class="text-sm text-gray-600 mb-1">0/1 DP</div>
                        <div class="text-xl font-bold text-gray-900">{{ dpResult.maxValue }}</div>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-md">
                        <div class="text-sm text-gray-600 mb-1">ผลต่าง</div>
                        <div class="text-xl font-bold text-gray-900">{{ formatNumber(greedyResult.totalValue -
                            dpResult.maxValue) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
