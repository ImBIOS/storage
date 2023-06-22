import type { IncomingMessage } from 'node:http';

export function validateUploadToken(
  request: IncomingMessage | Request,
): boolean {
  const cookie =
    'credentials' in request
      ? request.headers.get('cookie') ?? ''
      : request.headers.cookie ?? '';

  return Boolean(
    cookie &&
      new RegExp(`blobUpload=${process.env.BLOB_UPLOAD_SECRET ?? ''}`).test(
        cookie,
      ),
  );
}