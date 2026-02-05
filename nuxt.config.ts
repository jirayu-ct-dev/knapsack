// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxtjs/tailwindcss'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'th'
      },
      title: 'Knapsack Calculator - เครื่องคำนวณปัญหากระเป๋าเป้',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'เครื่องคำนวณปัญหา Knapsack เปรียบเทียบ Greedy Algorithm และ Dynamic Programming สำหรับวิชาการออกแบบและการวิเคราะห์ขั้นตอนวิธี' },
        { name: 'keywords', content: 'Knapsack, Greedy Algorithm, Dynamic Programming, Algorithm, กระเป๋าเป้, อัลกอริธึม' },
        { name: 'author', content: 'Knapsack Team' },
        // Open Graph
        { property: 'og:title', content: 'Knapsack Calculator - เครื่องคำนวณปัญหากระเป๋าเป้' },
        { property: 'og:description', content: 'เปรียบเทียบ Fractional Knapsack (Greedy) vs 0/1 Knapsack (Dynamic Programming)' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'th_TH' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Knapsack Calculator' },
        { name: 'twitter:description', content: 'เครื่องคำนวณปัญหา Knapsack เปรียบเทียบ Greedy และ DP' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})