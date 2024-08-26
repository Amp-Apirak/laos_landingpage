// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ใช้การขยายจาก Nuxt UI Pro เพื่อตั้งค่าธีมและ UI ที่กำหนดเอง
  extends: ['@nuxt/ui-pro'],

  // โมดูลที่ใช้ในโปรเจกต์นี้
  modules: [
    '@nuxt/content', // ใช้สำหรับจัดการเนื้อหาภายใน Nuxt
    '@nuxt/eslint', // ใช้ ESLint เพื่อตรวจสอบโค้ดตามมาตรฐานที่กำหนด
    '@nuxt/fonts', // ใช้จัดการฟอนต์ที่ต้องการในโปรเจกต์
    '@nuxt/image', // ใช้จัดการภาพในโปรเจกต์
    '@nuxtjs/i18n', // ใช้สำหรับจัดการหลายภาษา (Internationalization)
    '@nuxt/ui' // ใช้ Nuxt UI สำหรับองค์ประกอบของ UI ที่กำหนดไว้ล่วงหน้า
  ],

  // การตั้งค่าสำหรับ i18n (การสนับสนุนหลายภาษา)
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en-US.json' },
      { code: 'th', name: 'ไทย', iso: 'th-TH', file: 'th-TH.json' },
      { code: 'lo', name: 'ລາວ', iso: 'lo-LA', file: 'lo-LA.json' }
    ],
    defaultLocale: 'en', // กำหนดภาษาเริ่มต้นเป็นภาษาอังกฤษ
    langDir: 'lang', // โฟลเดอร์ที่เก็บไฟล์การแปล
    strategy: 'prefix', // ใช้เส้นทาง URL ที่มีคำนำหน้าเพื่อระบุภาษา (เช่น /th, /en)
    lazy: false, // ใช้งาน lazy loading สำหรับการเรียนรู้
    vueI18n: './i18n.config.ts' // ใช้ไฟล์การตั้งค่าเพิ่มเติมสำหรับ vue-i18n
  },

  // กฎการกำหนดเส้นทาง
  routeRules: {
    // วิธีแก้ไขชั่วคราวสำหรับปัญหา prerender ดูเพิ่มเติมที่ https://github.com/nuxt/nuxt/issues/27490
    '/': { prerender: true }
  },

  // การตั้งค่า DevTools
  devtools: {
    enabled: true // เปิดใช้งาน DevTools
  },

  // การตั้งค่า TypeScript
  typescript: {
    strict: false // ไม่ใช้ TypeScript ในโหมด strict
  },

  // การตั้งค่า compatibility สำหรับอนาคต
  future: {
    compatibilityVersion: 4 // กำหนดเวอร์ชันความเข้ากันได้ในอนาคต
  },

  // การตั้งค่า ESLint
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never', // ไม่ใช้ comma ด้านหลัง
        braceStyle: '1tbs' // ใช้ brace style แบบ 1TBS (One True Brace Style)
      }
    }
  },

  // กำหนดวันที่สำหรับ compatibility
  compatibilityDate: '2024-07-11'
})
