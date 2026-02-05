import type { ItemGreedyFractional, ResultGreedyFractional } from "~/types"


/** Pseudo Code
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
 * n : จำนวนสินค้า --> totalItems
 * v : อาเรย์มูลค่าสินค้า --> values
 * w : อาเรย์น้ำหนักสินค้า --> weights
 * W: น้ำหนักรวม --> capacity
*/


export const greedyFractionalKnapsack = (totalItems: number, values: number[], weights: number[], capacity: number): ResultGreedyFractional => {
    // 01: เตรียมข้อมูลสินค้า
    const items: ItemGreedyFractional[] = []

    console.log('--- เริ่มต้นเตรียมข้อมูลสินค้า ---')

    // ตรวจสอบความปลอดภัยของข้อมูล (ป้องกัน Index out of bounds)
    const safeLoopCount = Math.min(totalItems, values.length, weights.length)

    for (let i = 0; i < safeLoopCount; i++) {
        const val = values[i]
        const wt = weights[i]

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

    let currentWeight = 0 // น้ำหนักปัจจุบันในกระเป๋า
    let totalValue = 0 // มูลค่ารวมในกระเป๋า
    const selectedItems = [] // รายการสินค้าที่ถูกเลือก

    let i = 0
    const validItemCount = items.length

    console.log(`\n--- เริ่มกระบวนการหยิบของใส่กระเป๋า (รับน้ำหนักสูงสุด W = ${capacity}) ---`)

    // 04: วนลูปหยิบของ ตราบใดที่ยังมีของให้หยิบ และ กระเป๋ายังไม่เต็ม
    while (i < validItemCount && currentWeight < capacity) {
        const item = items[i]

        if (!item) {
            i++
            continue
        }

        console.log(`\nพิจารณาสินค้าชิ้นที่ ${item.index} (Value: ${item.value}, Weight: ${item.weight}, Ratio: ${item.ratio.toFixed(2)})`)
        console.log(`สถานะกระเป๋าปัจจุบัน: น้ำหนัก ${currentWeight}/${capacity}, มูลค่ารวม ${totalValue}`)

        // กรณีที่ 1: สินค้าชิ้นนี้ใส่ลงในกระเป๋าได้ทั้งชิ้น (น้ำหนักไม่เกิน)
        if (currentWeight + item.weight <= capacity) {
            console.log(`-> หยิบได้ "ทั้งชิ้น" (น้ำหนัก ${item.weight} <= พื้นที่เหลือ ${capacity - currentWeight})`)

            currentWeight += item.weight // เพิ่มน้ำหนักลงในกระเป๋า
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
            console.log(`-> หยิบได้ "บางส่วน" (น้ำหนัก ${item.weight} > พื้นที่เหลือ ${capacity - currentWeight})`)

            // คำนวณพื้นที่ที่เหลือในกระเป๋า
            const remainingCapacity = capacity - currentWeight

            // คำนวณสัดส่วนที่หยิบได้ (พื้นที่เหลือ / น้ำหนักของสินค้า)
            const fraction = remainingCapacity / item.weight

            // คำนวณมูลค่าที่จะได้ตามสัดส่วน
            const fractionalValue = item.value * fraction

            console.log(`   พื้นที่เหลือ: ${remainingCapacity}`)
            console.log(`   สัดส่วนที่หยิบ: ${remainingCapacity} / ${item.weight} = ${fraction.toFixed(2)}`)
            console.log(`   มูลค่าที่ได้เพิ่ม: ${item.value} * ${fraction.toFixed(2)} = ${fractionalValue.toFixed(2)}`)

            currentWeight += remainingCapacity // น้ำหนักจะเต็ม W พอดี
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
    console.log(`น้ำหนักรวม: ${currentWeight}/${capacity}`)
    console.log(`มูลค่ารวม: ${totalValue}`)

    return {
        totalValue,
        totalWeight: currentWeight,
        selectedItems
    }
}