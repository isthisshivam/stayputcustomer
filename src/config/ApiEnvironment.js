const env = {
  dev: "dev",
  test: "test",
  stg: "stg",
  product: "product",
  local: "local",
  sa_staging: "sa_staging",
  demo: "demo",
  pre_prod: "pre_prod",
  prod: "prod",
};
const BASE_URL_ENV = {
  dev: "",
  qc: "",
  stg: "",
  product: "",
  sa_staging: "http://18.215.83.36/backend/web/v2/api/",
  demo: "",
  pre_prod: "",
  prod: "http://18.215.83.36/backend/web/v3/api/",
};
const currentEnv = env.prod;
//const currentEnv = env.sa_staging;

export const BASE_URL = BASE_URL_ENV[currentEnv];
