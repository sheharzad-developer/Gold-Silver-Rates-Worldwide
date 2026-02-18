#!/usr/bin/env node
/**
 * Build a static HTML export for Hostinger shared hosting.
 * Temporarily removes API routes, auth pages, and Clerk to enable output: 'export'.
 * Run: node scripts/build-static.js
 * Output: ./out (upload contents to Hostinger public_html)
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const BACKUP_DIR = path.join(ROOT, "scripts", ".static-build-backup");
const OUTPUT_DIR = path.join(ROOT, "hostinger", "website"); // HTML/CSS output folder
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

function run(cmd, opts = {}) {
  execSync(cmd, { stdio: "inherit", cwd: ROOT, ...opts });
}

function mv(from, to) {
  fs.renameSync(path.join(ROOT, from), path.join(ROOT, to));
}

function exists(p) {
  return fs.existsSync(path.join(ROOT, p));
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function clearDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true });
    } else {
      fs.unlinkSync(fullPath);
    }
  }
}

const backups = [];

function backupMove(from, to) {
  if (exists(from)) {
    mv(from, to);
    backups.push({ from: to, to: from });
  }
}

console.log("Preparing static export...\n");

// 1. Move API routes, sign-in, sign-up out of app (not supported in static export)
backupMove("src/app/api", "api-routes-backup");
backupMove("src/app/sign-in", "sign-in-backup");
backupMove("src/app/sign-up", "sign-up-backup");

// 2. Patch layout to not use Clerk (avoids Server Actions)
const layoutPath = path.join(ROOT, "src/app/layout.tsx");
const layoutBackup = path.join(BACKUP_DIR, "layout.tsx");
fs.copyFileSync(layoutPath, layoutBackup);

const layoutContent = fs.readFileSync(layoutPath, "utf8");
const patchedLayout = layoutContent
  .replace(
    /  if \(isClerkConfigured\(\)\) \{\s*return <ClerkProvider>\{content\}<\/ClerkProvider>;\s*\}\s*return content;/s,
    "  return content;"
  )
  .replace(
    /import \{ ClerkProvider \} from "@clerk\/nextjs";\s*\n/,
    "// ClerkProvider removed for static export\n"
  )
  .replace(
    /import \{ isClerkConfigured \} from "@\/lib\/clerk";\s*\n/,
    ""
  );
fs.writeFileSync(layoutPath, patchedLayout);

// 2b. Replace Header with Clerk-free version
const headerPath = path.join(ROOT, "src/components/Header.tsx");
const headerBackup = path.join(BACKUP_DIR, "Header.tsx");
fs.copyFileSync(headerPath, headerBackup);

const staticHeader = `import Link from "next/link";
import { CountryDropdown } from "./CountryDropdown";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-row flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 md:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight"
        >
          <span className="gradient-gold">◆</span>
          <span className="text-[var(--foreground)]">Gold & Silver</span>
        </Link>
        <nav className="flex shrink-0 items-center gap-2 sm:gap-3">
          <CountryDropdown />
        </nav>
      </div>
    </header>
  );
}
`;
fs.writeFileSync(headerPath, staticHeader);

// 2c. Move proxy.ts out (uses clerkMiddleware)
if (exists("src/proxy.ts")) {
  fs.renameSync(path.join(ROOT, "src/proxy.ts"), path.join(BACKUP_DIR, "proxy.ts"));
}

// 3. Add output: 'export' to next.config
const configPath = path.join(ROOT, "next.config.ts");
const configBackup = path.join(BACKUP_DIR, "next.config.ts");
fs.copyFileSync(configPath, configBackup);
backups.push({ from: "next.config.backup.ts", to: "next.config" });

let configContent = fs.readFileSync(configPath, "utf8");
configContent = configContent.replace(
  /const nextConfig: NextConfig = \{\s*\/\* config options here \*\/\s*\};/,
  "const nextConfig: NextConfig = {\n  output: \"export\",\n};"
);
fs.writeFileSync(configPath, configContent);

try {
  console.log("Building static export...\n");
  run("npm run build");

  // Copy output to hostinger/website folder (HTML + CSS ready for upload)
  const outDir = path.join(ROOT, "out");
  if (fs.existsSync(outDir)) {
    if (fs.existsSync(OUTPUT_DIR)) clearDir(OUTPUT_DIR);
    else fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    copyDirRecursive(outDir, OUTPUT_DIR);
  }

  console.log("\n✓ Static export complete!");
  console.log("  - Output: ./out (default)");
  console.log("  - Also copied to: hostinger/website (HTML + CSS)");
  console.log("\nUpload the contents of 'hostinger/website' to Hostinger:");
  console.log("  1. Log into Hostinger hPanel → File Manager → public_html");
  console.log("  2. Upload all files from hostinger/website");
  console.log("  Or zip hostinger/website contents and upload the .zip\n");
  console.log("Note: Gold/silver prices are baked in at build time.");
  console.log("Rebuild and re-upload periodically to refresh rates.\n");
} finally {
  // Restore everything
  console.log("Restoring project files...\n");
  fs.copyFileSync(layoutBackup, layoutPath);
  fs.unlinkSync(layoutBackup);
  fs.copyFileSync(configBackup, configPath);
  fs.unlinkSync(configBackup);
  fs.copyFileSync(headerBackup, headerPath);
  fs.unlinkSync(headerBackup);
  backupMove("api-routes-backup", "src/app/api");
  backupMove("sign-in-backup", "src/app/sign-in");
  backupMove("sign-up-backup", "src/app/sign-up");
  const proxyBackup = path.join(BACKUP_DIR, "proxy.ts");
  if (fs.existsSync(proxyBackup)) {
    fs.renameSync(proxyBackup, path.join(ROOT, "src/proxy.ts"));
  }
  console.log("✓ Restored.\n");
}
