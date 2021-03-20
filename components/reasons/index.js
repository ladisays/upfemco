import { useState } from 'react';
import axios from 'axios';

import { useLazyAsync } from 'hooks/async';
import Reason from './Reason';

const reasonsFn = (params) => {
  const query = `/api/sign?since=${params.since}&after=${params.after}&seen=${params.seen}`;

  return axios.get(query);
};

const Reasons = ({ className, signatures = [], total = 0 }) => {
  const [reasons, setReasons] = useState(signatures);
  const [totalCount, setTotalCount] = useState(total);
  const [, fetchReasons] = useLazyAsync(reasonsFn, {
    data: [],
    onCompleted(res) {
      setReasons((r) => [...r, ...res.list]);
      setTotalCount(res.total);
    }
  });
  const handleClick = () => {
    const last = reasons[reasons.length - 1];
    const seen = reasons
      .filter((item) => item.updatedAt === last.updatedAt)
      .map((item) => item.id)
      .join(',');
    if (reasons.length < totalCount) {
      fetchReasons({ since: last.updatedAt, seen, after: '' });
    }
  };

  return (
    !!signatures.length && (
      <div className={className}>
        <h2>Reasons for signing</h2>
        <ul>
          {reasons.map((item) => (
            <Reason key={item.id} {...item} />
          ))}
        </ul>
        {!!(total && reasons.length !== total) && (
          <button type="button" onClick={handleClick}>
            Show more
          </button>
        )}
      </div>
    )
  );
};

export default Reasons;
