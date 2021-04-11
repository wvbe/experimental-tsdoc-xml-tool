import * as tsdoc from '@microsoft/tsdoc';
import { IFoundComment } from '../types';

export function getXmlForTsdocComments(
  tsdocParser: tsdoc.TSDocParser,
  foundComment: IFoundComment
) {
  const parserContext = tsdocParser.parseRange(foundComment.textRange);
  return parserContext.docComment;
}
