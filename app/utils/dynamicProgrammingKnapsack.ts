/**
 * 0/1 Knapsack - Dynamic Programming (Bottom-Up)
 * 
 * Knapsack( n, V, w, W )
 * 01: init S[0][j]=0 for every j=0,…,W // น้ำหนัก
 * 02: init S[i][0]=0 for every i=0,…,n // จำนวนชิ้นสินค้า
 * 03: for j=1 to W do
 * 04: for i=1 to n do
 * 05: S[i][j] = S[i-1][j]
 * 06: if (wi <= j) and (S[i-1][j-wi] + Vi > S[i][j]) then
 * 07: S[i][j] = S[i-1][j-wi] + Vi
 * 08: RETURN S[n][W]
 * 
 * n : จำนวนสินค้า --> totalItems
 * v : อาเรย์มูลค่าสินค้า --> values
 * w : อาเรย์น้ำหนักสินค้า --> weights
 * W: น้ำหนักรวม --> capacity
 */

import type { ResultKnapsackDP } from '~/types'

export const dynamicProgrammingKnapsack = (totalItems: number, values: number[], weights: number[], capacity: number): ResultKnapsackDP => {
    console.log('=== 0/1 Knapsack Dynamic Programming ===')
    console.log(`จำนวนสินค้า: ${totalItems}`)
    console.log(`มูลค่าสินค้า: [${values.join(', ')}]`)
    console.log(`น้ำหนักสินค้า: [${weights.join(', ')}]`)
    console.log(`ความจุกระเป๋า: ${capacity}`)

    // 01-02: สร้างตาราง DP ขนาด (n+1) x (W+1) และ initialize เป็น 0
    // maxValueTable[itemCount][capacityUsed] = มูลค่าสูงสุดที่ได้จากการพิจารณาสินค้า itemCount ชิ้นแรก โดยมีความจุ capacityUsed
    const maxValueTable: number[][] = []

    for (let itemCount = 0; itemCount <= totalItems; itemCount++) {
        maxValueTable[itemCount] = new Array(capacity + 1).fill(0)
    }

    console.log('\n--- เริ่มสร้างตาราง DP ---')

    // 03-07: วนลูปเติมตาราง
    for (let itemCount = 1; itemCount <= totalItems; itemCount++) {
        for (let capacityUsed = 1; capacityUsed <= capacity; capacityUsed++) {
            // ค่าดัชนีในอาเรย์ values และ weights เริ่มที่ 0 (ต้อง -1)
            const currentItemWeight = weights[itemCount - 1]!
            const currentItemValue = values[itemCount - 1]!

            // 05: ค่าเริ่มต้น = ไม่หยิบสินค้าชิ้นนี้ (ใช้ค่าจากแถวก่อนหน้า)
            const valueWithoutCurrentItem = maxValueTable[itemCount - 1]![capacityUsed]!
            maxValueTable[itemCount]![capacityUsed] = valueWithoutCurrentItem

            // 06-07: ถ้าน้ำหนักสินค้าไม่เกินความจุ และหยิบแล้วได้มูลค่ามากกว่า
            if (currentItemWeight <= capacityUsed) {
                const remainingCapacityAfterTake = capacityUsed - currentItemWeight
                const valueWithCurrentItem = maxValueTable[itemCount - 1]![remainingCapacityAfterTake]! + currentItemValue

                if (valueWithCurrentItem > maxValueTable[itemCount]![capacityUsed]!) {
                    maxValueTable[itemCount]![capacityUsed] = valueWithCurrentItem
                }
            }
        }
    }

    // แสดงตาราง DP
    console.log('\nตาราง DP (maxValueTable[itemCount][capacityUsed]):')
    console.log('itemCount\\capacityUsed\t' + Array.from({ length: capacity + 1 }, (_, col) => col).join('\t'))
    for (let itemCount = 0; itemCount <= totalItems; itemCount++) {
        console.log(`${itemCount}\t${maxValueTable[itemCount]!.join('\t')}`)
    }

    // 08: มูลค่าสูงสุดอยู่ที่ maxValueTable[totalItems][capacity]
    const maxValue = maxValueTable[totalItems]![capacity]!

    console.log(`\nมูลค่าสูงสุด: ${maxValue}`)

    // Backtrack เพื่อหาว่าหยิบสินค้าชิ้นไหนบ้าง
    console.log('\n--- Backtrack หาสินค้าที่เลือก ---')
    const selectedItems: Array<{ index: number; value: number; weight: number }> = []

    let remainingCapacity = capacity
    for (let itemCount = totalItems; itemCount > 0 && remainingCapacity > 0; itemCount--) {
        const currentMaxValue = maxValueTable[itemCount]![remainingCapacity]!
        const previousMaxValue = maxValueTable[itemCount - 1]![remainingCapacity]!

        // ถ้าค่าต่างจากแถวก่อนหน้า แสดงว่าหยิบสินค้าชิ้นนี้
        if (currentMaxValue !== previousMaxValue) {
            const selectedItemIndex = itemCount
            const selectedItemValue = values[itemCount - 1]!
            const selectedItemWeight = weights[itemCount - 1]!

            selectedItems.push({
                index: selectedItemIndex,
                value: selectedItemValue,
                weight: selectedItemWeight
            })

            console.log(`หยิบสินค้าชิ้นที่ ${selectedItemIndex} (มูลค่า: ${selectedItemValue}, น้ำหนัก: ${selectedItemWeight})`)

            remainingCapacity -= selectedItemWeight
        }
    }

    // เรียงลำดับสินค้าตาม index
    selectedItems.sort((a, b) => a.index - b.index)

    console.log('\n=== สรุปผลลัพธ์ ===')
    console.log(`มูลค่าสูงสุด: ${maxValue}`)
    console.log(`สินค้าที่เลือก:`, selectedItems)

    return {
        maxValue,
        selectedItems,
        dpTable: maxValueTable
    }
}
