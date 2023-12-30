// pages/result.js
import { useRouter } from 'next/router';

const ResultPage = () => {
  const router = useRouter();
  const { domain, registered, registrationDate } = router.query;

  return (
    <div>
      <h1>Domain Checker Result</h1>
      <p>{domain} is {registered === 'true' ? '' : 'not '}registered.</p>
      {registered === 'true' && <p>Registration Date: {registrationDate}</p>}
    </div>
  );
};

export default ResultPage;
