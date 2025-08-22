// German translations
export const translations = {
  errors: {
    404: {
      title: "404 - Seite Nicht Gefunden",
      message: "Die Seite, die Sie suchen, existiert nicht.",
      messageWithPath: "Die Seite \"{path}\" konnte nicht gefunden werden. Bitte überprüfen Sie die URL und versuchen Sie es erneut."
    },
    401: {
      title: "401 - Nicht Autorisiert",
      message: "Authentifizierung ist erforderlich, um auf diese Ressource zuzugreifen. Bitte überprüfen Sie Ihr GitHub-Token."
    },
    403: {
      title: "403 - Zugriff Verweigert",
      message: "Sie haben keine Berechtigung, auf diese Ressource zuzugreifen."
    },
    429: {
      title: "429 - Ratenlimit Überschritten",
      message: "GitHub API-Ratenlimit überschritten. Bitte versuchen Sie es später erneut oder fügen Sie ein GitHub-Token zu Ihren Umgebungsvariablen hinzu."
    },
    500: {
      title: "500 - Interner Serverfehler",
      message: "Der Server hat beim Verarbeiten Ihrer Anfrage einen Fehler festgestellt. Bitte versuchen Sie es später erneut."
    },
    502: {
      title: "502 - Fehlerhaftes Gateway",
      message: "Der Server ist vorübergehend nicht verfügbar."
    },
    503: {
      title: "503 - Service Nicht Verfügbar",
      message: "Der Service ist vorübergehend wegen Wartungsarbeiten nicht verfügbar."
    },
    network: {
      title: "Netzwerkfehler",
      message: "Verbindung zum Server nicht möglich. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut."
    },
    component: {
      title: "Komponentenfehler",
      message: "Fehler beim Rendern der Komponente",
      notFound: "Komponente \"{type}\" nicht im Register gefunden",
      available: "Verfügbare Komponenten: {components}",
      renderError: "Fehler beim Rendern der Komponente \"{type}\""
    },
    development: {
      title: "Entwicklungsfehler",
      reactError: "Ein React-Komponentenfehler ist während des Renderns aufgetreten:",
      errorLabel: "Fehler:",
      componentStackLabel: "Komponenten-Stack:"
    },
    general: {
      unknownError: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      invalidPageData: "Ungültige Seitendaten: Komponenten-Array fehlt",
      internalServerError: "Interner Serverfehler"
    }
  },
  ui: {
    loading: "Lädt...",
    tryAgain: "Erneut Versuchen",
    goToHomePage: "Zur Startseite",
    goBack: "Zurück",
    login: "Anmelden",
    errorCode: "Fehlercode: {code}",
    language: "Sprache"
  }
}
