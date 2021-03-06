module.exports = {
  apps : [
    {
      name: 'SOCKETS',
      script: 'dist/server.js',
      env: {
        NODE_ENV: 'development'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'CADDY',
      interpreter: 'caddy',
      interpreter_args: '-quic -conf',
      script: 'Caddyfile',
    },
  ],

  deploy : {
    production : {
      user : 'caleb',
      host : '192.168.1.91',
      ref  : 'origin/master',
      repo : 'https://github.com/everett1992/lights',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
