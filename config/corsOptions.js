export const corsOptionsDelegate = function (req, callback) {
    const allowlist = ['http://localhost:3000', 'https://rent-car-liart.vercel.app'];
    
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { credentials:true, origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }