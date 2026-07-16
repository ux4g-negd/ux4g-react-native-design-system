/**
 * Script to extract SVG path data from Flutter SVG assets and generate
 * a TypeScript icon data module for the React Native SocialLinks component.
 *
 * Usage: node scripts/generate-social-icons.js
 */

const fs = require('fs');
const path = require('path');

const FLUTTER_ICONS_DIR = path.resolve(__dirname, '../../openforge/ux4g-flutter-design-system/assets/icons');
const OUTPUT_FILE = path.resolve(__dirname, '../src/components/social-links/socialIconData.ts');

// Map: enum name -> { whiteFilename, colorFilename }
const ICON_MAP = {
  android: { white: 'Android_White.svg', color: 'Android_color.svg' },
  apple: { white: 'Apple_White.svg', color: 'Apple_color.svg' },
  behance: { white: 'Behane_white.svg', color: 'Behane_color.svg' },
  dribbble: { white: 'Dribbbe_White.svg', color: 'Dribbbe_color.svg' },
  figma: { white: 'Figma_White.svg', color: 'Figma_color.svg' },
  github: { white: 'Github_White.svg', color: 'Github_color.svg' },
  gmail: { white: 'Gmail_White.svg', color: 'Gmail_color.svg' },
  googleMeet: { white: 'Google Meet_White.svg', color: 'Google Meet_color.svg' },
  googlePlay: { white: 'Google Play_White.svg', color: 'Google Play_color.svg' },
  google: { white: 'Google_White.svg', color: 'Google_color.svg' },
  instagram: { white: 'Instagram_White.svg', color: 'Instagram_color.svg' },
  medium: { white: 'Medium_White.svg', color: 'Medium_color.svg' },
  microsoftTeams: { white: 'Microsoft Teams_White.svg', color: 'Microsoft Teams_color.svg' },
  notion: { white: 'Notion_White.svg', color: 'Notion_color.svg' },
  reddit: { white: 'Reddit_White.svg', color: 'Reddit_color.svg' },
  skype: { white: 'Skype_White.svg', color: 'Skype_color.svg' },
  slack: { white: 'Slack_White.svg', color: 'Slack_color.svg' },
  social: { white: 'Social_White.svg', color: 'Social_color.svg' },
  stackoverflow: { white: 'StackOverflow_White.svg', color: 'StackOverflow_color.svg' },
  twitter: { white: 'Twitter_White.svg', color: 'Twitter_color.svg' },
  vector: { white: 'Vector_white.svg', color: 'Vector_color.svg' },
  whatsapp: { white: 'WhatsApp_White.svg', color: 'WhatsApp_color.svg' },
  youtube: { white: 'YouTube_White.svg', color: 'YouTube_color.svg' },
  zoom: { white: 'Zoom_White.svg', color: 'Zoom_color.svg' },
};

function extractViewBox(svgContent) {
  const match = svgContent.match(/viewBox="([^"]+)"/);
  return match ? match[1] : '0 0 24 24';
}

function extractPaths(svgContent) {
  const paths = [];
  // Match <path ... /> tags
  const pathRegex = /<path\s[^>]*?\/>/g;
  let m;
  while ((m = pathRegex.exec(svgContent)) !== null) {
    const tag = m[0];
    const d = tag.match(/\sd="([^"]+)"/);
    const fill = tag.match(/\sfill="([^"]+)"/);
    const fillRule = tag.match(/\sfill-rule="([^"]+)"/);
    const clipRule = tag.match(/\sclip-rule="([^"]+)"/);
    if (d) {
      const entry = { d: d[1] };
      if (fill) entry.fill = fill[1];
      if (fillRule) entry.fillRule = fillRule[1];
      if (clipRule) entry.clipRule = clipRule[1];
      paths.push(entry);
    }
  }
  return paths;
}

function extractCircles(svgContent) {
  const circles = [];
  const circleRegex = /<circle\s[^>]*?\/>/g;
  let m;
  while ((m = circleRegex.exec(svgContent)) !== null) {
    const tag = m[0];
    const cx = tag.match(/\scx="([^"]+)"/);
    const cy = tag.match(/\scy="([^"]+)"/);
    const r = tag.match(/\sr="([^"]+)"/);
    const fill = tag.match(/\sfill="([^"]+)"/);
    if (cx && cy && r) {
      const entry = { cx: cx[1], cy: cy[1], r: r[1] };
      if (fill) entry.fill = fill[1];
      circles.push(entry);
    }
  }
  return circles;
}

