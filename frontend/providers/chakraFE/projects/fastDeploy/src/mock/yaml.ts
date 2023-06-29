export const MOCK_YAML = `
apiVersion: apps/v1
kind: Template
metadata: 
  name: FastGpt
spec:
  title: 'FastGpt'
  url: 'https://wordpress.org'
  readme: 'https://api.github.com/repos/c121914yu/FastGPT/readme'
  icon: './wordpress.svg'
  template_type: inline
  defaults:
    ingress_name:
      type: string
      value: '{{ random() }}'
    root_password:
      type: string
      value: '{{ random() }}'
  inputs:
    volume_size:
      description: 'save data size (Gi)'
      type: string
      default: '1'
      required: false  
    mail:
      description: 'your email address'
      type: string
      default: ''
      required: true
    mail_code:
      description: 'mail_code'
      type: string
      default: ''
      required: true
    OPENAIKEY:
      description: 'openai configuration'
      type: string
      default: ''
      required: true
    OPENAI_TRAINING_KEY:
      description: 'openai configuration'
      type: string
      default: ''
      required: true
    GPT4KEY:
      description: 'openai configuration'
      type: string
      default: ''
      required: true       
`;
