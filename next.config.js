module.exports = {
    images: {
      domains:[
     'cdn.dummyjson.com',
     'fakestoreapi.com',
     'i.imgur.com'
      ],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
          port: '3000',
          pathname: '/**',
        },
      ],
    },
  }