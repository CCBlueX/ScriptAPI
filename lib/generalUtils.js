var StringSelection = Java.type("java.awt.datatransfer.StringSelection");
var Toolkit = Java.type("java.awt.Toolkit");

// Copies something to the clipboard
function copyToClipboard(string) {
    var stringSelection = new StringSelection(string);
    var clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
    clipboard.setContents(stringSelection, null);
}