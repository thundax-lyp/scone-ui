import { readdir, readFile, writeFile } from "node:fs/promises";

const rootUrl = new URL("../", import.meta.url);
const args = new Set(process.argv.slice(2));
const shouldCheck = args.has("--check");
const shouldWrite = args.has("--write");

if (shouldCheck === shouldWrite) {
    process.stderr.write("Usage: node scripts/sync-workspace-version.mjs --check|--write\n");
    process.exit(1);
}

const readJson = async (url) => JSON.parse(await readFile(url, "utf8"));
const writeJson = async (url, value) => {
    await writeFile(url, `${JSON.stringify(value, null, 4)}\n`);
};

const rootPackageUrl = new URL("package.json", rootUrl);
const rootPackage = await readJson(rootPackageUrl);
const rootVersion = rootPackage.version;

if (typeof rootVersion !== "string" || rootVersion.length === 0) {
    process.stderr.write("Root package.json must define a non-empty version.\n");
    process.exit(1);
}

const workspacePackageUrls = [];

for (const workspaceDir of ["apps", "packages"]) {
    const workspaceUrl = new URL(`${workspaceDir}/`, rootUrl);
    const entries = await readdir(workspaceUrl, { withFileTypes: true });

    for (const entry of entries) {
        if (entry.isDirectory()) {
            workspacePackageUrls.push(new URL(`${entry.name}/package.json`, workspaceUrl));
        }
    }
}

const mismatches = [];

for (const packageUrl of workspacePackageUrls) {
    const packageJson = await readJson(packageUrl);

    if (packageJson.version !== rootVersion) {
        mismatches.push({
            name: packageJson.name ?? packageUrl.pathname,
            current: packageJson.version,
            expected: rootVersion,
            packageUrl,
        });

        if (shouldWrite) {
            packageJson.version = rootVersion;
            await writeJson(packageUrl, packageJson);
        }
    }
}

if (mismatches.length === 0) {
    process.stdout.write(`Workspace package versions are synced at ${rootVersion}.\n`);
    process.exit(0);
}

if (shouldWrite) {
    process.stdout.write(`Synced ${mismatches.length} package version(s) to ${rootVersion}.\n`);
    process.exit(0);
}

process.stderr.write("Workspace package versions are not synced with root package.json:\n");
for (const mismatch of mismatches) {
    process.stderr.write(
        `- ${mismatch.name}: ${mismatch.current ?? "<missing>"} -> ${mismatch.expected}\n`,
    );
}
process.stderr.write("Run pnpm version:sync to update workspace package versions.\n");
process.exit(1);
