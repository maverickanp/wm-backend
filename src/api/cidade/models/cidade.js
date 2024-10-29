export default {
  kind: 'collectionType',
  collectionName: 'cidades',
  info: {
    singularName: 'cidade',
    pluralName: 'cidades',
    displayName: 'Cidade',
  },
  options: {
    draftAndPublish: false,
  },
  attributes: {
    nome: {
      type: 'string',
      required: true,
    },
    estado: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'api::estado.estado',
      inversedBy: 'cidades'
    },
    pessoas: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::pessoa.pessoa',
      mappedBy: 'cidade'
    }
  },
  lifecycles: {
    beforeDelete: async (event) => {
      const { id } = event.params;
      const pessoasCount = await strapi.db.query('api::pessoa.pessoa').count({
        where: { cidade: id }
      });
      
      if (pessoasCount > 0) {
        throw new Error('Não é possível deletar uma cidade que possui pessoas associadas');
      }
    },
  },
};