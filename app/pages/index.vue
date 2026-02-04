<script setup lang="ts">
/**
 * Greedy_FractionalKnapsack( n, v, w, W )
 * 01: sort items in decreasing order of vi / wi
 * 02: i = 1
 * 03: currentW = 0
 * 04: while (currentW + wi < W)
 * 05: take item of weight wi and cost vi
 * 06: currentW = currentW + wi
 * 07: i = i + 1
 * 08: end;
 * 09: take W - currentW portion of item i
 * 
 * n : จำนวนสินค้า
 * v : อาเรย์มูลค่าสินค้า
 * w : อาเรย์น้ำหนักสินค้า
 * W: น้ำหนักรวม
 */

interface Item {
    index: number
    value: number
    weight: number
    ratio: number
}

interface Result {
    totalValue: number
    totalWeight: number
    selectedItems: Array<{
        index: number
        weightTaken: number
        valueTaken: number
        fraction: number
    }>
}

const greedyFractionalKnapsack = (n: number, v: number[], w: number[], W: number): Result => {
    // 01: เตรียมข้อมูลสินค้า
    const items: Item[] = []

    console.log('--- เริ่มต้นเตรียมข้อมูลสินค้า ---')

    // ตรวจสอบความปลอดภัยของข้อมูล (ป้องกัน Index out of bounds)
    const safeLoopCount = Math.min(n, v.length, w.length)

    for (let i = 0; i < safeLoopCount; i++) {
        const val = v[i]
        const wt = w[i]

        if (val !== undefined && wt !== undefined) {
            items.push({
                index: i + 1, // ลำดับสินค้า (เริ่มที่ 1)
                value: val,
                weight: wt,
                ratio: val / wt // คำนวณความคุ้มค่า (มูลค่า / น้ำหนัก)
            })
        }
    }

    // 02: เรียงลำดับสินค้าตามความคุ้มค่า (Ratio) จากมากไปน้อย
    // เพื่อให้เราเลือกหยิบชิ้นที่คุ้มค่าที่สุดก่อน (Greedy Strategy)
    items.sort((a, b) => b.ratio - a.ratio)

    console.log('รายการสินค้าหลังเรียงตามความคุ้มค่า:', items)

    let currentW = 0 // น้ำหนักปัจจุบันในกระเป๋า
    let totalValue = 0 // มูลค่ารวมในกระเป๋า
    const selectedItems = [] // รายการสินค้าที่ถูกเลือก

    let i = 0
    const validItemCount = items.length

    console.log(`\n--- เริ่มกระบวนการหยิบของใส่กระเป๋า (รับน้ำหนักสูงสุด W = ${W}) ---`)

    // 04: วนลูปหยิบของ ตราบใดที่ยังมีของให้หยิบ และ กระเป๋ายังไม่เต็ม
    while (i < validItemCount && currentW < W) {
        const item = items[i]

        if (!item) {
            i++
            continue
        }

        console.log(`\nพิจารณาสินค้าชิ้นที่ ${item.index} (Value: ${item.value}, Weight: ${item.weight}, Ratio: ${item.ratio.toFixed(2)})`)
        console.log(`สถานะกระเป๋าปัจจุบัน: น้ำหนัก ${currentW}/${W}, มูลค่ารวม ${totalValue}`)

        // กรณีที่ 1: สินค้าชิ้นนี้ใส่ลงในกระเป๋าได้ทั้งชิ้น (น้ำหนักไม่เกิน)
        if (currentW + item.weight <= W) {
            console.log(`-> หยิบได้ "ทั้งชิ้น" (น้ำหนัก ${item.weight} <= พื้นที่เหลือ ${W - currentW})`)

            currentW += item.weight // เพิ่มน้ำหนักลงในกระเป๋า
            totalValue += item.value // เพิ่มมูลค่าของสินค้า

            selectedItems.push({
                index: item.index,
                weightTaken: item.weight,
                valueTaken: item.value,
                fraction: 1 // หยิบไป 100% (1.0)
            })
        }
        // กรณีที่ 2: สินค้าชิ้นนี้ใส่ได้แค่บางส่วน (พื้นที่เหลือไม่พอสำหรับทั้งชิ้น)
        else {
            console.log(`-> หยิบได้ "บางส่วน" (น้ำหนัก ${item.weight} > พื้นที่เหลือ ${W - currentW})`)

            // คำนวณพื้นที่ที่เหลือในกระเป๋า
            const remainingCapacity = W - currentW

            // คำนวณสัดส่วนที่หยิบได้ (พื้นที่เหลือ / น้ำหนักของสินค้า)
            const fraction = remainingCapacity / item.weight

            // คำนวณมูลค่าที่จะได้ตามสัดส่วน
            const fractionalValue = item.value * fraction

            console.log(`   พื้นที่เหลือ: ${remainingCapacity}`)
            console.log(`   สัดส่วนที่หยิบ: ${remainingCapacity} / ${item.weight} = ${fraction.toFixed(2)}`)
            console.log(`   มูลค่าที่ได้เพิ่ม: ${item.value} * ${fraction.toFixed(2)} = ${fractionalValue.toFixed(2)}`)

            currentW += remainingCapacity // น้ำหนักจะเต็ม W พอดี
            totalValue += fractionalValue // เพิ่มมูลค่าตามสัดส่วน

            selectedItems.push({
                index: item.index,
                weightTaken: remainingCapacity,
                valueTaken: fractionalValue,
                fraction: fraction
            })
        }

        // ขยับไปพิจารณาสินค้าชิ้นถัดไป
        i++
    }

    console.log('\n--- สรุปผลลัพธ์ ---')
    console.log(`น้ำหนักรวม: ${currentW}/${W}`)
    console.log(`มูลค่ารวม: ${totalValue}`)

    return {
        totalValue,
        totalWeight: currentW,
        selectedItems
    }
}

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
        <p class="mb-4">เปิด Console (F12) เพื่อดูขั้นตอนการทำงานอย่างละเอียด</p>
    </div>
</template>