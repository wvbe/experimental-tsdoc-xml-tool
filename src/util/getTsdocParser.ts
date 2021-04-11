import os from 'os';
import * as tsdoc from '@microsoft/tsdoc';

export function getTsdocParser() {
  const customConfiguration = new tsdoc.TSDocConfiguration();

  const customInlineDefinition = new tsdoc.TSDocTagDefinition({
    tagName: '@customInline',
    syntaxKind: tsdoc.TSDocTagSyntaxKind.InlineTag,
    allowMultiple: true,
  });

  // NOTE: Defining this causes a new DocBlock to be created under docComment.customBlocks.
  // Otherwise, a simple DocBlockTag would appear inline in the @remarks section.
  const customBlockDefinition = new tsdoc.TSDocTagDefinition({
    tagName: '@customBlock',
    syntaxKind: tsdoc.TSDocTagSyntaxKind.BlockTag,
  });

  // NOTE: Defining this causes @customModifier to be removed from its section,
  // and added to the docComment.modifierTagSet
  const customModifierDefinition = new tsdoc.TSDocTagDefinition({
    tagName: '@customModifier',
    syntaxKind: tsdoc.TSDocTagSyntaxKind.ModifierTag,
  });

  customConfiguration.addTagDefinitions([
    customInlineDefinition,
    customBlockDefinition,
    customModifierDefinition,
  ]);

  console.log(
    os.EOL + 'Invoking TSDocParser with custom configuration...' + os.EOL
  );
  const tsdocParser = new tsdoc.TSDocParser(customConfiguration);
  return tsdocParser;
}
