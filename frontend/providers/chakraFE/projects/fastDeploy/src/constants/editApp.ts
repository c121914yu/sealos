import type { AppEditType } from '@/types/app';

export const editModeMap = (isEdit: boolean) => {
  if (isEdit) {
    return {
      title: 'Update Application',
      applyBtnText: 'Update Application',
      applyMessage: 'Confirm Update Application?',
      applySuccess: 'Update Successful',
      applyError: 'Update Failed'
    };
  }

  return {
    title: 'Application Deployment',
    applyBtnText: 'Deploy Application',
    applyMessage: 'Confirm Deploy Application?',
    applySuccess: 'Deployment Successful',
    applyError: 'Deployment Failed'
  };
};

export const defaultEditVal: AppEditType = {
  appName: 'hello-world',
  imageName: 'nginx',
  runCMD: '',
  cmdParam: '',
  replicas: 1,
  cpu: 100,
  memory: 64,
  containerOutPort: 80,
  accessExternal: {
    use: false,
    backendProtocol: 'HTTP',
    outDomain: '',
    selfDomain: ''
  },
  envs: [],
  hpa: {
    use: false,
    target: 'cpu',
    value: 50,
    minReplicas: 1,
    maxReplicas: 5
  },
  configMapList: [],
  secret: {
    use: false,
    username: '',
    password: '',
    serverAddress: 'docker.io'
  },
  storeList: []
};
