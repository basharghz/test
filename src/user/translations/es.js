// Spanish translations
export const translations = {
  errors: {
    404: {
      title: "404 - Página No Encontrada",
      message: "La página que buscas no existe.",
      messageWithPath: "La página \"{path}\" no se pudo encontrar. Por favor verifica la URL e inténtalo de nuevo."
    },
    401: {
      title: "401 - No Autorizado",
      message: "Se requiere autenticación para acceder a este recurso. Por favor verifica tu token de GitHub."
    },
    403: {
      title: "403 - Acceso Denegado",
      message: "No tienes permisos para acceder a este recurso."
    },
    429: {
      title: "429 - Límite de Velocidad Excedido",
      message: "Límite de velocidad de la API de GitHub excedido. Por favor inténtalo más tarde o agrega un token de GitHub a tus variables de entorno."
    },
    500: {
      title: "500 - Error Interno del Servidor",
      message: "El servidor encontró un error al procesar tu solicitud. Por favor inténtalo más tarde."
    },
    502: {
      title: "502 - Puerta de Enlace Incorrecta",
      message: "El servidor no está disponible temporalmente."
    },
    503: {
      title: "503 - Servicio No Disponible",
      message: "El servicio está temporalmente fuera de servicio por mantenimiento."
    },
    network: {
      title: "Error de Red",
      message: "No se pudo conectar al servidor. Por favor verifica tu conexión a internet e inténtalo de nuevo."
    },
    component: {
      title: "Error de Componente",
      message: "Error al renderizar componente",
      notFound: "Componente \"{type}\" no encontrado en el registro",
      available: "Componentes disponibles: {components}",
      renderError: "Error al renderizar el componente \"{type}\""
    },
    development: {
      title: "Error de Desarrollo",
      reactError: "Ocurrió un error de componente React durante el renderizado:",
      errorLabel: "Error:",
      componentStackLabel: "Pila de Componentes:"
    },
    general: {
      unknownError: "Ocurrió un error inesperado. Por favor inténtalo de nuevo.",
      invalidPageData: "Datos de página inválidos: Falta el array de componentes",
      internalServerError: "Error Interno del Servidor"
    }
  },
  ui: {
    loading: "Cargando...",
    tryAgain: "Intentar de Nuevo",
    goToHomePage: "Ir a la Página Principal",
    goBack: "Volver",
    login: "Iniciar Sesión",
    errorCode: "Código de Error: {code}",
    language: "Idioma"
  }
}
