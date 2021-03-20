import { useEffect, useState } from 'react';
import axios from 'axios';

import { isFulfilled } from 'utils/operations';
import { useAsync } from './async';

const fetcher = () => axios.get('/api/count');

const formatNumber = (num) => new Intl.NumberFormat('en-GB').format(num);
const buildText = (count, isSelfSigned) => {
  if (count > 1) {
    let text = 'others have shown their support';

    if (isSelfSigned) {
      text = `You and ${formatNumber(count - 1)} ${text}`;
    } else {
      text = `${formatNumber(count)} ${text}`;
    }
    return text;
  }
  return '';
};

const useSignatureCount = () => {
  const [text, setText] = useState('');
  const [{ loading, data, error }, fetchCount] = useAsync(fetcher, {
    data: {}
  });

  useEffect(() => {
    const sid = localStorage.getItem('uf-sid');

    if (isFulfilled(loading)) {
      setText(buildText(data.count, sid));
    }
  }, [data.count, loading]);

  return [
    { loading, count: formatNumber(data.count), error, text },
    fetchCount
  ];
};

export default useSignatureCount;
