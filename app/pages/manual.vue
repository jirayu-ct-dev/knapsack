<script setup lang="ts">
// SEO
useSeoMeta({
    title: 'เอกสารประกอบ - Knapsack Calculator',
    description: 'วิธีใช้งาน แนวคิดการออกแบบอัลกอริธึม และการวิเคราะห์ Time Complexity ของ Greedy และ Dynamic Programming',
    ogTitle: 'เอกสารประกอบ Knapsack Calculator',
    ogDescription: 'สรุปแนวคิดการออกแบบอัลกอริธึมและการวิเคราะห์ความซับซ้อน'
})
</script>

<template>
    <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">วิธีใช้งานและเอกสารประกอบ</h1>
            <p class="text-gray-600">สรุปแนวคิดการออกแบบอัลกอริธึมและการวิเคราะห์ความซับซ้อน</p>
        </div>

        <!-- Table of Contents -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-3">สารบัญ</h2>
            <ul class="space-y-2 text-sm">
                <li><a href="#usage" class="text-gray-600 hover:text-gray-900">1. วิธีการใช้งาน</a></li>
                <li><a href="#knapsack-problem" class="text-gray-600 hover:text-gray-900">2. ปัญหา Knapsack คืออะไร</a>
                </li>
                <li><a href="#greedy" class="text-gray-600 hover:text-gray-900">3. Fractional Knapsack (Greedy
                        Algorithm)</a></li>
                <li><a href="#dp" class="text-gray-600 hover:text-gray-900">4. 0/1 Knapsack (Dynamic Programming)</a>
                </li>
                <li><a href="#comparison" class="text-gray-600 hover:text-gray-900">5. เปรียบเทียบทั้งสองวิธี</a></li>
            </ul>
        </div>

        <!-- Section 1: Usage -->
        <div id="usage" class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">1. วิธีการใช้งาน</h2>

            <div class="space-y-4 text-sm text-gray-700">
                <div>
                    <h3 class="font-medium text-gray-900 mb-2">ขั้นตอนที่ 1: กรอกข้อมูล</h3>
                    <ul class="list-disc list-inside space-y-1 ml-4">
                        <li>ใส่ <strong>ความจุกระเป๋า (W)</strong> - น้ำหนักสูงสุดที่กระเป๋ารับได้</li>
                        <li>ใส่ <strong>มูลค่า (Value)</strong> ของแต่ละสินค้า</li>
                        <li>ใส่ <strong>น้ำหนัก (Weight)</strong> ของแต่ละสินค้า</li>
                        <li>กดปุ่ม "+ เพิ่มสินค้า" เพื่อเพิ่มรายการ</li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-medium text-gray-900 mb-2">ขั้นตอนที่ 2: คำนวณ</h3>
                    <p>กดปุ่ม <strong>"คำนวณ"</strong> เพื่อประมวลผลทั้ง 2 อัลกอริธึม</p>
                </div>

                <div>
                    <h3 class="font-medium text-gray-900 mb-2">ขั้นตอนที่ 3: ดูผลลัพธ์</h3>
                    <ul class="list-disc list-inside space-y-1 ml-4">
                        <li>Fractional Knapsack: แสดงลำดับการหยิบ และสัดส่วนที่หยิบแต่ละชิ้น</li>
                        <li>0/1 Knapsack: แสดงสินค้าที่เลือก และตาราง DP</li>
                        <li>เปรียบเทียบมูลค่าสูงสุดของทั้งสองวิธี</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Section 2: What is Knapsack -->
        <div id="knapsack-problem" class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">2. ปัญหา Knapsack คืออะไร</h2>

            <div class="space-y-4 text-sm text-gray-700">
                <p>
                    <strong>ปัญหา Knapsack (กระเป๋าเป้)</strong> เป็นปัญหาการเพิ่มประสิทธิภาพ (Optimization Problem)
                    ที่ต้องการหาวิธีเลือกสิ่งของใส่กระเป๋าเป้ให้ได้ <strong>มูลค่ารวมสูงสุด</strong>
                    โดยมีข้อจำกัดด้าน <strong>น้ำหนักที่กระเป๋ารับได้</strong>
                </p>

                <div class="bg-gray-50 p-4 rounded-md">
                    <p class="font-medium text-gray-900 mb-2">โจทย์ปัญหา:</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>มีสินค้า n ชิ้น แต่ละชิ้นมีมูลค่า (v) และน้ำหนัก (w)</li>
                        <li>กระเป๋ารับน้ำหนักได้สูงสุด W</li>
                        <li>ต้องการเลือกสินค้าให้ได้มูลค่ารวมมากที่สุด โดยน้ำหนักรวมไม่เกิน W</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Section 3: Greedy Fractional -->
        <div id="greedy" class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">3. Fractional Knapsack (Greedy Algorithm)</h2>

            <div class="space-y-4 text-sm text-gray-700">
                <div>
                    <h3 class="font-medium text-gray-900 mb-2">แนวคิดการออกแบบ</h3>
                    <p>
                        ใช้ <strong>Greedy Strategy</strong> โดยเลือกสินค้าที่มี <strong>ความคุ้มค่าสูงสุด
                            (Value/Weight)</strong> ก่อน
                        สินค้าสามารถ <strong>แบ่งส่วน</strong> ได้ (เช่น ทองคำ, ข้าว)
                    </p>
                </div>

                <div class="bg-gray-50 p-4 rounded-md font-mono text-xs">
                    <p class="font-semibold mb-2 font-sans text-sm">Pseudo Code</p>
                    <pre>
