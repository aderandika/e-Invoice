import { error, fail } from "@sveltejs/kit";

export async function load({fetch, cookies, params}) {
    // Ambil token dari cookie
    const token = cookies.get('token');

    // Mengirim permintaan dengan token jika ada
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${params.id}`, {
        headers: {
            'Authorization': `${token}`, 
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();

    // Assign response data to user
    const user = result.data; 

    return {user};
}

export const actions = {
    update: async ({request, cookies, params}) => {
        try {
            // ambil token dari cookie
            const token = cookies.get('token');

            // get form data
            const formData = await request.formData();
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            // update data with API 
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `${token}`
                }, 
                body: JSON.stringify({
                    name, 
                    email, 
                    password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                // Jika response tidak ok, kembalikan error
                return fail(response.status, {
                    success: false, 
                    message: result.message || 'Terjadi kesalahan saat menyimpan data', 
                    errors: result.errors || [], 
                    values: {name, email}
                });
            }

            // jika berhasil, return success
            return {success: true};

        } catch (error) {
            if (error instanceof Response) {
                // Jika error adalah instance dari Response (seperti redirect), lemparkan kembali
                throw error;
            }
            console.error('Error:', error);
            return fail(500, {
                success: false, 
                message: 'Terjadi kesalahan saat menyimpan data'
            });
        }
    }
};