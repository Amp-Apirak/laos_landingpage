<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue"; // นำเข้า ref, computed, watch, nextTick, onMounted, onUnmounted จาก Vue
import { useI18n } from "vue-i18n"; // นำเข้า useI18n จาก vue-i18n สำหรับการแปลภาษา
import { useRouter } from "vue-router"; // นำเข้า useRouter จาก vue-router สำหรับการเปลี่ยนเส้นทาง

// ใช้ useI18n เพื่อดึง locale และฟังก์ชันแปล (t)
const { t, locale } = useI18n();

// ใช้ useRouter เพื่อจัดการเส้นทางของหน้า
const router = useRouter();

// กำหนดตัวแปร isMobileView เพื่อตรวจสอบว่าขนาดหน้าจอเป็นแบบมือถือหรือไม่
const isMobileView = ref(false);

// คำนวณภาษาปัจจุบันที่ใช้งานจาก locale
const currentLanguage = computed(() => locale.value);

// กำหนดลิงก์ต่าง ๆ ในเมนูตามภาษาที่เลือก
const links = computed(() => [
  {
    label: t("features"),
    to: "#features",
    icon: "i-heroicons-cube-transparent",
  },
  { 
    label: t("about"), 
    to: "#about", 
    icon: "i-heroicons-credit-card" },
  {
    label: t("testimonials"),
    to: "#testimonials",
    icon: "i-heroicons-academic-cap",
  },
  { 
    label: t("faq"), 
    to: "#faq", 
    icon: "i-heroicons-question-mark-circle" 
  },
]);

// กำหนดรายการภาษาที่รองรับ
const languages = [
  { code: "th", label: "ไทย" },
  { code: "lo", label: "ລາວ" },
  { code: "en", label: "English" },
];

// คำนวณชื่อภาษาปัจจุบันสำหรับการแสดงผลใน UI
const currentLanguageLabel = computed(
  () =>
    languages.find((lang) => lang.code === currentLanguage.value)?.label ||
    "เลือกภาษา"
);

// ฟังก์ชันเพื่ออัพเดทสถานะของหน้าจอว่าเป็นแบบมือถือหรือไม่
const updateMobileView = () => {
  isMobileView.value = window.innerWidth < 768;
};

// ฟังก์ชันเปลี่ยนภาษา
const changeLanguage = async (lang) => {
  locale.value = lang; // เปลี่ยนค่า locale
  await router.push(`/${lang}`); // เปลี่ยนเส้นทาง URL เป็นภาษาที่เลือก
  await nextTick(); // รอการเปลี่ยนแปลง DOM เสร็จสิ้น
};

// เมื่อคอมโพเนนต์ mount ให้ตรวจสอบขนาดหน้าจอและฟังเหตุการณ์ resize
onMounted(() => {
  updateMobileView();
  window.addEventListener("resize", updateMobileView);
});

// เมื่อคอมโพเนนต์ unmount ให้ยกเลิกฟังเหตุการณ์ resize
onUnmounted(() => {
  window.removeEventListener("resize", updateMobileView);
});

// เพิ่ม watch เพื่อติดตามการเปลี่ยนแปลงของ locale (ภาษา)
watch(locale, async (newLocale) => {
  await nextTick(); // รอการเปลี่ยนแปลง DOM เสร็จสิ้น
  // ทำการอัปเดตส่วนอื่นๆ ของ UI ที่ต้องเปลี่ยนตามภาษา (ถ้ามี)
});
</script>

<template>
  <!-- ส่วนหัวของแอปพลิเคชัน -->
  <UHeader :links="links">
    <template #logo>LAOS {{ t("welcome") }}</template>

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

        <!-- แสดงปุ่มสำหรับเปลี่ยนภาษา -->
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
