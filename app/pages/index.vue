<script setup lang="ts">
import { useI18n } from "vue-i18n"; // นำเข้า useI18n สำหรับการแปลภาษา
const { locale, t } = useI18n(); // ใช้ locale และ t จาก useI18n

// ใช้ useAsyncData เพื่อดึงข้อมูลเนื้อหาของหน้าโดยอิงจากภาษาที่เลือก
const { data: page } = await useAsyncData("index", () =>
  queryContent(`${locale.value}/`).findOne()
);

// ตั้งค่า SEO เมตาโดยใช้ useSeoMeta เพื่อเพิ่มข้อมูล SEO ในหน้าเว็บ
useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});
</script>

<template>
  <div>
    <!-- ส่วนของ Hero บนหน้าเว็บ -->
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <img
        src="/images/poster.jpg"
        alt="Hero Image"
        class="w-full h-auto rounded-lg"
      />

      <!-- ส่วนของรูปภาพ placeholder -->
      <!-- <ImagePlaceholder /> -->

      <!-- แสดงโลโก้ที่เชื่อถือได้ในหน้าเว็บ -->
      <ULandingLogos :title="page.logos.title" align="center">
        <UIcon
          v-for="icon in page.logos.icons"
          :key="icon"
          :name="icon"
          class="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white"
        />
      </ULandingLogos>
    </ULandingHero>

    <!-- ส่วนของ Features บนหน้าเว็บ -->
    <ULandingSection
      :title="page.features.title"
      :description="page.features.description"
      :headline="page.features.headline"
    >
      <UPageGrid
        id="features"
        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <!-- ส่วนของ About Us บนหน้าเว็บ -->
    <!-- <ULandingSection
      :title="page.about.title"
      :description="page.about.description"
      :headline="page.about.headline"
    >
      <UPricingGrid
        id="about"
        compact
        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <UPricingCard
          v-for="(plan, index) in page.about.plans"
          :key="index"
          v-bind="plan"
        />
      </UPricingGrid>
    </ULandingSection> -->

    <template>
      <ULandingSection
        headline="Pro"
        title="The freedom to build anything"
        description="Nuxt UI Pro ships with an extensive set of advanced components that cover a wide range of use-cases."
        align="center"
      >
        <img
          src="https://picsum.photos/640/360"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        />
      </ULandingSection>
    </template>

    <!-- ส่วนของ Testimonials บนหน้าเว็บ -->
    <ULandingSection
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns
        id="testimonials"
        class="xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial v-bind="testimonial" />
        </div>
      </UPageColumns>
    </ULandingSection>

    <!-- ส่วนของ Documents บนหน้าเว็บ -->
    <ULandingSection
      id="documents"
      v-if="page?.Document"
      :headline="page.Document.headline"
      :title="page.Document.title"
      :description="page.Document.description"
      lass="scroll-mt-[calc(var(--header-height)+140px)]"
    >
      <!-- Container สำหรับ Document Table -->
      <div class="w-full max-w-4xl mx-auto">
        <!-- Wrapper สำหรับทำ Responsive Table with Shadow -->
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <!-- Background Container -->
          <div
            class="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700"
          >
            <!-- Mobile View (แสดงเฉพาะหน้าจอที่เล็กกว่า lg breakpoint) -->
            <div class="lg:hidden">
              <!-- Card สำหรับแต่ละเอกสาร -->
              <div
                v-for="doc in page.Document.items"
                :key="doc.documentName"
                class="p-4 border-b dark:border-gray-700"
              >
                <!-- ส่วนบนของ Card แสดงชื่อเอกสารและวันที่ -->
                <div class="mb-2">
                  <!-- ชื่อเอกสาร -->
                  <div class="font-medium text-gray-900 dark:text-white">
                    {{ doc.documentName }}
                  </div>
                  <!-- วันที่อัปเดต -->
                  <div class="text-sm text-gray-500">
                    {{ doc.lastUpdated }}
                  </div>
                </div>

                <!-- ส่วนล่างของ Card แสดง File Info และ Actions -->
                <div class="flex items-center justify-between">
                  <!-- File Information -->
                  <div class="flex items-center space-x-4">
                    <!-- Badge แสดงประเภทไฟล์ -->
                    <span
                      class="px-2.5 py-0.5 rounded-full text-xs"
                      :class="
                        doc.fileType === 'PDF'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      "
                    >
                      {{ doc.fileType }}
                    </span>
                    <!-- ขนาดไฟล์ -->
                    <span class="text-sm text-gray-500">
                      {{ doc.fileSize }}
                    </span>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex space-x-2">
                    <!-- Preview Button -->
                    <UButton
                      size="sm"
                      color="gray"
                      variant="ghost"
                      icon="i-heroicons-eye"
                      :to="doc.previewUrl"
                      target="_blank"
                      class="!p-1"
                    >
                      <span class="sr-only">{{ t("Preview") }}</span>
                    </UButton>
                    <!-- Download Button -->
                    <UButton
                      size="sm"
                      color="primary"
                      variant="solid"
                      icon="i-heroicons-arrow-down-tray"
                      :to="doc.downloadUrl"
                      download
                      class="!p-1"
                    >
                      <span class="sr-only">{{ t("Download") }}</span>
                    </UButton>
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop View (แสดงเฉพาะหน้าจอขนาด lg ขึ้นไป) -->
            <table
              class="hidden lg:table min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            >
              <!-- Table Header -->
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-700">
                  <!-- Column Headers -->
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {{ t("Document Name") }}
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {{ t("Last Updated") }}
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {{ t("File Type") }}
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {{ t("Size") }}
                  </th>
                  <th
                    class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {{ t("Actions") }}
                  </th>
                </tr>
              </thead>

              <!-- Table Body -->
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <!-- Table Rows -->
                <tr
                  v-for="doc in page.Document.items"
                  :key="doc.documentName"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <!-- ชื่อเอกสาร -->
                  <td
                    class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {{ doc.documentName }}
                  </td>
                  <!-- วันที่อัปเดต -->
                  <td
                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                  >
                    {{ doc.lastUpdated }}
                  </td>
                  <!-- ประเภทไฟล์ -->
                  <td
                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                  >
                    <span
                      class="px-2.5 py-0.5 rounded-full text-xs"
                      :class="
                        doc.fileType === 'PDF'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      "
                    >
                      {{ doc.fileType }}
                    </span>
                  </td>
                  <!-- ขนาดไฟล์ -->
                  <td
                    class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                  >
                    {{ doc.fileSize }}
                  </td>
                  <!-- ปุ่มดำเนินการ -->
                  <td class="px-4 py-3 whitespace-nowrap text-right">
                    <div class="flex justify-end space-x-2">
                      <!-- Preview Button -->
                      <UButton
                        size="sm"
                        color="gray"
                        variant="ghost"
                        icon="i-heroicons-eye"
                        :to="doc.previewUrl"
                        target="_blank"
                      >
                        {{ t("Preview") }}
                      </UButton>
                      <!-- Download Button -->
                      <UButton
                        size="sm"
                        color="primary"
                        variant="solid"
                        icon="i-heroicons-arrow-down-tray"
                        :to="doc.downloadUrl"
                        download
                      >
                        {{ t("Download") }}
                      </UButton>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ULandingSection>

    <!-- ส่วนของ FAQ บนหน้าเว็บ -->
    <ULandingSection
      id="faq"
      :title="page.faq.title"
      :description="page.faq.description"
      class="scroll-mt-[var(--header-height)]"
    >
      <ULandingFAQ
        multiple
        :items="page.faq.items"
        :ui="{
          button: {
            label: 'font-semibold',
            trailingIcon: {
              base: 'w-6 h-6',
            },
          },
        }"
        class="max-w-4xl mx-auto"
      />
    </ULandingSection>
  </div>
</template>
