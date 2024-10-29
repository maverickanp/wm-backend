export default {
  kind: 'collectionType',
  collectionName: 'pessoas',
  info: {
    singularName: 'pessoa',
    pluralName: 'pessoas',
    displayName: 'Pessoa',
  },
  options: {
    draftAndPublish: false,
  },
  attributes: {
    nome: {
      type: 'string',
      required: true,
      maxLength: 250,
    },
    email: {
      type: 'email',
      required: true,
      unique: true,
    },
    cidade: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'api::cidade.cidade',
      inversedBy: 'pessoas'
    }
  },
};