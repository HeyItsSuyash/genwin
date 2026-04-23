import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

/**
 * Validates a reCAPTCHA token using Google Cloud reCAPTCHA Enterprise.
 * 
 * @param token The token obtained from the client-side grecaptcha.enterprise.execute()
 * @param action The expected action name (e.g., 'LOGIN' or 'SIGNUP')
 * @returns The risk score (0 to 1) or null if validation fails
 */
export async function verifyRecaptcha(token: string, action: string): Promise<number | null> {
  const projectID = process.env.RECAPTCHA_PROJECT_ID || "genwin-6add7";
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LdtrMYsAAAAAGGTaihkE9LTYphc3gbLmsIcPlHE";

  try {
    // Create the reCAPTCHA client.
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(projectID);

    // Build the assessment request.
    const request = {
      assessment: {
        event: {
          token: token,
          siteKey: recaptchaKey,
        },
      },
      parent: projectPath,
    };

    const [response] = await client.createAssessment(request);

    // Check if the token is valid.
    if (!response.tokenProperties?.valid) {
      console.error(`reCAPTCHA failed: ${response.tokenProperties?.invalidReason}`);
      return null;
    }

    // Check if the expected action was executed.
    if (response.tokenProperties.action === action) {
      const score = response.riskAnalysis?.score ?? null;
      console.log(`reCAPTCHA score: ${score}`);
      return score;
    } else {
      console.error("reCAPTCHA action mismatch");
      return null;
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return null;
  }
}
