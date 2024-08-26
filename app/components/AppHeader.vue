<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue"; // นำเข้า Composition API จาก Vue
import { useI18n } from "vue-i18n"; // นำเข้า useI18n สำหรับการจัดการการแปลภาษา
import { useRouter, useRoute } from 'vue-router'; // นำเข้า useRouter และ useRoute สำหรับจัดการเส้นทาง

// กำหนด ref สำหรับตรวจสอบขนาดหน้าจอ
const isMobileView = ref(false);

// ฟังก์ชันสำหรับอัพเดทสถานะ mobile view
const updateMobileView = () => {
  isMobileView.value = window.innerWidth < 768; // ปรับตามขนาดที่คุณต้องการ
};

// ใช้ lifecycle hooks เพื่อจัดการ event listener เมื่อ component mount และ unmount
onMounted(() => {
  updateMobileView();
  window.addEventListener("resize", updateMobileView);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateMobileView);
});

// ใช้ Nuxt Composables
const nuxtApp = useNuxtApp(); // ใช้ useNuxtApp สำหรับเข้าถึง Nuxt application instance
const { activeHeadings, updateHeadings } = useScrollspy(); // ใช้ useScrollspy สำหรับจัดการ scrollspy ใน Nuxt UI

// ใช้ i18n composables สำหรับจัดการการแปลภาษา
const router = useRouter();
const route = useRoute();
const { locale, locales, t } = useI18n(); // ใช้ useI18n สำหรับจัดการ locale และการแปล
const currentLanguage = ref(locale.value); // กำหนดค่าเริ่มต้นของภาษาจาก locale

// ฟังก์ชันสำหรับเปลี่ยนภาษา
const changeLanguage = (lang) => {
  console.log('Changing language to:', lang); // เพิ่ม console log เพื่อตรวจสอบภาษาใหม่
  locale.value = lang; // เปลี่ยนค่า locale

  const newPath = router.resolve({ path: `/${lang}` }).href; // กำหนดเส้นทางใหม่ตามภาษาที่เลือก
  console.log('Navigating to new path:', newPath); // เพิ่ม console log เพื่อตรวจสอบเส้นทางใหม่
  router.push(newPath); // เปลี่ยนเส้นทางไปยัง URL ใหม่
};

// Watch locale เพื่อให้แน่ใจว่า currentLanguage อัปเดตตาม locale
watch(locale, (newLocale) => {
  currentLanguage.value = newLocale; // อัปเดต currentLanguage เมื่อ locale เปลี่ยนแปลง
  console.log('Locale changed to:', newLocale); // เพิ่ม console log เพื่อตรวจสอบการเปลี่ยนแปลงของ locale

  // อัปเดตหัวข้อ scrollspy ตามการเปลี่ยนแปลงของภาษา
  updateHeadings([
    document.querySelector('#features') ?? undefined,
    document.querySelector('#about') ?? undefined,
    document.querySelector('#testimonials') ?? undefined,
    document.querySelector('#faq') ?? undefined
  ].filter(Boolean)); // ลบค่า null หรือ undefined ออก
});

// กำหนดรายการภาษาที่รองรับ
const languages = [
  { code: "th", label: "ไทย" },
  { code: "lo", label: "ລາວ" },
  { code: "en", label: "English" },
];

// สร้าง computed property สำหรับลิงก์ในเมนู
const links = computed(() => [
  { label: t("features"), to: "#features", icon: "i-heroicons-cube-transparent", active: activeHeadings.value.includes("features") && !activeHeadings.value.includes("about") },
  { label: t("about"), to: "#about", icon: "i-heroicons-credit-card", active: activeHeadings.value.includes("about") && !activeHeadings.value.includes("testimonials") },
  { label: t("testimonials"), to: "#testimonials", icon: "i-heroicons-academic-cap", active: activeHeadings.value.includes("testimonials") },
  { label: t("faq"), to: "#faq", icon: "i-heroicons-question-mark-circle", active: activeHeadings.value.includes("faq") },
]);

// computed property สำหรับแสดงชื่อภาษาปัจจุบัน
const currentLanguageLabel = computed(() => {
  return languages.find((lang) => lang.code === currentLanguage.value)?.label || "Select Language";
});

</script>

<template>
  <!-- ส่วนหัวของแอปพลิเคชัน -->
  <UHeader :links="links">
    <template #logo>
      LAOS {{ t("welcome") }}
    </template>

    <!-- ส่วนของการเลือกภาษา -->
    <template #right>
      <UPopover
        v-if="!isMobileView"
        mode="click"
        :popper="{ placement: 'bottom-end' }"
      >
        <UButton
          color="gray"
          variant="ghost"
          :label="currentLanguageLabel"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
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

    <!-- เมนูสำหรับหน้าจอขนาดเล็ก -->
    <template #panel>
      <UAsideLinks :links="links" />
      <UDivider class="my-6" />
      <!-- ปุ่มเปลี่ยนภาษาในเมนูด้านข้าง -->
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
