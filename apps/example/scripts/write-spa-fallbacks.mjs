import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const distDir = new URL("../dist/", import.meta.url);
const indexHtml = await readFile(new URL("index.html", distDir), "utf8");

const routes = [
    "/welcome",
    "/admin/sub-page",
    "/dashboard/analysis",
    "/dashboard/monitor",
    "/dashboard/workplace",
    "/form/basic-form",
    "/form/step-form",
    "/form/advanced-form",
    "/list/search/articles",
    "/list/search/projects",
    "/list/search/applications",
    "/list/table-list",
    "/list/basic-list",
    "/list/card-list",
    "/profile/basic",
    "/profile/advanced",
    "/result/success",
    "/result/fail",
    "/exception/403",
    "/exception/404",
    "/exception/500",
    "/account/center",
    "/account/settings",
    "/chatbot",
];

await Promise.all(
    routes.map(async (route) => {
        const fallbackPath = join(distDir.pathname, route, "index.html");

        await mkdir(dirname(fallbackPath), { recursive: true });
        await writeFile(fallbackPath, indexHtml);
    }),
);
