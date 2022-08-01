module.exports = {
  apps: [
    {
      name: 'fcgserver',
      script: 'npm run server',
      watch_delay: 5000,
      ignore_watch: ['node_modules', 'src/uploads']
    }
  ]

}
