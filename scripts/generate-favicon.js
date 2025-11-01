const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

(async () => {
  const projectRoot = path.resolve(__dirname, '..');
  const inPng = path.join(projectRoot, 'public', 'foresite-logo.png');
  const outDir = path.join(projectRoot, 'public');
  try {
    const sizes = [16, 32, 48];
    const tempFiles = [];
    for (const s of sizes) {
      const out = path.join(outDir, `_fav-${s}.png`);
      await sharp(inPng).resize(s, s).toFile(out);
      tempFiles.push(out);
    }
    const buf = await pngToIco(tempFiles);
    fs.writeFileSync(path.join(outDir, 'favicon.ico'), buf);
    console.log('public/favicon.ico created');
    // cleanup temporary PNGs
    for (const f of tempFiles) {
      try { fs.unlinkSync(f); } catch (e) { /* ignore */ }
    }
  } catch (e) {
    console.error('Error creating favicon.ico:', e);
    process.exit(1);
  }
})();
