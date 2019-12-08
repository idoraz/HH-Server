module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps : [
  
      // First application
      {
        name      : 'REST-API',
        script    : '/home/ubuntu/HH/hh-server/dist/index.js',
        env: {
          COMMON_VARIABLE: 'true'
        },
        env_production : {
          NODE_ENV: 'production'
        }
      },
  
      // Second application
      {
        name      : 'WEB-SERVER',
        script    : '/home/ubuntu/HH/hechtlinger-housing-server/server.js'
      }
    ],
  
    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy : {
      production : {
        user : 'node',
        host : '212.83.163.1',
        ref  : 'origin/master',
        repo : 'git@github.com:repo.git',
        path : '/var/www/production',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
      },
      dev : {
        user : 'node',
        host : '212.83.163.1',
        ref  : 'origin/master',
        repo : 'git@github.com:repo.git',
        path : '/var/www/development',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
        env  : {
          NODE_ENV: 'dev'
        }
      }
    }
  };
  