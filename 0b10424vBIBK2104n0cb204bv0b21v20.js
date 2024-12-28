const fs = require('fs');
const javascriptObfuscator = require('javascript-obfuscator');
const htmlMinifier = require('html-minifier').minify;

// Read the original HTML file
const htmlFilePath = '89v18v581f501029vv90gvg805gv01g50v.html';
let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

// Extract and obfuscate JavaScript code
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
htmlContent = htmlContent.replace(scriptRegex, (match, p1) => {
    const obfuscatedJs = javascriptObfuscator.obfuscate(p1, {
        compact: true,
        controlFlowFlattening: true,
    }).getObfuscatedCode();
    return `<script>${obfuscatedJs}</script>`;
});

// Obfuscate the HTML content
const obfuscatedHtmlContent = htmlMinifier(htmlContent, {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeEmptyAttributes: true,
});

// Write the obfuscated HTML to a new file
const obfuscatedHtmlFilePath = '89v18v581f501029vv90gvg805gv01g50v_obfuscated.html';
fs.writeFileSync(obfuscatedHtmlFilePath, obfuscatedHtmlContent);

console.log('HTML and JavaScript obfuscation complete.');