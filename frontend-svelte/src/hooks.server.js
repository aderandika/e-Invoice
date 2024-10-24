// MIDDLEWARE

import { redirect } from "@sveltejs/kit";

export async function handle({event, resolve}) {

    // mengambil cookie token
    const token = event.cookies.get('token');

    // ambil URL 
    const {pathname} = event.url;

    // url yang tidak membutuhkan login dan register
    const publicPaths = ['/login', '/register'];

    // pengecekan jika URL dimulai dengan admin
    const isAdminPath = pathname.startsWith('/admin');

    // jika sudah login dan mencoba mengakses halaman login, register 
    // maka di redirect ke halaman dashboard
    if (token && publicPaths.includes(pathname)) {
        throw redirect(302, '/admin/dashboard');
    }

    // jika belum login dan mencoba akses halaman admin maka redirect ke login
    if (!token && isAdminPath) {
        throw redirect(302, '/login');
    }

    // lanjutkan ke permintaan berikutnya
    return await resolve(event);
}