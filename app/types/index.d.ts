export interface ItemGreedyFractional {
    index: number
    value: number
    weight: number
    ratio: number
}

export interface ResultGreedyFractional {
    totalValue: number
    totalWeight: number
    selectedItems: Array<{
        index: number
        weightTaken: number
        valueTaken: number
        fraction: number
    }>
}

// 0/1 Knapsack Dynamic Programming Types
export interface ResultKnapsackDP {
    maxValue: number
    selectedItems: Array<{
        index: number
        value: number
        weight: number
    }>
    dpTable: number[][] // ตาราง DP สำหรับแสดงขั้นตอน
}