module.exports = {
  apps: [
    {
      name: 'NASA-Agregator',
      exec_mode: 'fork',
      //instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
