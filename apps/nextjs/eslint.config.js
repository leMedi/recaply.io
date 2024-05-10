import baseConfig, { restrictEnvAccess } from "@recaply/eslint-config/base";
import nextjsConfig from "@recaply/eslint-config/nextjs";
import reactConfig from "@recaply/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
