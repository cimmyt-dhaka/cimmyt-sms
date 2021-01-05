const
  { Router } = require('express'),
  { request } = require('axios'),
  router = Router(),

  { smsKey, smsServer, smsSenderID } = require('../config/keys'),

  analyzeResponse = require('../utils/analyze-sms-send'),
  middlewareKeyValidation = require('../middleware/key-validation');

// Visit: https://swagger.io/docs/specification/about/
/**
 * @swagger
 * /send:
 *   post:
 *     summary: Sends one or multiple SMS
 *     description: This is the main route to send SMS to the desired recipient(s).
 *     tags: [Send SMS]
 *     parameters:
 *       - in: query
 *         name: apikey
 *         required: true
 *         description: API key provided by CIMMYT
 *         schema:
 *           type: string
 *     requestBody:
 *       description: "**Properties in request body**<br/><br/>**- to:** Pass the numbers of the recepients. If there are multiple recepients, seperate the values with a comma ','. The phone numbers in Bangladesh start with 01, i.e., 017... (Grameenphone), 018... (Robi), etc. These numbers will have to be prepended by the phone code (88) of the country.<br/>*Example:* Single recipient: **{ to: '8801824367257' }**, Multiple recipient **{ to: '8801824367257,8801892406159' }**<br/><br/> **- body:** The message of the SMS.<br/>*Example:* **{ body: 'Hello world!' }**<br/><br/> **- unicode:** Set it *true* if the body consists of bengali unicode characters."
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             properties:
 *               to:
 *                 type: string
 *               body:
 *                 type: string
 *               unicode:
 *                 type: boolean
 */
router.post('/send', middlewareKeyValidation, async (req, res) => {
  const { to, body, unicode } = req.body;

  try {
    const
      params = {
        api_key: smsKey,
        type: unicode ? 'unicode' : 'text',
        contacts: to.split(',').join('+'),
        senderid: smsSenderID,
        msg: body
      },
      resRequest = await request({
        url: '/smsapi',
        method: 'get',
        baseURL: smsServer,
        params
      }),
      analysis = await analyzeResponse(resRequest.data);

    res.json(analysis);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/balance', middlewareKeyValidation, async (req, res) => {
  try {
    resRequest = await request({
      url: `/miscapi/${smsKey}/getBalance`,
      method: 'get',
      baseURL: smsServer
    });

    res.json(resRequest.data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
