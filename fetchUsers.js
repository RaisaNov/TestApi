 
  export function add(a,b) {
    return a + b;
} 

    export async function fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const users = await response.json();
    
        users.forEach(user => {
          console.log(user.name);
        });
    
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
      }
    }
    
 
 