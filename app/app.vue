<script setup lang="ts">
import { useI18n } from 'vue-i18n' // นำเข้า useI18n สำหรับจัดการการแปลภาษา

// ใช้ locale และ fallbackLocale จาก useI18n
const { locale } = useI18n()
const { fallbackLocale } = useI18n()

// กำหนด fallbackLocale เป็น 'en' (ภาษาอังกฤษ)
fallbackLocale.value = 'en'

// ตั้งค่า meta และ head ของหน้าเว็บด้วย useHead
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' } // ตั้งค่า viewport สำหรับการแสดงผลที่เหมาะสมบนทุกอุปกรณ์
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' } // ตั้งค่า favicon ของหน้าเว็บ
  ],
  htmlAttrs: {
    lang: 'en' // ตั้งค่า attribute lang ในแท็ก <html> เป็นภาษาอังกฤษ
  }
})

// ตั้งค่า SEO meta tags ด้วย useSeoMeta เพื่อเพิ่มข้อมูล SEO ในหน้าเว็บ
useSeoMeta({
  ogImage: 'https://landing-template.nuxt.dev/social-card.png', // รูปภาพที่ใช้สำหรับ Open Graph
  twitterImage: 'https://landing-template.nuxt.dev/social-card.png', // รูปภาพที่ใช้สำหรับ Twitter Card
  twitterCard: 'summary_large_image' // ประเภทของ Twitter Card
})
</script>

<template>
  <!-- Header ของแอปพลิเคชัน -->
  <AppHeader />

  <!-- ส่วนหลักของเนื้อหา -->
  <UMain>
    <!-- ส่วนหน้าของ Nuxt.js ที่แสดงเนื้อหาตามเส้นทาง -->
    <NuxtPage />
  </UMain>

  <!-- Footer ของแอปพลิเคชัน -->
  <AppFooter />

  <!-- ส่วนของการแจ้งเตือน -->
  <UNotifications />
</template>
