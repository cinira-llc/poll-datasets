import {EventBridgeHandler} from "aws-lambda";
import _ from "lodash";

export const handler: EventBridgeHandler<"Scheduled Event", any, string> = async (event) => {
    const payload = _.assign({}, event, {
        something: "else"
    });
    return JSON.stringify(payload);
}
