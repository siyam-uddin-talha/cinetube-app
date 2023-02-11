const config = {
  dev: {
    LOCAL_SYSTEM_IP_ADDRESS: "10.0.2.2",
    port: 8080,
    uri: `http://10.0.2.2:8080/graphql`,
    uriRest: `http://10.0.2.2:8080`,
  },
  production: {
    main: process.env.API__KEY,
    rest: process.env.API__KEY__REST,
  },
};

export { config };
