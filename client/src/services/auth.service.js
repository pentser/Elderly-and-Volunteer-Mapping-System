import api from './api';

export const login = async (credentials) => {
  try {
    console.log('Sending login request:', credentials);
    
    const response = await api.post('/auth/login', {
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password
    });
    
    console.log('Login response:', response.data);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    } else {
      throw new Error('לא התקבל טוקן מהשרת');
    }
  } catch (error) {
    console.error('Login error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.response?.data?.message || error.message
    });
    throw error.response?.data?.message || 'שגיאה בהתחברות';
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    } else {
      throw new Error('לא התקבל טוקן מהשרת');
    }
  } catch (error) {
    console.error('Registration error:', error);
    throw error.response?.data?.message || 'שגיאה בהרשמה';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('לא נמצא טוקן');
    }
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error.response?.data?.message || 'שגיאה בקבלת פרטי משתמש';
  }
}; 