const concurrently = require('concurrently');
const { result } = concurrently(
    [
        'cd process && npm i && npm start',
        'cd ui && npm i && npm run build && npm start',
    ],
);