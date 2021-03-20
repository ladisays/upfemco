import dbconnect from 'utils/db/connect';
import Signature from 'utils/db/models/Signature';
import Token from 'utils/db/models/Token';
import { methods, notAllowed, buildError, buildData } from 'utils/operations';
import { status } from 'utils/db/collections';

const handler = async (req, res) => {
  await dbconnect();

  switch (req.method) {
    case methods.POST:
      try {
        const { code, sid } = req.body;
        const signature = await Signature.findById(sid);

        if (signature) {
          const token = await Token.findOne({ signature: sid, code });

          if (token) {
            await Token.findByIdAndDelete(token.id);
            await Signature.findByIdAndUpdate(
              signature.id,
              { status: status.ACTIVE },
              { new: true }
            );
            return res.status(201).json(buildData());
          }
          return res
            .status(400)
            .json(buildError(null, 'confirm/token-not-found'));
        }
        return res
          .status(400)
          .json(buildError(null, 'confirm/signature-not-found'));
      } catch (error) {
        return res
          .status(400)
          .json(buildError(error), 'confirm/invalid-request');
      }
    default:
      return notAllowed(res, [methods.POST]);
  }
};

export default handler;
