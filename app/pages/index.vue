<script setup lang="ts">
import { useI18n } from "vue-i18n"; // นำเข้า useI18n สำหรับการแปลภาษา
const { locale, t } = useI18n(); // ใช้ locale และ t จาก useI18n

// ใช้ useAsyncData เพื่อดึงข้อมูลเนื้อหาของหน้าโดยอิงจากภาษาที่เลือก
const { data: page } = await useAsyncData("index", () =>
  queryContent(`${locale.value}/`).findOne()
);

// เพิ่ม state สำหรับจัดการการเล่นวิดีโอ
const playingVideos = ref(new Set());

// เพิ่มฟังก์ชันสำหรับควบคุมการเล่นวิดีโอ
const toggleVideo = (index: number) => {
  if (playingVideos.value.has(index)) {
    playingVideos.value.delete(index);
  } else {
    playingVideos.value.add(index);
  }
};


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
    <!-- ส่วนของ About -->
    <ULandingHero id="about" class="pt-4 md:pt-8 lg:pt-12">
      <template #title>
        <div class="text-center">
          <img
            src="/images/logo.png"
            alt="LAOS LIMS Logo"
            class="mx-auto mb-12 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 object-contain"
          />
          <h1 class="text-4xl md:text-6xl font-bold">
            {{ page.hero.title }}
          </h1>
        </div>
      </template>

      <template #description>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-300">
          {{ page.hero.description }}
        </p>
      </template>

      <template #links>
        <div class="mt-8 flex justify-center gap-4">
          <UButton
            v-for="link in page.hero.links"
            :key="link.label"
            v-bind="link"
          />
        </div>
      </template>
    </ULandingHero>

    <!-- ส่วนของ Features -->
    <ULandingSection
      :title="page.features.title"
      :description="page.features.description"
      :headline="page.features.headline"
      class="-mt-32 sm:-mt-40 lg:-mt-48"
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

    <!-- ส่วนของ Systems URL -->
    <ULandingSection
      :title="page.systems.title"
      class="-mt-24 sm:-mt-32 lg:-mt-40"
    >
      <UPageGrid
        id="systems"
        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <ULandingCard
          v-for="(item, index) in page.systems.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <!-- ส่วนของ Documents -->
    <ULandingSection
      id="documents"
      v-if="page?.Document"
      :headline="page.Document.headline"
      :title="page.Document.title"
      :description="page.Document.description"
      lass="scroll-mt-[calc(var(--header-height)+140px)]"
      class="-mt-32 sm:-mt-40 lg:-mt-48"
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

    <!-- ส่วนของ Videos -->
    <ULandingSection
      id="videos"
      v-if="page?.Video"
      :headline="page.Video.headline"
      :title="page.Video.title"
      :description="page.Video.description"
      class="-mt-32 sm:-mt-40 lg:-mt-48"
    >
      <!-- Container for Video Grid -->
      <div class="w-full max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Video Card Component -->
          <div
            v-for="(video, index) in page.Video.items"
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <!-- Video Thumbnail Container -->
            <div class="relative aspect-video w-full">
              <!-- Thumbnail Image -->
              <img
                :src="video.thumbnail"
                :alt="video.title"
                class="w-full h-full object-cover"
              />
              <!-- Play Button Overlay -->
              <button
                @click="video.isPlaying = true"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-opacity"
              >
                <UIcon
                  name="i-heroicons-play-circle"
                  class="w-16 h-16 text-white"
                />
              </button>
              <!-- Video Player (shows when isPlaying is true) -->
              <div v-if="video.isPlaying" class="absolute inset-0 bg-black">
                <iframe
                  :src="video.embedUrl"
                  class="w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <!-- Close Button -->
                <button
                  @click="video.isPlaying = false"
                  class="absolute top-4 right-4 text-white hover:text-gray-300"
                >
                  <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
                </button>
              </div>
            </div>
            <!-- Video Info -->
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ video.title }}
              </h3>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {{ video.description }}
              </p>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-sm text-gray-500">
                  {{ video.duration }}
                </span>
                <span class="text-sm text-gray-500">
                  {{ video.date }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ULandingSection>

    <!-- ส่วนของ FAQ  -->
    <ULandingSection
      id="faq"
      :title="page.faq.title"
      :description="page.faq.description"
      class="-mt-24 sm:-mt-32 lg:-mt-40"
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

    <!-- ส่วนของ Contact -->
    <ULandingSection
      id="contact"
      :title="page.contact.title"
      :description="page.contact.description"
      class="-mt-24 sm:-mt-32 lg:-mt-40"
    >
      <div class="w-full max-w-4xl mx-auto">
        <!-- การ์ดแสดงข้อมูลติดต่อ -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- ข้อมูลการติดต่อ -->
            <div
              v-for="(item, index) in page.contact.info"
              :key="index"
              class="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <!-- ไอคอน -->
              <div class="flex-shrink-0">
                <UIcon :name="item.icon" class="w-8 h-8 text-primary-500" />
              </div>

              <!-- ข้อความและลิงก์ -->
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ item.label }}
                </p>
                <a
                  :href="
                    item.type === 'email'
                      ? `mailto:${item.value}`
                      : `https://wa.me/${item.value.replace(/\D/g, '')}`
                  "
                  class="text-lg font-medium text-gray-900 dark:text-white hover:text-primary-500"
                >
                  {{ item.value }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ULandingSection>
  </div>
</template>
