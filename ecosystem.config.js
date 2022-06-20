module.exports = {
  apps: [
    {
      name: 'fcgserver',
      script: 'npm start',
      watch_delay: 5000,
      ignore_watch: ['node_modules', './uploads']
    }
  ]

}
