import { useEffect } from 'react';

const TermsOfService = () => {
  useEffect(() => {
    // Create and append the script
    const script = document.createElement('script');
    script.src = "https://app.termly.io/embed-policy.min.js";
    script.id = "termly-jssdk";
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById("termly-jssdk");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="mt-16 pb-8">
      <div name="termly-embed" data-id="907be23b-b479-4753-ae42-4de350559e1c"></div>
    </div>
  );
};

export default TermsOfService;