import {EventBridgeEvent} from "aws-lambda";
import {S3Client, ListObjectsCommand} from "@aws-sdk/client-s3";
import _ from "lodash";
import {extractHrefs} from "./ScrapeUtils";

const s3 = new S3Client();

interface SampleEvent {
    key: string;
}

export const handler = async (event: EventBridgeEvent<"Scheduled Event", SampleEvent>) => {
    const cifpResponse = await fetch("https://www.faa.gov/");
    const hrefs = await cifpResponse.text();
    // const hrefs = extractHrefs(await cifpResponse.text(), /\/CIFP_(\d{6})\.zip/g);
    const response = await s3.send(new ListObjectsCommand({
        Bucket: "cinira",
        Prefix: "datasets/"
    }));
    const keys = _.transform(response.Contents || [], (contents, {Key}) => {
        contents.push(Key || "(unknown)");
    }, [] as string[]);
    event.detail
    return JSON.stringify({event, hrefs, keys});
}
