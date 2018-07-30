export default {
      Query: {
          hello: (_: any, { name }: any) => `Hey ${name || 'World'}`,
      },
  };