import crypto from 'crypto';

import dbconnect from 'utils/db/connect';
import Signature from 'utils/db/models/Signature';
import Token from 'utils/db/models/Token';
import sendMail, { buildConfirmationMail } from 'utils/mail/sender';
import { methods, notAllowed, buildError, buildData } from 'utils/operations';

const handler = async (req, res) => {
  await dbconnect();

  switch (req.method) {
    case methods.GET:
      try {
        const list = await Signature.loadMore(req.query);
        const total = await Signature.getTotal(true);
        return res.status(200).json(buildData({ list, total }));
      } catch (error) {
        return res.status(400).json(buildError(error));
      }
    case methods.POST:
      try {
        const { status, ...body } = req.body;
        const signature = await Signature.create(body);
        const code = crypto.randomBytes(32).toString('hex');
        const token = await Token.create({ signature: signature.id, code });
        const link = `${process.env.NEXT_PUBLIC_ADDRESS}/confirm?code=${token.code}&sid=${signature.id}`;
        const data = {
          sid: signature.id,
          email: signature.email
        };

        if (process.env.NODE_ENV === 'production') {
          await sendMail(buildConfirmationMail(signature.email, link));
        } else {
          data.code = token.code;
        }
        return res.status(201).json(buildData(data));
      } catch (error) {
        let msg = '';
        if (error.code === 11000) msg = 'This email address already exists';
        return res.status(400).json(buildError(error, msg));
      }
    default:
      return notAllowed(res, [methods.POST]);
  }
};

export default handler;
