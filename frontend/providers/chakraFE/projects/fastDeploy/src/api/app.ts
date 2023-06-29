import { GET, POST, DELETE } from '@/services/request';

export const postDeployApp = (yamlList: string[]) => POST('/api/applyApp', { yamlList });
