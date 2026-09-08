export type UtmParams = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
};

export function getUtmParams(): UtmParams {
  const emptyUtms: UtmParams = {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  };

  if (typeof window === "undefined") {
    return emptyUtms;
  }

  let storedUtms: Partial<UtmParams> = {};
  try {
    const saved = sessionStorage.getItem("ads_utm_params");
    if (saved) {
      storedUtms = JSON.parse(saved);
    }
  } catch {
    // Ignore storage access issues
  }

  const searchParams = new URLSearchParams(window.location.search);

  const utm_source = searchParams.get("utm_source") ?? storedUtms.utm_source ?? "";
  const utm_medium = searchParams.get("utm_medium") ?? storedUtms.utm_medium ?? "";
  const utm_campaign = searchParams.get("utm_campaign") ?? storedUtms.utm_campaign ?? "";
  const utm_content = searchParams.get("utm_content") ?? storedUtms.utm_content ?? "";
  const utm_term = searchParams.get("utm_term") ?? storedUtms.utm_term ?? "";

  const currentUtms: UtmParams = {
    utm_source: utm_source.trim(),
    utm_medium: utm_medium.trim(),
    utm_campaign: utm_campaign.trim(),
    utm_content: utm_content.trim(),
    utm_term: utm_term.trim(),
  };

  if (
    currentUtms.utm_source ||
    currentUtms.utm_medium ||
    currentUtms.utm_campaign ||
    currentUtms.utm_content ||
    currentUtms.utm_term
  ) {
    try {
      sessionStorage.setItem("ads_utm_params", JSON.stringify(currentUtms));
    } catch {
      // Ignore storage access issues
    }
  }

  return currentUtms;
}
