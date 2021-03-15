export enum TypeFile {
  js = 'js',
  css = 'css',
}

export interface Link {
  url: string;
  type: TypeFile;
  domain: string;
}

export interface File {
  filename?: string;
  size?: string;
  url: string;
  type: TypeFile;
}
