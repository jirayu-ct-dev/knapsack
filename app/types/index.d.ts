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