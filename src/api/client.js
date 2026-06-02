/**
 * Mock API Client Placeholder for Neurish.
 * Preconfigured for future integration with Laravel backend APIs.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.neurish.pk/v1';

class ApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  // Generic request handler
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    // In local development, we return a mock promise that mimics actual server responses
    console.log(`[API Client] Calling: ${options.method || 'GET'} ${url}`);
    
    // Future implementation:
    // const response = await fetch(url, { ...options, headers });
    // if (!response.ok) throw new Error('API request failed');
    // return response.json();
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { status: 'success', message: 'API ready for Laravel integration.' } });
      }, 500);
    });
  }

  async get(endpoint, headers = {}) {
    return this.request(endpoint, { method: 'GET', headers });
  }

  async post(endpoint, body, headers = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });
  }

  async put(endpoint, body, headers = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    });
  }

  async delete(endpoint, headers = {}) {
    return this.request(endpoint, { method: 'DELETE', headers });
  }
}

const apiClient = new ApiClient();
export default apiClient;
