# 🎒 Knapsack Calculator

เครื่องคำนวณปัญหา Knapsack เปรียบเทียบระหว่าง **Fractional Knapsack (Greedy Algorithm)** และ **0/1 Knapsack (Dynamic Programming)**

## 📚 รายละเอียดโปรเจค

| หัวข้อ | รายละเอียด |
|--------|-----------|
| **วิชา** | การออกแบบและการวิเคราะห์ขั้นตอนวิธี (Algorithm Design and Analysis) |
| **ปีการศึกษา** | 2569 |
| **ชั้นปี / หมู่เรียน** | ปี 3 หมู่ที่ 2 |
| **อาจารย์ผู้สอน** | ดร. ชาติวุฒิ ธนาจิรันธร |

## 🎯 เกี่ยวกับโปรเจค

โปรเจคนี้เป็นเว็บแอปพลิเคชันสำหรับคำนวณปัญหา **Knapsack (กระเป๋าเป้)** โดยเปรียบเทียบ 2 อัลกอริธึม:

1. **Fractional Knapsack (Greedy Algorithm)**
   - สามารถแบ่งสินค้าได้
   - Time Complexity: `O(n log n)`
   - ใช้หลักการเลือกสิ่งที่คุ้มค่าที่สุดก่อน (Value/Weight ratio)

2. **0/1 Knapsack (Dynamic Programming)**
   - ไม่สามารถแบ่งสินค้าได้ (เลือกหรือไม่เลือก)
   - Time Complexity: `O(n × W)`
   - สร้างตาราง DP เพื่อหาค่าที่ดีที่สุด

## 👥 สมาชิกกลุ่ม

| ลำดับ | รหัสนักศึกษา | ชื่อ-นามสกุล |
|:-----:|:------------:|--------------|
| 1 | 660112230038 | นายจิรายุ ชมทอง |
| 2 | 660112230065 | นางสาวปัณฑารีย์ สุดหล้า |
| 3 | 660112230062 | นางสาวชลธิชา ศรีเชื้อ |
| 4 | 660112230067 | นางสาวศริวิมล ทองขันธ์ |
| 5 | 660112230068 | นางสาวศิรประภา วิชาศรี |

## 🛠️ สิ่งที่ต้องมีในเครื่อง (Prerequisites)

ก่อนรันโปรเจคนี้ ต้องติดตั้งสิ่งต่อไปนี้:

- **Node.js** v18.0.0 หรือสูงกว่า ([ดาวน์โหลด](https://nodejs.org/))
- **pnpm** v8.0.0 หรือสูงกว่า ([ติดตั้ง](https://pnpm.io/installation))

### ตรวจสอบเวอร์ชัน

```bash
node -v
pnpm -v
```

### ติดตั้ง pnpm (ถ้ายังไม่มี)

```bash
npm install -g pnpm
```

## 🚀 วิธีรันโปรเจค

### 1. Clone โปรเจค

```bash
git clone https://github.com/jirayu-ct-dev/knapsack.git
cd Knapsack
```

### 2. ติดตั้ง Dependencies

```bash
pnpm install
```

### 3. รันโปรเจค (Development Mode)

```bash
pnpm dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

## 📦 Build สำหรับ Production

```bash
# Build
pnpm build

# Preview
pnpm preview
```

## 📁 โครงสร้างโปรเจค

```
Knapsack/
├── app/
│   ├── components/
│   │   └── alert.vue           # Alert Component
│   ├── layouts/
│   │   └── default.vue         # Layout หลัก
│   ├── pages/
│   │   ├── index.vue           # หน้าหลัก (Calculator)
│   │   ├── member.vue          # หน้าสมาชิกกลุ่ม
│   │   └── manual.vue          # หน้าเอกสารประกอบ
│   ├── types/
│   │   └── index.d.ts          # TypeScript Types
│   └── utils/
│       ├── greedyFractionalKnapsack.ts   # Greedy Algorithm
│       └── dynamicProgrammingKnapsack.ts # DP Algorithm
├── nuxt.config.ts              # Nuxt Configuration
├── package.json
└── README.md
```

## 🔧 เทคโนโลยีที่ใช้

- **[Nuxt 3](https://nuxt.com/)** - Vue.js Framework
- **[Vue 3](https://vuejs.org/)** - JavaScript Framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS Framework
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## 📖 ฟีเจอร์

- ✅ คำนวณ Fractional Knapsack (Greedy)
- ✅ คำนวณ 0/1 Knapsack (Dynamic Programming)
- ✅ แสดงตาราง DP สำหรับการเรียนรู้
- ✅ เปรียบเทียบผลลัพธ์ทั้ง 2 วิธี
- ✅ เพิ่ม/ลบสินค้าได้
- ✅ เอกสารประกอบอธิบาย Time Complexity
- ✅ Responsive Design

## 📄 License

MIT License - สามารถใช้งานได้อย่างอิสระ
