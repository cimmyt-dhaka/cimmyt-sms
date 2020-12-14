const
  oid = "",
  email = "",
  api_key = Buffer.from(`${oid}+${email}`).toString('base64');

console.log({ email, api_key });
