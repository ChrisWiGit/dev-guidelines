import { defineConfig } from 'vitepress'
import sidebar from './themeConfig.sidebar.mts'
import { base } from './base.config.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  ignoreDeadLinks: true,
  title: "Coding Guidelines",
  description: "Provides a full set of Coding Guidelines",
  themeConfig: {
    outline: [2, 4],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Deutsch', link: '/de-DE' },
    ],
    ...sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local'
    }
  },
  locales: {
    "de-DE": {
      label: 'Deutsch',
      lang: 'de-DE', // optional, will be added  as `lang` attribute on `html` tag
      link: '/de-DE/index' // default /fr/ -- shows on navbar translations menu, can be external
    },
    "en-US": {
      label: 'Englisch',
      lang: 'en-US', // optional, will be added  as `lang` attribute on `html` tag
      link: '/en-US/index' // default /fr/ -- shows on navbar translations menu, can be external
    }
  }
})
