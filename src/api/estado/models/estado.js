export default {
  kind: 'collectionType',
  collectionName: 'estados',
  info: {
    singularName: 'estado',
    pluralName: 'estados',
    displayName: 'Estado',
  },
  options: {
    draftAndPublish: false,
  },
  attributes: {
    nome: {
      type: 'string',
      required: true,
      unique: true,
    },
    cidades: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::cidade.cidade',
      mappedBy: 'estado'
    }
  },
  lifecycles: {
    beforeDelete: async (event) => {
      const { id } = event.params;
      const cidadesCount = await strapi.db.query('api::cidade.cidade').count({
        where: { estado: id }
      });
      
      if (cidadesCount > 0) {
        throw new Error('Não é possível deletar um estado que possui cidades associadas');
      }
    },
  },
};