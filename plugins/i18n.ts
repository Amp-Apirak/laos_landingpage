export default defineNuxtPlugin((nuxtApp) => {
  // Access the Vue I18n instance
  const i18n = nuxtApp.vueApp.config.globalProperties.$i18n;
  // Set the fallback locale
  i18n.fallbackLocale = "en";

});
