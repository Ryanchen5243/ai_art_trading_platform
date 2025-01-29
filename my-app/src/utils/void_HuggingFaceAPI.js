import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

const payload = {
  prompt: "A fierce phoenix rising from the ashes, wings ablaze with fiery colors, in a stormy sky above a burning city.",
  output_format: "jpeg"
};

const response = await axios.postForm(
  `https://api.stability.ai/v2beta/stable-image/generate/sd3`,
  axios.toFormData(payload, new FormData()),
  {
    validateStatus: undefined,
    responseType: "arraybuffer",
    headers: { 
      Authorization: `Bearer sk-u80Sjuw0Mv7sqENEjHoVoenXD02gq1boXFZBU7vQVdt8CbWn`, 
      Accept: "image/*" 
    },
  },
);

if(response.status === 200) {
  fs.writeFileSync("./onee.jpeg", Buffer.from(response.data));
} else {
  throw new Error(`${response.status}: ${response.data.toString()}`);
}