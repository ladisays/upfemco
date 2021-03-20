import { useState } from 'react';
import axios from 'axios';

import { useLazyAsync } from 'hooks/async';
import useSignatureCount from 'hooks/signature-count';
import useConfirmSignature from 'hooks/confirm-signature';
import { isFulfilled, isFailed, isPending } from 'utils/operations';
import styles from 'styles/sign-form.module.css';
import Spinner from './Spinner';
import FormProvider, { Field } from './Form';

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  message: '',
  anonymous: false
};

const buildTweetIntent = () => {
  const text = encodeURIComponent(
    'Show your support for the Feminist Coalition - Sign the statement!'
  );
  const url = encodeURIComponent(process.env.NEXT_PUBLIC_ADDRESS);
  const hashtags = 'upfemco,feministcoalition';

  return `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`;
};

const validate = (form) => {
  const err = {};
  const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  if (!form.first_name.trim()) err.first_name = 'First name is required!';
  if (!form.last_name.trim()) err.last_name = 'Last name is required!';
  if (!form.email.trim()) {
    err.email = 'Email is required!';
  } else if (
    !(
      form.email.length > 5 &&
      form.email.length < 61 &&
      emailRegex.test(form.email)
    )
  ) {
    err.email = 'Email is invalid';
  }

  return err;
};

const Share = ({ message }) => {
  const [copyText, setCopyText] = useState('Copy Link');
  const [{ loading, count, text }] = useSignatureCount();
  const [isConfirmed] = useConfirmSignature();

  const handleCopy = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_ADDRESS).then(() => {
      setCopyText('Link Copied!');
    });
  };

  return (
    <div className={styles.share}>
      {isConfirmed === false && !!message && (
        <>
          <p>{message}</p>
          <hr />
        </>
      )}
      {isFulfilled(loading) && !!text && (
        <p>
          {count} people have signed this statement, thanks to the people who
          shared it. Join them too.
        </p>
      )}
      <div className={styles.actions}>
        <button type="button" onClick={handleCopy}>
          {copyText}
        </button>
        <a
          href={buildTweetIntent()}
          className="btn"
          target="_blank"
          rel="noreferrer">
          Tweet This
        </a>
      </div>
    </div>
  );
};

const fetcher = (data) => axios.post('/api/sign', data);

const SignatureForm = () => {
  const [message, setMessage] = useState('');
  const [isConfirmed] = useConfirmSignature();
  const [{ loading }, postSignature] = useLazyAsync(fetcher, {
    data: {},
    onCompleted(res) {
      localStorage.setItem('uf-sid', res.sid);
      setMessage(
        `Confirm your signature by clicking the link sent to ${res.email}`
      );
    },
    onError(e) {
      const msg = 'Failed to submit signature';
      setMessage(e?.message || msg);
    }
  });

  return (
    <div className={styles.root}>
      {isFulfilled(loading) || isConfirmed ? (
        <Share message={message} />
      ) : (
        <FormProvider
          initialValues={initialValues}
          validate={validate}
          onSubmit={postSignature}>
          <Field name="first_name" placeholder="First name" />
          <Field name="last_name" placeholder="Last name" />
          <Field name="email" type="email" placeholder="Email" />
          <Field
            name="message"
            placeholder="Share some words of encouragement (optional)"
            rows={4}
            as="textarea"
          />

          <button type="submit" className="btn-cta">
            {isPending(loading) && <Spinner />}
            <span>Sign Statement</span>
          </button>

          <Field name="anonymous" type="checkbox">
            Do not display my name and comment
          </Field>
          {isFailed(loading) && !!message && (
            <p className={styles.error}>{message}</p>
          )}
        </FormProvider>
      )}
    </div>
  );
};

export default SignatureForm;
