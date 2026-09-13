const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Register document formatter for SphereScript
    vscode.languages.registerDocumentFormattingEditProvider('spherescript', {
        provideDocumentFormattingEdits(document) {
            const edits = [];
            let indentLevel = 0;

            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                const text = line.text.trim();

                if (!text || text.startsWith('//')) {
                    continue;
                }

                // Section headers reset indent to 0
                if (/^\[[^\]]+\]/.test(text)) {
                    indentLevel = 0;
                    if (line.text !== text) {
                        edits.push(vscode.TextEdit.replace(line.range, text));
                    }
                    continue;
                }

                // Triggers reset indent to 0 or 1
                if (/^ON\s*=/i.test(text)) {
                    indentLevel = 1;
                    const formatted = '\t' + text;
                    if (line.text !== formatted && line.text !== text) {
                        edits.push(vscode.TextEdit.replace(line.range, '\t' + text));
                    }
                    continue;
                }

                // Block closers decrease indent
                if (/^(endif|endfor|enddo)\b/i.test(text)) {
                    indentLevel = Math.max(1, indentLevel - 1);
                }

                const expectedIndent = '\t'.repeat(Math.max(0, indentLevel));
                const formattedLine = expectedIndent + text;

                if (line.text !== formattedLine) {
                    edits.push(vscode.TextEdit.replace(line.range, formattedLine));
                }

                // Block openers increase indent
                if (/^(if|for|while|forcont|doswitch)\b/i.test(text)) {
                    indentLevel++;
                }
            }

            return edits;
        }
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
