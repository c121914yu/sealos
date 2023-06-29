import * as yaml from 'js-yaml';

export const replaceYamlVariate = (str: string) => str.replace(/{{(.*?)}}/g, '__TEMP__$1__TEMP__');

export const yaml2Form = (str: string) => {
  const tempYaml = replaceYamlVariate(str);

  // Parse the YAML.
  const parsedYamls = yaml.loadAll(tempYaml) as Record<string, any>[];

  parsedYamls.forEach((parsedYaml) => {
    // Replace the temporary string back to {{}}.
    for (let key in parsedYaml) {
      if (typeof parsedYaml[key] === 'string') {
        parsedYaml[key] = parsedYaml[key].replace(/__TEMP__(.*?)__TEMP__/g, '{{$1}}');
      }
    }
  });

  console.log(parsedYamls);

  return str;
};
