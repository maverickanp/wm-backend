import {errors} from '@strapi/utils'
module.exports = {
  beforeDelete: async ({ params }) => {
    const { where : {id} } = params;
    console.log("lifecycles:",params);
    const cidade = await strapi.db.query('api::cidade.cidade').findOne({
      where:  {
        id
      }
    });

    const data = await strapi.db.query('api::pessoa.pessoa').findOne({
      where: {
        cidade: {
          id
        }
      }
    });
    
    console.log("pessoa:", data);
    
    if (data) {
      throw new errors.ApplicationError(`A cidade ${cidade.nome} possui alguma pessoa associada`);
    }
  }
};