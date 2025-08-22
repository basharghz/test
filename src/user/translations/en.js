// English translations (base language)
export const translations = {
  errors: {
    404: {
      title: "404 - Page Not Found",
      message: "The page you're looking for doesn't exist.",
      messageWithPath: "The page \"{path}\" could not be found. Please check the URL and try again."
    },
    401: {
      title: "401 - Unauthorized",
      message: "Authentication is required to access this resource. Please check your GitHub token."
    },
    403: {
      title: "403 - Access Denied",
      message: "You don't have permission to access this resource."
    },
    429: {
      title: "429 - Rate Limit Exceeded",
      message: "GitHub API rate limit exceeded. Please try again later or add a GitHub token to your environment variables."
    },
    500: {
      title: "500 - Internal Server Error",
      message: "The server encountered an error while processing your request. Please try again later."
    },
    502: {
      title: "502 - Bad Gateway",
      message: "Server is temporarily unavailable."
    },
    503: {
      title: "503 - Service Unavailable",
      message: "Service is temporarily down for maintenance."
    },
    network: {
      title: "Network Error",
      message: "Unable to connect to the server. Please check your internet connection and try again."
    },
    component: {
      title: "Component Error",
      message: "Failed to render component",
      notFound: "Component \"{type}\" not found in registry",
      available: "Available components: {components}",
      renderError: "Failed to render component \"{type}\""
    },
    development: {
      title: "Development Error",
      reactError: "A React component error occurred during rendering:",
      errorLabel: "Error:",
      componentStackLabel: "Component Stack:"
    },
    general: {
      unknownError: "An unexpected error occurred. Please try again.",
      invalidPageData: "Invalid page data: Missing components array",
      internalServerError: "Internal Server Error"
    }
  },
  ui: {
    loading: "Loading...",
    tryAgain: "Try Again",
    goToHomePage: "Go to Home Page",
    goBack: "Go Back",
    login: "Login",
    errorCode: "Error Code: {code}",
    language: "Language"
  }
}
