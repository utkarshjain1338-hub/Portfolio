const fs = require('fs');
const path = require('path');

const sectionsDir = '/home/uzumaki/Documents/Portfolio/src/sections';
const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
    const filePath = path.join(sectionsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove import
    content = content.replace(/import\s*{\s*StickyCard\s*}\s*from\s*['"]\.\.\/components\/ui\/StickyCard['"];\n?/g, '');

    // Replace <StickyCard ...> with <section ...>
    content = content.replace(/<StickyCard([^>]*)>/g, (match, attrs) => {
        // Remove scrollWidth={...} if present
        let newAttrs = attrs.replace(/scrollWidth=\{[^}]+\}/g, '').trim();
        return `<section${newAttrs ? ' ' + newAttrs : ''}>`;
    });

    // Replace </StickyCard> with </section>
    content = content.replace(/<\/StickyCard>/g, '</section>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Reverted', file);
});
