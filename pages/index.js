import { useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import SignatureForm from 'components/SignatureForm';
import Reasons from 'components/reasons';
import useSignatureCount from 'hooks/signature-count';
import { isFulfilled } from 'utils/operations';
import connectDb from 'utils/db/connect';
import Signature from 'utils/db/models/Signature';
import styles from 'styles/Home.module.css';

const buildMeta = () => {
  const metaTitle = '#UPFEMCO';
  const metaDescription =
    'The feminist coalition is a group of young Nigerian feminists formed in July 2020 with a mission to champion equality for women in Nigerian society with a core focus on education, financial freedom and representation in public office.';
  const metaImage = '/banner.jpg';

  return [
    { itemProp: 'name', content: metaTitle },
    { itemProp: 'description', content: metaDescription },
    { name: 'description', content: metaDescription },
    { property: 'og:title', content: metaTitle },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: process.env.NEXT_PUBLIC_ADDRESS },
    { property: 'og:locale', content: 'en_GB' },
    { property: 'og:image', content: metaImage },
    { property: 'og:description', content: metaDescription },
    { property: 'og:site_name', content: metaTitle },
    { name: 'robots', content: 'index, follow' }
  ];
};

const Home = ({ signatures, total }) => {
  const nodeRef = useRef(null);
  const [{ loading, text }] = useSignatureCount();
  const handleClick = () => {
    if (nodeRef.current) {
      nodeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.root}>
      <Head>
        <title>#UpFemCo</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="charset" content="utf-8" />
        <meta name="viewport" content="width=device-width,  initial-scale=1" />
        <meta name="theme-color" content="#F6DB6E" />
        {buildMeta().map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <meta key={i} {...item} />
        ))}
      </Head>

      <header>
        <div className={styles.brand}>
          <Link href="/">
            <a>#UpFemCo</a>
          </Link>
        </div>
        <div className={`${styles.container} ${styles.support}`}>
          <h1>Show your support for the Feminist Coalition!</h1>
          {isFulfilled(loading) && !!text && <p>{text}</p>}
          <p className={styles.cta}>
            <button type="button" className="btn-cta" onClick={handleClick}>
              Read the statement
            </button>
          </p>
        </div>
      </header>
      <main>
        <div className={styles.container} ref={nodeRef}>
          <div className={styles.statement}>
            <h2>Statement of Support</h2>
            <p>
              The feminist coalition is a group of young Nigerian feminists
              formed in July 2020 with a mission to champion equality for women
              in Nigerian society with a core focus on education, financial
              freedom and representation in public office. <br />
              <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className={styles.form}>
            <SignatureForm />
          </div>
          <Reasons
            className={styles.reasons}
            signatures={signatures}
            total={total}
          />
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  let signatures = [];
  let total = 0;
  let error = null;

  try {
    await connectDb();
    const promises = [Signature.loadMore(), Signature.getTotal(true)];
    const [res, total_] = await Promise.all(promises);

    if (res) {
      signatures = res.map((item) => item.toJSON()) || [];
    }
    total = total_;
  } catch (e) {
    error = e;
  }

  const props = {
    signatures,
    total,
    error
  };

  return {
    props,
    revalidate: 1
  };
};

export default Home;
