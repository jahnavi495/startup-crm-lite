import axios from 'axios';

const api = axios.create({
  baseURL: 'https://Startup-startup-crm-lite.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

async function run() {
  try {
    console.log('Logging in to production API...');
    const loginResponse = await api.post('/api/auth/login', {
      email: 'admin@crm.local',
      password: 'AdminPassword123!',
    });
    
    const token = loginResponse.data.token || loginResponse.data.data?.token;
    console.log('Token obtained:', token ? 'YES' : 'NO');

    const leadsResponse = await api.get('/api/leads', {
      params: { limit: 1000 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Leads fetched:', leadsResponse.data.data?.length);
    console.log(JSON.stringify(leadsResponse.data, null, 2));
  } catch (error) {
    console.error('Error during API request:', error.response?.data || error.message);
  }
}

run();

