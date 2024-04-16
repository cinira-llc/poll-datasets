import {EventBridgeEvent} from "aws-lambda";
import {S3Client, ListObjectsCommand} from "@aws-sdk/client-s3";
import _ from "lodash";

const s3 = new S3Client();

interface SampleEvent {
    key: string;
}

export const handler = async (event: EventBridgeEvent<"Scheduled Event", SampleEvent>) => {
    const response = await s3.send(new ListObjectsCommand({
        Bucket: "cinira",
        Prefix: "datasets/"
    }));
    const keys = _.transform(response.Contents || [], (contents, {Key}) => {
        contents.push(Key || "(unknown)");
    }, [] as string[]);
    event.detail
    return JSON.stringify({
        event, keys,
        detail: event.detail
    });
}
