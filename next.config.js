/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/geoportal',
    // output: "export",
    reactStrictMode: false,
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        BASE_PATH: process.env.BASE_PATH,
        BASE_URL: process.env.BASE_URL,
        API_WEB: process.env.API_WEB,
        API_DEV: process.env.API_DEV,
        API_PROD: process.env.API_PROD,
        EE_JSON: process.env.EE_JSON,
        MINIO_ENDPOINT_IT: process.env.MINIO_ENDPOINT_IT,
        MINIO_PORT_IT: process.env.MINIO_PORT_IT,
        MINIO_USESSL_IT: process.env.MINIO_USESSL_IT,
        MINIO_ACCESSKEY_IT: process.env.MINIO_ACCESSKEY_IT,
        MINIO_SECRETKEY_IT: process.env.MINIO_SECRETKEY_IT,
        MINIO_ENDPOINT_RTLH: process.env.MINIO_ENDPOINT_RTLH,
        MINIO_PORT_RTLH: process.env.MINIO_PORT_RTLH,
        MINIO_USESSL_RTLH: process.env.MINIO_USESSL_RTLH,
        MINIO_ACCESSKEY_RTLH: process.env.MINIO_ACCESSKEY_RTLH,
        MINIO_SECRETKEY_RTLH: process.env.MINIO_SECRETKEY_RTLH,
        GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY
    },
    images: {
        remotePatterns: [
            {
                hostname: "jakartasatu.jakarta.go.id/web",
            },
            {
                hostname: "fakeimg.pl"
            }
        ],
        unoptimized: true
    },
    // distDir: "build"
}

module.exports = nextConfig
