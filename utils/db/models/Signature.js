/* eslint-disable func-names */
import { Schema, model, models } from 'mongoose';

import { signatures, toJSONDate, status } from '../collections';

const SignatureSchema = new Schema(
  {
    anonymous: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    first_name: String,
    last_name: String,
    message: String,
    status: {
      type: Number,
      default: status.INACTIVE
    }
  },
  { timestamps: true }
);

SignatureSchema.index({ email: 1 }, { unique: true });

SignatureSchema.virtual('id').get(function () {
  return this._id.toString();
});
SignatureSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: (_, { _id, ...signature }) => {
    toJSONDate(signature, ['createdAt', 'updatedAt']);
    return signature;
  }
});

const loadMoreOptions = {
  since: new Date(),
  after: '',
  limit: 10,
  seen: ''
};
async function loadMore(options = loadMoreOptions) {
  const updatedOptions = {
    ...loadMoreOptions,
    ...options
  };
  let exclude = [];

  if (updatedOptions.seen) {
    exclude = updatedOptions.seen.split(',');
  }

  const match = {
    status: status.ACTIVE,
    message: { $gt: '' },
    _id: { $nin: exclude },
    updatedAt: { $lte: updatedOptions.since }
  };

  if (updatedOptions.after) {
    const start = await this.findById(updatedOptions.after);

    if (start) {
      match.updatedAt.$lte = start.updatedAt;
    }
  }

  return this.find(match, { email: 0 })
    .sort('-updatedAt')
    .limit(updatedOptions.limit);
}

function getTotal(strict) {
  const match = {
    status: status.ACTIVE
  };

  if (strict) {
    match.message = { $gt: '' };
  }

  return this.countDocuments(match);
}

SignatureSchema.static('loadMore', loadMore);
SignatureSchema.static('getTotal', getTotal);

const Signature =
  models.Signature ||
  model(signatures.model, SignatureSchema, signatures.collection);

export default Signature;
