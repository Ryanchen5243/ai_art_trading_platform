import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({allErrors: true});
addFormats(ajv);
const userSchema = {
    type: "object",
    properties: {
        username: {type: "string"}, // with regex
        password: {type: "string"}, // bcrypt hash
        date_joined: {type: "string",format: "date-time"},
        account_value: {type: "integer",minimum: 0}, // cents
        stocks: {} // [(ArtStock,Double)* ] (second param is the shares)
    },
    required: ["foo"],
    additionalProperties: false
}


const validateUser = ajv.compile(userSchema);
export default validateUser;