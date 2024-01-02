const productsErrors = {
  201: {
    httpCode: 404,
    message: 'Produto não encontrado',
  },
  202: {
    httpCode: 500,
    message: 'Houve uma falha inesperada ao tentar listar os produtos',
  },
  203: {
    httpCode: 400,
    message: 'O preço mínimo não pode ser maior que o valor máximo',
  },
  204: {
    httpCode: 500,
    message: 'Houve uma falha inesperada ao tentar cadastrar o novo produto',
  },
};

export default productsErrors;
