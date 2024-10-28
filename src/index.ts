// src/index.ts

export default {
  register() {},
  bootstrap: async ({ strapi }) => {
    console.log('Atualizando Permissões...');
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!publicRole) {
      console.error('Papel público não encontrado');
      return;
    }

    const permissionsToEnable = [
      {
        contentTypeUid: 'api::cidade.cidade',
        actions: ['find', 'findOne'],
      },
      {
        contentTypeUid: 'api::estado.estado',
        actions: ['find', 'findOne'],
      },
      {
        contentTypeUid: 'api::pessoa.pessoa',
        actions: ['find', 'findOne', 'create'],
      },
    ];

    for (const permission of permissionsToEnable) {
      const { contentTypeUid, actions } = permission;
      const contentType = strapi.contentType(contentTypeUid);

      if (!contentType) {
        console.warn(`Tipo de conteúdo não encontrado: ${contentTypeUid}`);
        continue;
      }

      for (const action of actions) {
        const actionName = `${contentTypeUid}.${action}`;

        console.log('Verificando Permissões existentes...');
        const existingPermission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({
            where: {
              action: actionName,
              role: publicRole.id,
            },
          });

        if (existingPermission) {
          await strapi.query('plugin::users-permissions.permission').update({
            where: { id: existingPermission.id },
            data: { enabled: true },
          });
        } else {
          console.log('Criando as Permissões...');
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: actionName,
              role: publicRole.id,
              enabled: true,
            },
          });
        }
      }
    }

    console.log('Permissões atualizadas com sucesso!');
  },
};
