const next = require('next')//
const routes = require('./routes')//
const app = next({dev: process.env.NODE_ENV !== 'production'})//
const handler = routes.getRequestHandler(app)//



const {createServer} = require('http') //
app.prepare().then(() => {
  createServer(handler).listen(3001, err =>{
    if(err) {
        console.log('errrrrrrrrrrrrrrrrrrrr')
    }else {
        console.log('Ready on porp 3001')
    }

  })
})

////////////////////////////////////////////////////////////


//
// const { createServer } = require('http');
// const next = require('next');
//
// const app = next({
//   dev: process.env.NODE_ENV !== 'production',
//   conf: {
//     webpack: config => {
//       config.devtool = false;
//
//       for (const r of config.module.rules) {
//         if (r.loader === 'babel-loader') {
//           r.options.sourceMaps = false;
//         }
//       }
//
//       return config;
//     }
//   }
// });
//
// const routes = require('./routes');
// const handler = routes.getRequestHandler(app);
//
// app.prepare().then(() => {
//   createServer(handler).listen(3000, err => {
//     if (err) throw err;
//     console.log('Ready on localhost:3000');
//   });
// });
