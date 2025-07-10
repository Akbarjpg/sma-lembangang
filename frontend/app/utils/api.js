// Frontend API utilities for testing connection
export const testAPI = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const endpoint = apiUrl ? `${apiUrl}/api/test` : '/api/test';
    
    console.log('Testing API connection to:', endpoint);
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Test Response:', data);
    return data;
  } catch (error) {
    console.error('API Test Error:', error);
    throw error;
  }
};

export const testHealthCheck = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const endpoint = apiUrl ? `${apiUrl}/health` : '/health';
    
    console.log('Testing health check to:', endpoint);
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Health Check Response:', data);
    return data;
  } catch (error) {
    console.error('Health Check Error:', error);
    throw error;
  }
};
