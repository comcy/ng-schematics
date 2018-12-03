import { Rule, SchematicContext, Tree, chain, externalSchematic } from '@angular-devkit/schematics';

const licenseText = `
/**
 * @license
 * MIT. Christian Silfang. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license ...
 */
`;

export function tsLicense(options: any): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', options),
    (tree: Tree, _context: SchematicContext) => {
      tree.getDir(options.sourceDir)
        .visit(filePath => {
          if (!filePath.endsWith('.ts')) {
            return;
          }
          const content = tree.read(filePath);
          if (!content) {
            return;
          }

          // Prevent from writing license to files that already have one.
          if (content.indexOf(licenseText) == -1) {
            tree.overwrite(filePath, licenseText + content);
          }
        });
      return tree;
    },
  ]);
}