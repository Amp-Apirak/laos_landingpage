<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// ใช้ Nuxt Composables
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

// สร้าง ref สำหรับเก็บภาษาปัจจุบัน
const { locale, t } = useI18n()
const currentLanguage = ref(locale.value)

// ฟังก์ชันสำหรับเปลี่ยนภาษา
const changeLanguage = (lang: string) => {
  locale.value = lang // ใช้ i18n ในการเปลี่ยนภาษา
}

// กำหนดรายการภาษาที่รองรับ
const languages = [
  { code: 'th', label: 'ไทย' },
  { code: 'lo', label: 'ລາວ' },
  { code: 'en', label: 'English' }
]

// สร้าง computed property สำหรับลิงก์ในเมนู
const links = computed(() => [{
  label: 'Features',
  to: '#features',
  icon: 'i-heroicons-cube-transparent',
  // กำหนดสถานะ active ตามการเลื่อนหน้า
  active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('about')
}, {
  label: 'About',
  to: '#about',
  icon: 'i-heroicons-credit-card',
  active: activeHeadings.value.includes('about') && !activeHeadings.value.includes('testimonials')
}, {
  label: 'Testimonials',
  to: '#testimonials',
  icon: 'i-heroicons-academic-cap',
  active: activeHeadings.value.includes('testimonials')
}, {
  label: 'FAQ',
  to: '#faq',
  icon: 'i-heroicons-question-mark-circle',
  active: activeHeadings.value.includes('faq')
}])

// ใช้ Nuxt hook เพื่ออัพเดท headings เมื่อหน้าเว็บโหลดเสร็จ
nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#features'),
    document.querySelector('#about'),
    document.querySelector('#testimonials'),
    document.querySelector('#faq')
  ])
})
</script>

<template>
  <!-- ใช้ UHeader component จาก Nuxt UI -->
  <UHeader :links="links">
    <!-- กำหนดโลโก้ -->
    <template #logo>
      <!-- <NuxtImg src="#" alt="LAOS INTERNATIONAL" class="h-8" /> -->
      LAOS {{ t('welcome') }}
    </template>

    <!-- ส่วนด้านขวาของ header สำหรับเลือกภาษา -->
    <template #right>
      <!-- ใช้ UPopover สำหรับสร้าง dropdown เลือกภาษา -->
      <UPopover mode="click" :popper="{ placement: 'bottom-end' }">
        <!-- ปุ่มแสดงภาษาปัจจุบัน -->
        <UButton
          color="gray"
          variant="ghost"
          :label="languages.find(lang => lang.code === currentLanguage)?.label"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
        <!-- เนื้อหาของ popover -->
        <template #panel>
          <div class="p-2">
            <!-- สร้างปุ่มสำหรับแต่ละภาษา -->
            <UButton
              v-for="lang in languages"
              :key="lang.code"
              :label="lang.label"
              variant="ghost"
              color="gray"
              class="mb-2 w-full text-left"
              @click="changeLanguage(lang.code)"
            />
          </div>
        </template>
      </UPopover>
    </template>

    <!-- ส่วนของเมนูด้านข้างสำหรับหน้าจอขนาดเล็ก -->
    <template #panel>
      <!-- แสดงลิงก์ในเมนูด้านข้าง -->
      <UAsideLinks :links="links" />

      <UDivider class="my-6" />

      <!-- ปุ่มเลือกภาษาในเมนูด้านข้าง -->
      <UButton
        v-for="lang in languages"
        :key="lang.code"
        :label="lang.label"
        :color="currentLanguage === lang.code ? 'primary' : 'white'"
        block
        class="mb-3"
        @click="changeLanguage(lang.code)"
      />
    </template>
  </UHeader>
</template>

<style scoped>
/* เพิ่ม CSS เพิ่มเติมตามต้องการ */
</style>