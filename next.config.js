module.exports = {
  images: {
    domains: [
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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, HEAD, OPTIONS, POST, PUT, PATCH, DELETE'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ],
      },
    ]
  },
}
