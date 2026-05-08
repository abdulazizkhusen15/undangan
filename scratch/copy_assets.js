const fs = require('fs');
const path = require('path');

const files = [
  { 
    src: "C:\\Users\\windows 10\\.gemini\\antigravity\\brain\\96ef4ecb-0533-45c5-a03c-fdc946256d3d\\red_floral_pure_ornament_1778257792025.png",
    dest: path.join(__dirname, "public", "templates", "red-floral", "ornament.png")
  },
  {
    src: "C:\\Users\\windows 10\\.gemini\\antigravity\\brain\\96ef4ecb-0533-45c5-a03c-fdc946256d3d\\red_floral_catalog_thumb_1778257897586.png",
    dest: path.join(__dirname, "public", "templates", "red-floral-thumb.png")
  }
];

files.forEach(f => {
  try {
    fs.copyFileSync(f.src, f.dest);
    console.log(`Copied ${f.src} to ${f.dest}`);
  } catch (e) {
    console.error(`Failed to copy ${f.src}: ${e.message}`);
  }
});
