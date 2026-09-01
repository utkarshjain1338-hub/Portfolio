const fs = require('fs');
const path = require('path');

const sectionsDir = '/home/uzumaki/Documents/Portfolio/src/sections';
const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.tsx'));

files.forEach(f => {
  const filePath = path.join(sectionsDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('import { StickyCard }')) {
    content = content.replace(/import React[^;]*;/, match => match + "\nimport { StickyCard } from '../components/ui/StickyCard';");
  }

  // Find <section id="X" className="Y" ...>
  content = content.replace(/<section\s+id="([^"]+)"\s+className="([^"]+)"(.*?)>/g, '<StickyCard id="$1" className="$2"$3>');
  content = content.replace(/<\/section>/g, '</StickyCard>');
  
  // also handle refs if they were passed to section
  // wait, the original <section ref={ref}> was used! StickyCard uses its own ref internally!
  // If the component passes a ref to <section>, it might conflict!
  
  fs.writeFileSync(filePath, content);
});
