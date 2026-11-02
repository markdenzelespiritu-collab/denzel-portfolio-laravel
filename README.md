# Mark Denzel D. Espiritu — Portfolio (Laravel + Inertia + React)

Your original portfolio converted to Laravel 12, Inertia.js, and React.
Keeps the flower wallpaper, theme toggle, project filters, memory match, and contact form.

The **Projects** section is stored in the database with full CRUD and server-side validation.

## Setup (PowerShell)

Do **not** copy vendor, node_modules, or storage\logs from another project.

```powershell
cd Denzel-Laravel
Set-ExecutionPolicy -Scope Process Bypass
.\setup.ps1
php artisan serve
```

Open http://127.0.0.1:8000

- Public site: `/`
- Manage projects: `/projects` (also in the footer)
