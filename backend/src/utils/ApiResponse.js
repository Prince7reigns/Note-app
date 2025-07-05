
class ApiResponse {
    /**
     * @param {number} statusCode - HTTP status code (e.g., 200, 201, 400, 500)
     * @param {any} data - Response data (can be an object, array, string, etc.)
     * @param {string} message - Response message (default: "success")
     */
    constructor(statusCode, data, message = "success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export {ApiResponse} 