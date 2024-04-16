import {readTextResources} from "@cinira-llc/test-js";
import {extractHrefs} from "../src/ScrapeUtils";

describe("ScrapeUtils", () => {
    describe("extractLinks()", () => {
        it("Extracts links from cifp-index.html sample index", async () => {
            const [[, html]] = await readTextResources(__dirname, "./cifp-index.html");
            const hrefs = extractHrefs(html, /\/CIFP_(\d{6})\.zip/g);
            expect(hrefs).toStrictEqual([
                ["240321", ["https://aeronav.faa.gov/Upload_313-d/cifp/CIFP_240321.zip"]],
                ["240418", ["https://aeronav.faa.gov/Upload_313-d/cifp/CIFP_240418.zip"]]
            ]);
        });
        it("Extracts links from dtpp-index.html sample index", async () => {
            const [[, html]] = await readTextResources(__dirname, "./dtpp-index.html");
            const hrefs = extractHrefs(html, /\/DDTPP[A-Z]_(\d{6})\.zip/g);
            expect(hrefs).toStrictEqual([
                ["240321", [
                    "https://aeronav.faa.gov/upload_313-d/terminal/DDTPPA_240321.zip",
                    "https://aeronav.faa.gov/upload_313-d/terminal/DDTPPB_240321.zip",
                    "https://aeronav.faa.gov/upload_313-d/terminal/DDTPPC_240321.zip",
                    "https://aeronav.faa.gov/upload_313-d/terminal/DDTPPD_240321.zip",
                    "https://aeronav.faa.gov/upload_313-d/terminal/DDTPPE_240321.zip"
                ]],
                ["240418", [
                    "https://aeronav.faa.gov/upload_313-d/terminal/DDTPPA_240418.zip",
                    "https://aeronav.faa.gov/upload_313-d/terminal/DDTPPB_240418.zip",
                    "https://aeronav.faa.gov/upload_313-d/terminal/DDTPPC_240418.zip",
                    "https://aeronav.faa.gov/upload_313-d/terminal/DDTPPD_240418.zip",
                    "https://aeronav.faa.gov/upload_313-d/terminal/DDTPPE_240418.zip"
                ]]
            ]);
        });
    });
});
