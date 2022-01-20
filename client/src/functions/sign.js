export const cleanLocalStorage = () => {
  localStorage.token && localStorage.removeItem('token');
  sessionStorage.token && sessionStorage.removeItem('token');
  localStorage.user && localStorage.removeItem('user');
  sessionStorage.user && sessionStorage.removeItem('user');
};
