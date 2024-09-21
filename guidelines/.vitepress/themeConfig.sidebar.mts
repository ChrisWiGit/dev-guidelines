export default {
  sidebar: {
    // This sidebar gets displayed when a user
    // is on `guide` directory.
    'de-DE/1.health/': [
      {
        text: 'Preamble',
        items: [
          { text: 'Prinzipien', link: '../2.principles/' },
          { text: 'Clean Code', link: '../3.cleancode/' },
          { text: 'Refactoring', link: '../4.refactoring/' }
        ]
      }
    ],

    // This sidebar gets displayed when a user
    // is on `config` directory.
    '/config/': [
      {
        text: 'Config',
        items: [
          { text: 'Index', link: '/config/' },
          { text: 'Three', link: '/config/three' },
          { text: 'Four', link: '/config/four' }
        ]
      }
    ]
  }
}