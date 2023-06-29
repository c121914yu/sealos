export type TemplateType = {
  apiVersion: 'apps/v1';
  kind: 'Template';
  metadata: {
    name: string;
  };
  spec: {
    title: string;
    url: string;
    readme: string;
    icon: string;
    template_type: 'inline';
    defaults: Record<
      string,
      {
        type: 'string';
        value: string;
      }
    >;
    inputs: Record<
      string,
      {
        description: string;
        type: 'string';
        default: string;
        required: boolean;
      }
    >;
  };
};
