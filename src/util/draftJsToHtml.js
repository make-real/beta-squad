import { convertFromRaw } from 'draft-js';
import { convertToRaw } from 'draft-js';
import { EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export const draftJsToHtml = (data) => {
    if (!data) return;
    try {
        const rowHtmlContent = EditorState.createWithContent(
            convertFromRaw(JSON.parse(data))
        );
        const editorHTML = draftToHtml(
            convertToRaw(rowHtmlContent.getCurrentContent())
        );
        return editorHTML;
    } catch (error) {
        return '';
    }
};
