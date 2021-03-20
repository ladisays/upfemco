import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Spinner from 'components/Spinner';
import { useLazyAsync } from 'hooks/async';
import { isFailed, isIdle, isPending } from 'utils/operations';

const fetcher = (body) => axios.post('/api/confirm', body);

const ConfirmPage = () => {
  const { query, replace, isReady } = useRouter();
  const [{ loading }, confirmCode] = useLazyAsync(fetcher, {
    onCompleted() {
      localStorage.setItem('uf-cfmd', true);
      replace('/');
    },
    onError(e) {
      console.log(e);
    }
  });

  useEffect(() => {
    if (query.code && query.sid && isIdle(loading)) {
      confirmCode(query);
    }
  }, [confirmCode, isReady, loading, query, replace]);

  if (isPending(loading)) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (isFailed(loading)) {
    return 'An error occurred with confirmation';
  }

  return null;
};

export default ConfirmPage;
