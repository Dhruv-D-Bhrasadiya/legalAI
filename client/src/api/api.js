const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const analyzeLegal = async (idea) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/analyze-legal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ business_idea: idea }),
    });

    // Check if response is ok
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    // Validate response has required fields
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format from API');
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    // Re-throw so caller can handle it
    throw error;
  }
};