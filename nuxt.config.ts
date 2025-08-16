// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxt/fonts"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,

  fonts: {
    families: [
      {
        name: "PT Root UI",
        local: false,
        src: [
          {
            path: "/fonts/pt-root-ui/PTRootUI-Regular.woff2",
            weight: "400",
            style: "normal",
          },
          {
            path: "/fonts/pt-root-ui/PTRootUI-Bold.woff2",
            weight: "700",
            style: "normal",
          },
        ],
        preload: true,
        display: "swap",
      },
    ],
  },
});
