module.exports = {
  src: ['./App_Scripts/'],
  mode: 'modules',
  includeDeclarations: false,
  exclude: [
    './App_Scripts/agGrid/**/*',
    './App_Scripts/View/**/*',
    './App_Scripts/components/**/*',
    './App_Scripts/Redux/**/*',
    './App_Scripts/Strategy/**/*',
    './App_Scripts/Utilities/**/*',
    './App_Scripts/fonts/**/*',
    './App_Scripts/Temp/**/*',
    './App_Scripts/themes/**/*',
    './App_Scripts/Api/Implementation/**/*',
  ],
  tsconfig: 'tsconfig.json',
  out: './apidoc',
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  excludeNotExported: true,
  readme: 'HelpREADME.md',
  name: 'Adaptable Blotter Developer Documentation',
  ignoreCompilerErrors: true,
  plugin: 'none',
  listInvalidSymbolLinks: true,
};
