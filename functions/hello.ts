export async function load() {
    return {
        status: 200,
        headers: {
            'content-type': 'text/plain',
        },
        body: 'Hello, World!'
    };
}