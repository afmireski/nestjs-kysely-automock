const categoriesErrors = {
  101: {
    httpCode: 404,
    message: 'Categoria não encontrada',
  },
  102: {
    httpCode: 500,
    message: 'Houve uma falha ao tentar buscar a categoria',
  },
  103: {
    httpCode: 500,
    message: 'Houve uma falha ao tentar criar a categoria',
  },
  104: {
    httpCode: 500,
    message: 'Houve uma falha ao tentar listar as categorias',
  },
  105: {
    httpCode: 500,
    message: 'Houve uma falha ao tentar atualizar a categoria',
  },
};

export default categoriesErrors;
