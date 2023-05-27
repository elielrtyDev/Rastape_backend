interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      name: string;
      address: string;
    };
  };
}

export default {
  driver: process.env.MAIL_PROVIDER || 'ethereal',

  defaults: {
    from: {
      name: 'Direito de Bolso',
      address: 'direito.de.bolsodevs@gmail.com',
    },
  },
} as IMailConfig;
