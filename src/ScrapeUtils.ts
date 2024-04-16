/**
 * Extract links from a block of text. Links are recognized via a `matcher` which must match *after* the `https://`
 * protocol segment and *until* the end of the link; it should include one capturing group which is used as a grouping
 * key.
 *
 * @param html the HTML document.
 * @param matcher the link matcher.
 */
export function extractHrefs(html: string, matcher: RegExp): [key: string, hrefs: string[]][] {
    const hrefs = new Map<string, string[]>();
    let match: RegExpMatchArray | null;
    while (null != (match = matcher.exec(html))) {
        const [file, cycle] = match;
        const index = match.index!;
        const href = html.substring(html.lastIndexOf("https://", index), index + file.length);
        if (!hrefs.has(cycle)) {
            hrefs.set(cycle, [href]);
        } else {
            const all = hrefs.get(cycle)!;
            if (-1 === all.indexOf(href)) {
                all.push(href);
            }
        }
    }
    return Array.from(hrefs.entries());
}
