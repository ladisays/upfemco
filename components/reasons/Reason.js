import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import styles from 'styles/reason.module.css';

dayjs.extend(relativeTime);

const Reason = ({ anonymous, message, first_name, last_name, updatedAt }) => {
  const time = dayjs(updatedAt);
  const now = dayjs();

  return (
    <li className={styles.root}>
      <div className={styles.author}>
        <strong className={styles.name}>
          {anonymous ? 'Anonymous' : `${first_name} ${last_name}`}
        </strong>
        <span className={styles.time} title={time.format('DD MMM YYYY')}>
          <span>•</span>
          {now.diff(time, 'M') > 1
            ? time.format('DD MMM YYYY')
            : time.fromNow()}
        </span>
      </div>
      <div className={styles.message}>{message}</div>
    </li>
  );
};

export default Reason;
