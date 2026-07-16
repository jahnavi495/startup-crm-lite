import axios from 'axios';

async function testForgotPassword() {
  try {
    console.log('Sending forgot password request to production...');
    const response = await axios.post('https://Startup-startup-crm-lite.up.railway.app/api/auth/forgot-password', {
      email: 'admin@crm.local' // Using the configured email or any registered email
    });
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
  } catch (error) {
    console.error('Error Status:', error.response?.status);
    console.error('Error Data:', error.response?.data || error.message);
  }
}

testForgotPassword();

