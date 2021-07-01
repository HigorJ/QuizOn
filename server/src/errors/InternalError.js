class InternalError extends Error {
    constructor(message) {
        super(message)
        this.name = 'InternalServerError';
        this.message = message;
        this.status = 500;
    }
}

export default InternalError;