function extractRects(svgContent) {
  const rects = [];
  // Match <rect> tags that are NOT inside <defs> (skip clip rects)
  // Simple approach: just skip rects inside defs
  const contentWithoutDefs = svgContent.replace(/<defs>[\s\S]*?<\/defs>/g, '');
  const rectRegex = /<rect\s[^>]*?\/>/g;
  let m;
  while ((m = rectRegex.exec(contentWithoutDefs)) !== null) {
    const tag = m[0];
    const x = tag.match(/\sx="([^"]+)"/);
    const y = tag.match(/\sy="([^"]+)"/);
    const w = tag.match(/\swidth="([^"]+)"/);
    const h = tag.match(/\sheight="([^"]+)"/);
    const fill = tag.match(/\sfill="([^"]+)"/);
    const rx = tag.match(/\srx="([^"]+)"/);
    // Skip white fill rects that are just clip masks
    if (fill && fill[1] === 'white') continue;
    if (x && y && w && h) {
      const entry = { x: x[1], y: y[1], width: w[1], height: h[1] };
      if (fill) entry.fill = fill[1];
      if (rx) entry.rx = rx[1];
      rects.push(entry);
    }
  }
  return rects;
}

function parseSvg(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const viewBox = extractViewBox(content);
  const paths = extractPaths(content);
  const circles = extractCircles(content);
  const rects = extractRects(content);
  return { viewBox, paths, circles, rects };
}

// Generate
const results = {};

for (const [name, files] of Object.entries(ICON_MAP)) {
  const whitePath = path.join(FLUTTER_ICONS_DIR, files.white);
  const colorPath = path.join(FLUTTER_ICONS_DIR, files.color);

  if (!fs.existsSync(whitePath)) {
    console.warn(`WARN: Missing white SVG for "${name}": ${whitePath}`);
    continue;
  }
  if (!fs.existsSync(colorPath)) {
    console.warn(`WARN: Missing color SVG for "${name}": ${colorPath}`);
    continue;
  }

  results[name] = {
    white: parseSvg(whitePath),
    color: parseSvg(colorPath),
  };
}

// Generate TypeScript output
let output = `/**
 * Auto-generated social media icon SVG data.
 * Extracted from Flutter ux4g-flutter-design-system/assets/icons/*.svg
 *
 * DO NOT EDIT MANUALLY — regenerate with: node scripts/generate-social-icons.js
 */

import { SocialMediaIcon } from './SocialLinks';

export interface SvgPathDef {
  d: string;
  fill?: string;
  fillRule?: 'evenodd' | 'nonzero';
  clipRule?: 'evenodd' | 'nonzero';
}

export interface SvgCircleDef {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
}

export interface SvgRectDef {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  fill?: string;
}

export interface SvgIconDef {
  viewBox: string;
  paths: SvgPathDef[];
  circles?: SvgCircleDef[];
  rects?: SvgRectDef[];
}

export const SOCIAL_SVG_ICONS: Record<SocialMediaIcon, { white: SvgIconDef; color: SvgIconDef }> = {\n`;

for (const [name, data] of Object.entries(results)) {
  output += `  ${name}: {\n`;

  for (const variant of ['white', 'color']) {
    const v = data[variant];
    output += `    ${variant}: {\n`;
    output += `      viewBox: '${v.viewBox}',\n`;
    output += `      paths: [\n`;
    for (const p of v.paths) {
      let parts = [`d: '${p.d}'`];
      if (p.fill) parts.push(`fill: '${p.fill}'`);
      if (p.fillRule) parts.push(`fillRule: '${p.fillRule}'`);
      if (p.clipRule) parts.push(`clipRule: '${p.clipRule}'`);
      output += `        { ${parts.join(', ')} },\n`;
    }
    output += `      ],\n`;

    if (v.circles.length > 0) {
      output += `      circles: [\n`;
      for (const c of v.circles) {
        let parts = [`cx: ${c.cx}`, `cy: ${c.cy}`, `r: ${c.r}`];
        if (c.fill) parts.push(`fill: '${c.fill}'`);
        output += `        { ${parts.join(', ')} },\n`;
      }
      output += `      ],\n`;
    }

    if (v.rects.length > 0) {
      output += `      rects: [\n`;
      for (const r of v.rects) {
        let parts = [`x: ${r.x}`, `y: ${r.y}`, `width: ${r.width}`, `height: ${r.height}`];
        if (r.rx) parts.push(`rx: ${r.rx}`);
        if (r.fill) parts.push(`fill: '${r.fill}'`);
        output += `        { ${parts.join(', ')} },\n`;
      }
      output += `      ],\n`;
    }

    output += `    },\n`;
  }

  output += `  },\n`;
}

output += `};\n`;

fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
console.log(`✅ Generated ${OUTPUT_FILE}`);
console.log(`   Icons: ${Object.keys(results).length}`);
