import { useEffect } from 'react';

const PrivacyPolicy = () => {
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
      <div name="termly-embed" data-id="4c0cd4d3-d25c-4501-aa37-23f1d46d6ec8"></div>
    </div>
  );
};

export default PrivacyPolicy;