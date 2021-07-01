class CommonError extends Error {
    constructor(message, status) {
        super(message)
        this.name = 'UserError';
        this.message = message;
        this.status = status;
    }
}

export default CommonError;