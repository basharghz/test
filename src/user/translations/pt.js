// Portuguese translations
export const translations = {
  errors: {
    404: {
      title: "404 - Página Não Encontrada",
      message: "A página que você está procurando não existe.",
      messageWithPath: "A página \"{path}\" não pôde ser encontrada. Verifique a URL e tente novamente."
    },
    401: {
      title: "401 - Não Autorizado",
      message: "Autenticação é necessária para acessar este recurso. Verifique seu token do GitHub."
    },
    403: {
      title: "403 - Acesso Negado",
      message: "Você não tem permissão para acessar este recurso."
    },
    429: {
      title: "429 - Limite de Taxa Excedido",
      message: "Limite de taxa da API do GitHub excedido. Tente novamente mais tarde ou adicione um token do GitHub às suas variáveis de ambiente."
    },
    500: {
      title: "500 - Erro Interno do Servidor",
      message: "O servidor encontrou um erro ao processar sua solicitação. Tente novamente mais tarde."
    },
    502: {
      title: "502 - Gateway Ruim",
      message: "O servidor está temporariamente indisponível."
    },
    503: {
      title: "503 - Serviço Indisponível",
      message: "O serviço está temporariamente fora do ar para manutenção."
    },
    network: {
      title: "Erro de Rede",
      message: "Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente."
    },
    component: {
      title: "Erro de Componente",
      message: "Falha ao renderizar componente",
      notFound: "Componente \"{type}\" não encontrado no registro",
      available: "Componentes disponíveis: {components}",
      renderError: "Falha ao renderizar o componente \"{type}\""
    },
    development: {
      title: "Erro de Desenvolvimento",
      reactError: "Ocorreu um erro de componente React durante a renderização:",
      errorLabel: "Erro:",
      componentStackLabel: "Pilha de Componentes:"
    },
    general: {
      unknownError: "Ocorreu um erro inesperado. Tente novamente.",
      invalidPageData: "Dados de página inválidos: Array de componentes ausente",
      internalServerError: "Erro Interno do Servidor"
    }
  },
  ui: {
    loading: "Carregando...",
    tryAgain: "Tentar Novamente",
    goToHomePage: "Ir para a Página Inicial",
    goBack: "Voltar",
    login: "Entrar",
    errorCode: "Código de Erro: {code}",
    language: "Idioma"
  }
}
