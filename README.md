# Wompi Frontend

Este proyecto es una aplicación frontend desarrollada con React y Vite para gestionar pagos con tarjeta de crédito utilizando la API de Wompi. Es parte de un proceso de evaluación técnica que incluye tanto el desarrollo frontend como backend.

## Descripción del Proyecto

La aplicación permite a los usuarios:
1. Ver productos disponibles en el inventario con su descripción, precio y unidades disponibles.
2. Realizar pagos con tarjeta de crédito mediante un modal que solicita la información de la tarjeta y datos de entrega.
3. Validar los datos de la tarjeta (incluyendo detección de logos de MasterCard y VISA).
4. Mostrar un resumen del pago con detalles como el monto del producto, tarifa base y tarifa de entrega.
5. Completar la transacción utilizando la API de Wompi y actualizar el inventario del producto.

## Características

- **Frontend**: SPA desarrollada con React y Vite, enfocada en diseño responsivo para dispositivos móviles.
- **Estado Global**: Gestión de estado con Redux Toolkit.
- **Estilos**: TailwindCSS para diseño rápido y responsivo.
<!-- - **Pruebas**: Cobertura de pruebas superior al 80% con Jest.
- **Despliegue**: Aplicación desplegada en AWS utilizando servicios como S3, CloudFront y RDS. -->

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## Estructura del Proyecto

El proyecto está organizado en varios directorios clave:

```plaintext
src/
  App.jsx
  index.css
  main.jsx
  api/
    wompiApi.js
  assets/
    mastercard.png
    react.svg
    visa.png
  components/
    CreditCardModal.jsx
    DeliveryInfoForm.jsx
    ProductDisplay.jsx
    TransactionResult.jsx
  helpers/
    getEnvVariables.js
  hooks/
    usePaymentStore.js
    useProcuctStore.js
  pages/
    HomePage.jsx
    ProductPage.jsx
  router/
    AppRouter.jsx
    router.js
  store/
    store.js
    products/
```

## Instalación

Para comenzar con el proyecto, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/andresmurillo13/payments-frontend.git
   ```

2. Accede al directorio del proyecto:
   ```bash
   cd payments-frontend
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución de la Aplicación

Para ejecutar la aplicación en modo desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

## Imagenes de la Aplicación

![alt text](image.png)

![alt text](image-1.png)

![alt text](image-2.png)