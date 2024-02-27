module.exports = {
    apps: [
      {
        name: 'servicio-contrato',
        script: 'server.js', // Replace with your entry point file
        watch: true,
        ignore_watch: ['node_modules', 'logs', 'public/uploads'],
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
        instances: 'max',
        exec_mode: 'cluster',
      },
    ],

    deploy: {
      production: {
        user: 'your-deploy-user',
        host: 'your-server-ip',
        ref: 'origin/master',
        repo: 'git@github.com:your-username/your-repo.git', // Replace with your Git repository
        path: '/path/to/your/app',
        'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      },
    },
  };