<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

useHead(() => ({
  htmlAttrs: {
    lang: locale.value
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ]
}))

useSeoMeta(() => ({
  title: t('seoTitle'),
  ogTitle: t('seoTitle'),
  description: t('seoDescription'),
  ogDescription: t('seoDescription'),
  ogImage: 'https://landing-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://landing-template.nuxt.dev/social-card.png'
}))
</script>

<template>
  <AppHeader />

  <UMain>
    <NuxtPage />
  </UMain>

  <AppFooter />

  <UNotifications />
</template>