/* eslint-disable no-await-in-loop */
import createConnection from '..';

async function create(): Promise<void> {
  const connection = await createConnection();

  const roles = [
    {
      id: '18be3f49-b849-4b7a-a7f4-7cdc5d2125ef',
      name: 'limitedUsers',
      description: 'Limitar acesso aos clientes',
      type: 'common',
    },
    {
      id: '6c5199c3-2f94-4183-91f0-d1af6dffe8be',
      name: 'changeOrder',
      description: 'Permitir alterar o pedido depois de gerado',
      type: 'common',
    },
    {
      id: '6bb03904-75a1-4859-a9fc-43aa11998875',
      name: 'viewOrders',
      description:
        'Visualizar pedidos feitos por outros vendedores no detalhamento do cliente',
      type: 'common',
    },
    {
      id: 'f5b43c50-da8c-4611-b70a-9f202e3321e2',
      name: 'paymentLinks',
      description:
        'Criar links de pagamento e visualizar a situação dos mesmos ',
      type: 'common',
    },
    {
      id: '21aa114a-9f02-4831-9d99-728e7a5d3d49',
      name: 'administrador',
      description:
        'Tem acesso total ao sistema, podendo visualizar e alterar representadas, produtos, tabelas de preço, clientes, pedidos e comissões, inclusive de outros usuários.',
      type: 'admin',
    },
    {
      id: '4a7026c1-27da-4332-ba61-bce0a429407a',
      name: 'master',
      description: 'Tem acesso total ao sistema',
      type: 'admin',
    },
    {
      id: '2b0a7481-ce74-479c-8623-9474c2b95f77',
      name: 'dev',
      description: 'Desenvolvedor e teses',
      type: 'admin',
    },
  ];

  // eslint-disable-next-line no-restricted-syntax
  for (const role of roles) {
    await connection.query(
      `INSERT INTO "role"(id, name, description, type)
          VALUES('${role.id}', '${role.name}', '${role.description}', '${role.type}')`,
    );
  }

  await connection.close();
}

export default create;
