import { useState, useEffect } from 'react';

const useConfirmSignature = () => {
  const [isConfirmed, setConfirmed] = useState();
  const saveConfirmation = () => {
    localStorage.setItem('uf-cfmd', true);
    setConfirmed(true);
  };

  useEffect(() => {
    const cfmd = localStorage.getItem('uf-cfmd') || false;
    setConfirmed(cfmd);
  }, []);

  return [isConfirmed, saveConfirmation];
};

export default useConfirmSignature;
