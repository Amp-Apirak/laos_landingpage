<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n, useLocalePath } from '#i18n'

// ใช้ Nuxt Composables
const { locale, t } = useI18n()
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()
const localePath = useLocalePath()

// สร้าง ref สำหรับเก็บภาษาปัจจุบัน
const currentLanguage = ref(locale.value)

// ฟังก์ชันสำหรับเปลี่ยนภาษา
const changeLanguage = (lang: string) => {
  locale.value = lang
  currentLanguage.value = lang
  localStorage.setItem('userLocale', lang)

  // ตรวจสอบว่าภาษาเริ่มต้นคือ 'en'
  const path = lang === 'en' ? '/' : localePath('/')
  window.location.href = path
}

const currentLanguageLabel = computed(() =>
  languages.find(lang => lang.code === currentLanguage.value)?.label || 'Select Language'
)

watch(locale, (newLocale) => {
  currentLanguage.value = newLocale
})

// กำหนดรายการภาษาที่รองรับ
const languages = [
  { code: 'th', label: 'ไทย' },
  { code: 'lo', label: 'ລາວ' },
  { code: 'en', label: 'English' }
]

// สร้าง computed property สำหรับลิงก์ในเมนู
const links = computed(() => [{
  label: t('nav.features'),
  to: '#features',
  icon: 'i-heroicons-cube-transparent',
  active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('about')
}, {
  label: t('nav.about'),
  to: '#about',
  icon: 'i-heroicons-credit-card',
  active: activeHeadings.value.includes('about') && !activeHeadings.value.includes('testimonials')
}, {
  label: t('nav.testimonials'),
  to: '#testimonials',
  icon: 'i-heroicons-academic-cap',
  active: activeHeadings.value.includes('testimonials')
}, {
  label: t('nav.faq'),
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
  <UHeader :links="links">
    <template #logo>
      LAOS {{ t('helloWorld') }}
    </template>

    <template #right>
      <UPopover mode="click" :popper="{ placement: 'bottom-end' }">
        <UButton
          color="gray"
          variant="ghost"
          :label="currentLanguageLabel"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
        <template #panel>
          <div class="p-2">
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

    <template #panel>
      <UAsideLinks :links="links" />

      <UDivider class="my-6" />

      <UButton
        v-for="lang in languages"
        :key="lang.code"
        :label="lang.label"
        :color="currentLanguage.value === lang.code ? 'primary' : 'white'"
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
