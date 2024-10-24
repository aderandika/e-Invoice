export async function load({fetch, cookies}) {

    // ambil token dari cookies
    const token = cookies.get('token');

    // Mengirim permintaan dengan token 
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
        headers: {
            'Authorization': `${token}`, 
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    
    // Assign response data to users
    const users = result.data;

    // return props user
    return {users};

}

// hapus data 
export const actions = {
    delete: async ({request, cookies}) => {
        const formData = await request.formData();
        const id = formData.get('id');

        // ambil token dan pastikan token tersedia dari cookies
        const token = cookies.get('token');

        try {
            // lakukan permintaan untuk menghapus data
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {
                method: 'DELETE', 
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // jika berhasil 
            return {success: true};
        } catch (error) {
            console.error('Error deleting user:', error);
            return {success:false, error: 'Failed to delete user'};
        }
    }
}