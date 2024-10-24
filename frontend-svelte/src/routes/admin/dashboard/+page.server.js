export async function load({cookies}) {
    
    // ambil data cookie 'user'
    const userData = cookies.get('user');

    // kembalikan user data sebagai properties
    return {
        user: JSON.parse(userData)
    }
}