import baseConfig from "@recaply/eslint-config/base";
import reactConfig from "@recaply/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
