import dbconnect from 'utils/db/connect';
import Signature from 'utils/db/models/Signature';
import { methods, notAllowed, buildError, buildData } from 'utils/operations';

const handler = async (req, res) => {
  await dbconnect();

  switch (req.method) {
    case methods.GET:
      try {
        const { strict } = req.query;
        const count = await Signature.getTotal(strict);

        return res.status(200).json(buildData({ count }));
      } catch (error) {
        return res
          .status(400)
          .json(buildError(error), 'confirm/invalid-request');
      }
    default:
      return notAllowed(res, [methods.GET]);
  }
};

export default handler;
