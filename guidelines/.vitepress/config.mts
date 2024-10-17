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
    outline: [2, 3],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Deutsch', link: '/de-DE' },
    ],
    ...sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ChrisWiGit/dev-guidelines' }
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: '<a href="https://github.com/ChrisWiGit/dev-guidelines">Dev Guidelines GitHub Source</a>  Credits: Icons used from <a href="https://www.freepik.com">FreePik.com</a>,  Page made with <a href="https://github.com/vuejs/vitepress">VitePress</a>',
      copyright: '<a href="https://github.com/ChrisWiGit/dev-guidelines?tab=CC-BY-SA-4.0-1-ov-file#readme">CC Attribution-ShareAlike 4.0 International</a>'
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
  },
  markdown: {
    toc: { level: [2, 2] }
  },
  head: [['link', { rel: 'icon', type: "image/png", href: '/dev-guidelines/favicon.png' }]]
})
