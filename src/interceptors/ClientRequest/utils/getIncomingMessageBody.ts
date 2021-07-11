import { once } from 'events'
import { IncomingMessage } from 'http'
import { Stream } from 'stream'
import * as zlib from 'zlib'

export async function getIncomingMessageBody(res: IncomingMessage): Promise<string> {
  let responseBody = ''
  let stream: Stream = res

  if (res.headers['content-encoding'] === 'gzip') {
    stream = res.pipe(zlib.createGunzip())
  }
  
  stream.on('data', (chunk) => (responseBody += chunk));

  once(res, 'error', { signal: controller.signal }).then(e => {
    throw e;
  });

  return once(res, 'end', { signal: controller.signal }).then(() => {
    return responseBody;
  });
}
