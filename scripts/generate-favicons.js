#!/usr/bin/env node

/**
 * Generate favicon assets from source PNG.
 * Creates: favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, favicon.ico
 */

import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceImage = path.join(__dirname, "../public/vaerox-mark.png");
const publicDir = path.join(__dirname, "../public");

async function generateFavicons() {
  console.log("🎯 Generating favicon assets...\n");

  const formats = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "apple-touch-icon.png", size: 180 },
  ];

  try {
    // Verify source exists
    if (!fs.existsSync(sourceImage)) {
      throw new Error(`Source image not found: ${sourceImage}`);
    }

    // Generate PNG variants
    for (const format of formats) {
      const outputPath = path.join(publicDir, format.name);
      await sharp(sourceImage)
        .resize(format.size, format.size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toFile(outputPath);
      console.log(`✓ Generated ${format.name}`);
    }

    // Generate favicon.ico (16x16)
    const icoPath = path.join(publicDir, "favicon.ico");
    await sharp(sourceImage)
      .resize(16, 16, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(icoPath);
    console.log(`✓ Generated favicon.ico`);

    console.log("\n✅ All favicon assets generated successfully!\n");
    console.log("Generated files:");
    formats.forEach((f) => console.log(`  - public/${f.name}`));
    console.log(`  - public/favicon.ico`);
  } catch (error) {
    console.error("❌ Error generating favicons:", error.message);
    process.exit(1);
  }
}

generateFavicons();
