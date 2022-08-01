module.exports = {
  apps: [
    {
      name: 'fe-checklist-gallery',
      script: './server-register.js',
      watch_delay: 5000,
      ignore_watch: ['node_modules', 'src/uploads']
    }
  ]
}
