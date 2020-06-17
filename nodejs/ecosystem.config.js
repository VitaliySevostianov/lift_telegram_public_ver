module.exports = {
  apps : [{
    name: 'API',
    script: './src/api/index.js',
    autorestart: true,
    watch: true
  },
  {
    name: 'BOT',
    script: './src/bot/index.js',
    autorestart: true,
    watch: true
  }]
};