Greedy_FractionalKnapsack(n, v, w, W)
01: sort items by vi/wi (descending)
02: i = 1, currentW = 0
03: while (currentW + wi ≤ W)
04:     take item i entirely
05:     currentW = currentW + wi
06:     i = i + 1
07: take (W - currentW) portion of item i
</pre>
                </div>

                <div>
                    <h3 class="font-medium text-gray-900 mb-2">การวิเคราะห์ Time Complexity</h3>
                    <table class="w-full text-sm border-collapse">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="py-2 text-left font-medium">ขั้นตอน</th>
                                <th class="py-2 text-left font-medium">Complexity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-100">
                                <td class="py-2">คำนวณ Ratio (v/w)</td>
                                <td class="py-2 font-mono">O(n)</td>
                            </tr>
                            <tr class="border-b border-gray-100">
                                <td class="py-2">เรียงลำดับ (Sort)</td>
                                <td class="py-2 font-mono">O(n log n)</td>
                            </tr>
                            <tr class="border-b border-gray-100">
                                <td class="py-2">วนลูปเลือกสินค้า</td>
                                <td class="py-2 font-mono">O(n)</td>
                            </tr>
                            <tr class="font-semibold">
                                <td class="py-2">รวม</td>
                                <td class="py-2 font-mono text-gray-900">O(n log n)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="bg-gray-900 text-white p-4 rounded-md">
                    <p><strong>Space Complexity:</strong> O(n) สำหรับเก็บข้อมูลสินค้า</p>
                </div>
            </div>
        </div>

        <!-- Section 4: Dynamic Programming -->
        <div id="dp" class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">4. 0/1 Knapsack (Dynamic Programming)</h2>

            <div class="space-y-4 text-sm text-gray-700">
                <div>
                    <h3 class="font-medium text-gray-900 mb-2">แนวคิดการออกแบบ</h3>
                    <p>
                        ใช้ <strong>Dynamic Programming (Bottom-Up)</strong> สร้างตาราง S[i][j]
                        เก็บมูลค่าสูงสุดที่ได้จากการพิจารณาสินค้า i ชิ้นแรก โดยมีความจุ j
                        สินค้า <strong>ไม่สามารถแบ่ง</strong> ได้ (เลือกหรือไม่เลือก)
                    </p>
                </div>

                <div class="bg-gray-50 p-4 rounded-md font-mono text-xs">
                    <p class="font-semibold mb-2 font-sans text-sm">Pseudo Code</p>
                    <pre>
