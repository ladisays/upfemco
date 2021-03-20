export const signatures = {
  model: 'Signature',
  collection: 'signatures'
};

export const tokens = {
  model: 'Token',
  collection: 'tokens'
};

export const status = {
  INACTIVE: 0,
  ACTIVE: 1,
  DISABLED: 2
};

export const toJSONDate = (doc, keys) => {
  if (!doc) {
    return;
  }

  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      if (doc[key]) {
        doc[key] = doc[key].toJSON();
      }
    });
  } else if (typeof keys === 'string' && doc[keys]) {
    doc[keys] = doc[keys].toJSON();
  }
};
