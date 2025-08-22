// French translations
export const translations = {
  errors: {
    404: {
      title: "404 - Page Non Trouvée",
      message: "La page que vous recherchez n'existe pas.",
      messageWithPath: "La page \"{path}\" n'a pas pu être trouvée. Veuillez vérifier l'URL et réessayer."
    },
    401: {
      title: "401 - Non Autorisé",
      message: "L'authentification est requise pour accéder à cette ressource. Veuillez vérifier votre token GitHub."
    },
    403: {
      title: "403 - Accès Refusé",
      message: "Vous n'avez pas la permission d'accéder à cette ressource."
    },
    429: {
      title: "429 - Limite de Débit Dépassée",
      message: "Limite de débit de l'API GitHub dépassée. Veuillez réessayer plus tard ou ajouter un token GitHub à vos variables d'environnement."
    },
    500: {
      title: "500 - Erreur Interne du Serveur",
      message: "Le serveur a rencontré une erreur lors du traitement de votre demande. Veuillez réessayer plus tard."
    },
    502: {
      title: "502 - Passerelle Incorrecte",
      message: "Le serveur est temporairement indisponible."
    },
    503: {
      title: "503 - Service Indisponible",
      message: "Le service est temporairement en panne pour maintenance."
    },
    network: {
      title: "Erreur Réseau",
      message: "Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet et réessayer."
    },
    component: {
      title: "Erreur de Composant",
      message: "Échec du rendu du composant",
      notFound: "Composant \"{type}\" non trouvé dans le registre",
      available: "Composants disponibles : {components}",
      renderError: "Échec du rendu du composant \"{type}\""
    },
    development: {
      title: "Erreur de Développement",
      reactError: "Une erreur de composant React s'est produite pendant le rendu :",
      errorLabel: "Erreur :",
      componentStackLabel: "Pile de Composants :"
    },
    general: {
      unknownError: "Une erreur inattendue s'est produite. Veuillez réessayer.",
      invalidPageData: "Données de page invalides : Tableau de composants manquant",
      internalServerError: "Erreur Interne du Serveur"
    }
  },
  ui: {
    loading: "Chargement...",
    tryAgain: "Réessayer",
    goToHomePage: "Aller à la Page d'Accueil",
    goBack: "Retour",
    login: "Se Connecter",
    errorCode: "Code d'Erreur : {code}",
    language: "Langue"
  }
}
