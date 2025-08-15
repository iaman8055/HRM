import { Readable } from "stream";

function bufferToStream(bufferOrString) {
  if (typeof bufferOrString === "string") {
    bufferOrString = Buffer.from(bufferOrString);
  }

  const stream = new Readable();
  stream.push(bufferOrString);
  stream.push(null); // End of stream
  return stream;
}

export default bufferToStream;
