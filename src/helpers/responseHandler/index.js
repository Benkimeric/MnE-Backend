class ResponseHandler {
  /**
   * HandleSuccess msg
   * @param {string} message
   * @param {object} data
   * @param {number} statusCode
   * @param {object} response
   * @returns {object} response object
   * */
  static handleSuccess(message, data, statusCode, response) {
    return response.status(statusCode).json({
      success: true,
      message,
      data
    });
  }
  
  /**
   * HandleError msg
   * @param {string} error
   * @param {number} statusCode
   * @param {object} response
   * @returns {object} response object
   * */
  static handleError(error, statusCode, response) {
    return response.status(statusCode).json({
      success: false,
      error
    });
  }

  /**
   * Custom msg
   * @param {object} data response details
   * @param {number} statusCode
   * @param {object} response
   * @returns {object} response object
   * */
  static customResponse(data, statusCode, response) {
    return response.status(statusCode).json({
      success: data.success || false,
      ...data
    });
  }
}
  
export default ResponseHandler;
