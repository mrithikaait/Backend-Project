import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

export default () => {
  const env = process.env.NODE_ENV || 'development';

  const filePath = path.join(
    process.cwd(),
    'src',
    'config',
    `config.${env}.yml`,
  );

  const config = yaml.load(fs.readFileSync(filePath, 'utf8')) as Record<
    string,
    any
  >;

  return config;
};
