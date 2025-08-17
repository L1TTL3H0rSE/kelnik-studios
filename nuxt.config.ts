// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxt/fonts"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,

  fonts: {
    defaults: {
      weights: [400, 700],
      styles: ["normal"],
      subsets: ["latin", "cyrillic"],
    },
    families: [
      {
        name: "PT Root UI",
        src: ["/fonts/pt-root-ui_regular.woff2"],
        preload: true,
      },
      //Почему-то, если явно не задавать Bold, для веса 700 использует regular
      {
        name: "PT Root UI Bold",
        src: ["/fonts/pt-root-ui_bold.woff2"],
        preload: true,
      },
    ],
  },
});
