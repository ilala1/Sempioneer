const nextRuntimeDotenv = require('next-runtime-dotenv');

// Set .env var locations
const withConfig = nextRuntimeDotenv({
    path: './config/.env',
    public: [
        'URL_HOST',
        'URL_BASE',
        'API_VERSION',
    ],
    server: [],
});

// NextJS config with .env data exposed
module.exports = withConfig();
