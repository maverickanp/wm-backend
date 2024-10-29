import {errors} from '@strapi/utils'
module.exports = {
  beforeDelete: async ({ params }) => {
    const { where : {id} } = params;
    console.log("lifecycles:",params);
    
    const data = await strapi.db.query('api::cidade.cidade').findOne({
      where: {
        estado: {
          id
        }
      }
    });
    
    console.log("data:", data);
    
    if (data) {
      throw new errors.ApplicationError('Esse estado possui alguma cidade associada');
    }
  }
};