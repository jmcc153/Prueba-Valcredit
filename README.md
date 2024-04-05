# IRIS

## Descripción

Este proyecto es una aplicación React construida con Vite. Incluye características como autenticación de usuarios, gestión de datos y una interfaz de usuario adaptable.

## Instalación

1. Clonar el repositorio: `git clone https://github.com/nombredeusuario/proyecto.git`
2. Instalar las dependencias: `npm install`
3. Iniciar el servidor: `npm run dev`
4. Para iniciar sesión las credenciales de usuario y contraseña son "admin".

## Estructura del proyecto

- `src/`: Contiene el código fuente de la aplicación.
  - `assets/`: Contiene archivos estáticos como imágenes.
  - `components/`: Contiene los componentes de React utilizados en la aplicación.
  - `contexts/`: Contiene los proveedores de contexto de React.
  - `lib/`: Contiene funciones de utilidad y bibliotecas.
  - `pages/`: Contiene los componentes de las páginas.
  - `routes/`: Contiene la configuración de enrutamiento.
  - `styles/`: Contiene los estilos globales y variables.
- `public/`: Contiene los archivos públicos servidos por el servidor.
- `vite.config.js`: Contiene la configuración para Vite.
- `package.json`: Contiene los metadatos del proyecto y dependencias.

## Características

- Autenticación de Usuarios: Los usuarios pueden iniciar y cerrar sesión en la aplicación.
- Gestión de Datos: La aplicación obtiene y muestra los datos de los usuarios, modifica la información de los usuarios, crea nuevos usuarios y elimina usuarios.
- Interfaz de Usuario Adaptable: La aplicación tiene un diseño adaptable que se ajusta a diferentes tamaños de pantalla.

## Componentes

- [`ModalForm`](src/components/modalForm/ModalForm.jsx): Un formulario para la entrada de datos del usuario.
- [`ModalAlert`](src/components/modalAlert/ModalAlert.jsx): Un modal para mostrar alertas al usuario.
- [`Pagination`](src/components/pagination/Pagination.jsx): Un componente para manejar la paginación de la tabla.
- [`Sidebar`](src/components/sidebar/Sidebar.jsx): Una barra lateral sencilla para la navegación.

## Páginas

- [`ListUser`](src/pages/ListUser/ListUser.jsx): Una página que muestra una lista de usuarios con la opción de editar, eliminar o crear nuevos usuarios.
- [`DetailsUser`](src/pages/detailsUser/DetailsUser.jsx): Una página que muestra los detalles de un usuario específico, incluyendo información de administración y parqueadero.

## Contextos

- [`LoginContext`](src/contexts/LoginContext.jsx): Contexto para gestionar el estado de inicio de sesión del usuario.
- [`modalContext`](src/contexts/modalContext.jsx): Contexto para gestionar el estado de los modales.

## Estilos

Los estilos se gestionan utilizando SCSS. cada carpeta y página tiene sus propios estilos, los estilos globales se pueden encontrar en [`src/styles/index.scss`](src/styles/index.scss).

