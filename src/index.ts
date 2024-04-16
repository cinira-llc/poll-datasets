import {EventBridgeHandler} from "aws-lambda";
import {S3} from "aws-sdk";
import _ from "lodash";

const s3 = new S3({
    apiVersion: "2006-03-01"
});

export const handler: EventBridgeHandler<"Scheduled Event", any, string> = async (event) =>
    new Promise<string>((resolve, reject) => {
        s3.listObjects({
            Bucket: "cinira",
            Prefix: "faa-cifp/CIFP_"
        }, (err, data) => {
            if (err) {
                reject(err.message);
            }
            const keys = _.transform(data.Contents || [], (contents, {Key}) => {
                contents.push(Key || "(unknown)");
            }, [] as string[]);
            resolve(JSON.stringify({
                event, keys
            }));
        });
    });
