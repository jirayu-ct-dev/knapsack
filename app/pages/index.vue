<script setup lang="ts">


// Example Usage (Test)
const runExample = () => {
    // ข้อมูลทดสอบ
    const v = [20, 30, 66, 40, 60] // มูลค่า
    const w = [10, 20, 30, 40, 50] // น้ำหนัก
    const W = 100 // น้ำหนักที่รับได้สูงสุด
    const n = v.length // จำนวนสินค้า

    const result = greedyFractionalKnapsack(n, v, w, W)
    console.log('Final Result Object:', result)
}

onMounted(() => {
    runExample()
})
</script>

<template>
    <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">Greedy Fractional Knapsack</h1>
    </div>
</template>