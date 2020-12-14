const
  express = require('express'),
  { request } = require('axios'),
  router = express.Router(),

  { SMSAPIKEY, SMSURL, SMSSENDERID } = process.env,

  isKeyValid = require('../utils/is-valid-key');


router.post('/send', /*authMiddleware,*/ async (req, res) => {
  const
    { to, body, unicode } = req.body,
    { key } = req.query;

  try {
    const keyItems = await isKeyValid(key);
    if (!keyItems) return res
      .status(401)
      .json({ error: "Invalid key" });

    const
      params = {
        api_key: SMSAPIKEY,
        type: unicode ? 'unicode' : 'text',
        contacts: to.split(',').join('+'),
        senderid: SMSSENDERID,
        msg: body
      },
      resRequest = await request({
        url: '/smsapi',
        method: 'get',
        baseURL: SMSURL,
        params
      });

    res.json(resRequest.data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/balance', /*authMiddleware,*/ async (req, res) => {
  try {
    resRequest = await request({
      url: `/miscapi/${SMSAPIKEY}/getBalance`,
      method: 'get',
      baseURL: SMSURL
    });

    res.json(resRequest.data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
