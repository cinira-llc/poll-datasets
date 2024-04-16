import {S3Client, ListObjectsCommand} from "@aws-sdk/client-s3";
import _ from "lodash";

const s3 = new S3Client();

export const handler = async (event: object) => {
    const response = await s3.send(new ListObjectsCommand({
        Bucket: "cinira",
        Prefix: "faa-cifp/CIFP_"
    }));
    const keys = _.transform(response.Contents || [], (contents, {Key}) => {
        contents.push(Key || "(unknown)");
    }, [] as string[]);
    return JSON.stringify({event, keys});
}
