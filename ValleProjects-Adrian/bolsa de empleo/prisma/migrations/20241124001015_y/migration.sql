-- CreateTable
CREATE TABLE `UsuarioInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `primerNombre` VARCHAR(100) NOT NULL,
    `segundoNombre` VARCHAR(100) NULL,
    `primerApellido` VARCHAR(100) NOT NULL,
    `segundoApellido` VARCHAR(100) NULL,
    `tipoDocumento` VARCHAR(50) NOT NULL,
    `numeroDocumento` VARCHAR(50) NOT NULL,
    `correoElectronico` VARCHAR(255) NOT NULL,
    `contrasena` VARCHAR(255) NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `idx_numero_documento`(`numeroDocumento`),
    INDEX `idx_correo_electronico`(`correoElectronico`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
