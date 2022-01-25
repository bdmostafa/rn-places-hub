const variables = {
  development: {
    googleApiKey: "abc-api-example",
  },
  production: {
    googleApiKey: "xyz-api-example",
  },
};

const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function