Knapsack_DP(n, v, w, W)
01: init S[0][j] = 0 for j = 0 to W
02: init S[i][0] = 0 for i = 0 to n
03: for i = 1 to n do
04:     for j = 1 to W do
05:         S[i][j] = S[i-1][j]  // ไม่เลือกสินค้า i
06:         if (wi ≤ j) and (S[i-1][j-wi] + vi > S[i][j])
07:             S[i][j] = S[i-1][j-wi] + vi  // เลือกสินค้า i
08: return S[n][W]</pre>
                </div>

                <div>
                    <h3 class="font-medium text-gray-900 mb-2">สูตร Recurrence Relation</h3>
                    <div class="bg-gray-50 p-4 rounded-md font-mono text-center">
                        S[i][j] = max(S[i-1][j], S[i-1][j-w<sub>i</sub>] + v<sub>i</sub>)
                    </div>
                </div>

                <div>
                    <h3 class="font-medium text-gray-900 mb-2">การวิเคราะห์ Time Complexity</h3>
                    <table class="w-full text-sm border-collapse">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="py-2 text-left font-medium">ขั้นตอน</th>
                                <th class="py-2 text-left font-medium">Complexity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-100">
                                <td class="py-2">สร้างตาราง</td>
                                <td class="py-2 font-mono">O(n × W)</td>
                            </tr>
                            <tr class="border-b border-gray-100">
                                <td class="py-2">เติมค่าในตาราง (2 loops)</td>
                                <td class="py-2 font-mono">O(n × W)</td>
                            </tr>
                            <tr class="border-b border-gray-100">
                                <td class="py-2">Backtrack หาสินค้า</td>
                                <td class="py-2 font-mono">O(n)</td>
                            </tr>
                            <tr class="font-semibold">
                                <td class="py-2">รวม</td>
                                <td class="py-2 font-mono text-gray-900">O(n × W)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="bg-gray-900 text-white p-4 rounded-md">
                    <p><strong>Space Complexity:</strong> O(n × W) สำหรับตาราง DP</p>
                </div>
            </div>
        </div>

        <!-- Section 5: Comparison -->
        <div id="comparison" class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">5. เปรียบเทียบทั้งสองวิธี</h2>

            <div class="overflow-x-auto">
                <table class="w-full text-sm border-collapse">
                    <thead>
                        <tr class="border-b border-gray-200 bg-gray-50">
                            <th class="py-3 px-4 text-left font-medium">เกณฑ์</th>
                            <th class="py-3 px-4 text-left font-medium">Fractional (Greedy)</th>
                            <th class="py-3 px-4 text-left font-medium">0/1 Knapsack (DP)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b border-gray-100">
                            <td class="py-3 px-4 font-medium">แบ่งสินค้าได้</td>
                            <td class="py-3 px-4 text-green-600">✓ ได้</td>
                            <td class="py-3 px-4 text-red-600">✗ ไม่ได้</td>
                        </tr>
                        <tr class="border-b border-gray-100">
                            <td class="py-3 px-4 font-medium">Time Complexity</td>
                            <td class="py-3 px-4 font-mono">O(n log n)</td>
                            <td class="py-3 px-4 font-mono">O(n × W)</td>
                        </tr>
                        <tr class="border-b border-gray-100">
                            <td class="py-3 px-4 font-medium">Space Complexity</td>
                            <td class="py-3 px-4 font-mono">O(n)</td>
                            <td class="py-3 px-4 font-mono">O(n × W)</td>
                        </tr>
                        <tr class="border-b border-gray-100">
                            <td class="py-3 px-4 font-medium">Optimal Solution</td>
                            <td class="py-3 px-4">✓ รับประกัน Optimal</td>
                            <td class="py-3 px-4">✓ รับประกัน Optimal</td>
                        </tr>
                        <tr class="border-b border-gray-100">
                            <td class="py-3 px-4 font-medium">มูลค่าที่ได้</td>
                            <td class="py-3 px-4">มักสูงกว่าหรือเท่ากับ</td>
                            <td class="py-3 px-4">อาจน้อยกว่า (เพราะแบ่งไม่ได้)</td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-medium">เหมาะกับ</td>
                            <td class="py-3 px-4">ทองคำ, น้ำมัน, ข้าว</td>
                            <td class="py-3 px-4">โทรศัพท์, โน้ตบุ๊ค, เครื่องใช้ไฟฟ้า</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-4 p-4 bg-gray-50 rounded-md text-sm text-gray-700">
                <p>
                    <strong>💡 หมายเหตุ:</strong>
                    Fractional Knapsack มักได้มูลค่าสูงกว่าเพราะสามารถหยิบส่วนที่เหลือของสินค้าชิ้นสุดท้ายได้
                    ทำให้ใช้พื้นที่กระเป๋าได้เต็มที่
                </p>
            </div>
        </div>
    </div>
</template>