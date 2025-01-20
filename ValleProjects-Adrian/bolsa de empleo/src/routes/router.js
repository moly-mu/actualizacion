import rolesRoutes from "./roles";
import loginRoutes from "./login"; // Importar las rutas de login
import registerRoutes from "./register"; // Importar las rutas de register

export default function (app) {
    // auth and roles
    app.use("/api/role", rolesRoutes); // Rutas de roles
    app.use("/api/login", loginRoutes); // Rutas de login
    app.use("/api/register", registerRoutes); // Rutas de registro
}
