import { fail, json } from "@sveltejs/kit";

export const actions = {
    login: async ({request, cookies}) => {
        try {
            // ambil data form 
            const formData = await request.formData();
            const email = formData.get('email');
            const password = formData.get('password');

            // kirim data ke API
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    email, 
                    password
                })
            });
            const result = await response.json();
            if (!response.ok) {
                // jika response tidak ok maka kembalikan error
                return fail(response.status, {
                    success: false, 
                    message: result.message || 'Terjadi kesalahan saat menyimpan data', 
                    errors: result.errors || [], 
                    values: {email, password} //mengembalikan nilai input untuk kembali mengisi nilai form
                })
            }

            // set cookie token and user
            cookies.set('token', result.data.token, {
                httpOnly: true, 
                path: '/', 
                maxAge: 60 * 60 //1 jam
            });
            cookies.set('user', JSON.stringify(result.data.user), {
                httpOnly: true, 
                path: '/', 
                maxAge: 60 * 60 //1 jam
            });
        } catch (error) {
            console.log('Error:', error);
            return fail(500, {
                success: false, 
                message: 'Internal server error',
            });
        }
    }
};