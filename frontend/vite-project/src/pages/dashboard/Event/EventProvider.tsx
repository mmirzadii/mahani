import { useEffect, useState } from 'react';
import LoadingModal from '../../../components/LoadingModal';

function EventProvider(props: any) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {!loading && props.children}
      <LoadingModal
        open={loading}
        onClose={() => {
          setLoading(false);
        }}
      />
    </>
  );
}

export default EventProvider;
