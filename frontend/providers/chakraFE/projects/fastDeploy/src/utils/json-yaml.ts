import * as yaml from 'js-yaml';
export const yaml2Json = (str: string) => {
  return yaml.loadAll(str);
};
