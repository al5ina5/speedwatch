const concurrently = require('concurrently');
const { result } = concurrently(
    [
        'cd process && npm start',
        'cd ui && npm start',
    ],
);