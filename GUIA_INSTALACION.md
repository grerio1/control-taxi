# Control Taxi — Guia de instalacion (de cero a app en tu celular)

Este paquete convierte tu app en un sitio web real, instalable en el celular,
que funciona SIN internet (los datos se guardan en el telefono) y que
sincroniza con tu PC solo cuando tu tocas el boton "Subir" o "Bajar".

Archivos que trae este paquete:
- index.html          -> la aplicacion completa
- manifest.json        -> hace que se pueda "instalar" en el celular
- service-worker.js    -> hace que funcione sin internet
- icons/icon-192.png, icon-512.png -> el icono de la app
- apps-script.gs       -> el codigo para tu Google Sheet (sincronizacion)

No necesitas saber programar para seguir estos pasos. Tomate tu tiempo,
son procesos de una sola vez.

---

## PARTE 1 — Publicar la app en internet (gratis, con GitHub Pages)

1. Entra a https://github.com y crea una cuenta gratis (si no tienes).
2. Arriba a la derecha, toca el "+" > "New repository".
3. Ponle de nombre, por ejemplo: `control-taxi`
4. Marca la opcion "Public". Dale a "Create repository".
5. Dentro del repositorio, dale a "uploading an existing file"
   (o el boton "Add file" > "Upload files").
6. Arrastra o selecciona TODOS los archivos de este paquete
   (index.html, manifest.json, service-worker.js, apps-script.gs,
   y la carpeta icons con sus dos imagenes). Manten la carpeta "icons"
   tal cual, no la renombres.
7. Abajo, dale a "Commit changes" (puedes dejar el mensaje por defecto).
8. Ve a la pestaña "Settings" del repositorio > en el menu izquierdo,
   "Pages".
9. En "Branch", elige "main" y la carpeta "/ (root)". Dale a "Save".
10. Espera 1-2 minutos y recarga la pagina. Arriba te va a mostrar un
    enlace como: `https://tuusuario.github.io/control-taxi/`
    Esa es tu app, ya publicada y accesible desde cualquier navegador.

---

## PARTE 2 — Instalarla en tu celular como si fuera una app

1. Abre ese enlace (`https://tuusuario.github.io/control-taxi/`) en
   Chrome, en tu telefono Android.
2. Chrome va a mostrar un aviso o boton "Agregar a pantalla de inicio"
   (o toca el menu de 3 puntos > "Agregar a pantalla de inicio" /
   "Instalar aplicacion").
3. Confirma. Te va a quedar un icono como cualquier otra app, con su
   propia ventana (sin la barra del navegador).
4. Pruebala: cierra los datos moviles/wifi y abre la app — debe seguir
   funcionando porque ya quedo guardada en el telefono la primera vez
   que la abriste con internet.

Con esto ya tienes "una app en tu celular" funcional, gratis, sin tienda
de por medio, y que se actualiza sola cada vez que abras con internet
(porque revisa si hay version nueva en GitHub Pages).

---

## PARTE 3 (opcional) — Convertirla en un archivo .apk de verdad

Si de verdad necesitas el archivo .apk (para instalar sin pasar por
Chrome, compartirlo, o subirlo a una tienda privada):

1. Entra a https://www.pwabuilder.com (gratis, de Microsoft, no
   necesitas instalar nada).
2. Pega tu enlace de GitHub Pages (`https://tuusuario.github.io/control-taxi/`)
   y dale a "Start".
3. PWABuilder analiza tu app y te muestra "Android" como una de las
   opciones de empaquetado. Dale a "Package for stores" > "Android".
4. Te genera un archivo .apk (o .aab) para descargar. Ese archivo lo
   puedes:
   - Instalar directo en tu telefono (activa "Instalar apps de origenes
     desconocidos" en Ajustes de Android cuando lo abras), o
   - Subirlo a Google Play Console como "prueba interna" o "prueba
     cerrada" si quieres una tienda privada solo para ti o tu familia.
     Esto ultimo requiere una cuenta de Google Play Console (pago unico
     de 25 USD, la cobra Google, no yo) — es el unico paso con costo en
     todo este proceso, y solo si quieres pasar por una tienda.

---

## PARTE 4 — Sincronizar con tu PC (tu propia Hoja de Google)

1. Crea o abre una Hoja de Google Sheets nueva, la que quieras usar de
   respaldo (puede ser la misma donde ya llevas la tasa BCV, o una
   nueva, tu decides).
2. Menu de la hoja: "Extensiones" > "Apps Script".
3. Se abre un editor con un archivo `Codigo.gs` vacio. Borra lo que
   tenga y pega TODO el contenido del archivo `apps-script.gs` de este
   paquete.
4. Dale a guardar (icono de disquete arriba).
5. Dale a "Implementar" (arriba a la derecha) > "Nueva implementacion".
6. En el engranaje/tipo, elige "Aplicacion web".
7. "Ejecutar como": tu correo. "Quien tiene acceso": "Cualquier usuario".
8. Dale a "Implementar". Google te va a pedir autorizar permisos sobre
   tu propia hoja — dale "Permitir" (es normal, es tu script).
9. Copia la URL que te da, termina en `/exec`.
10. Abre tu app del taxi en el celular, toca el engranaje (Ajustes),
    y pega esa URL en el campo "Enlace de sincronizacion". Guarda.
11. Ve a la pestaña "Mensual" y toca "Subir" — deberia decir "Subido
    correctamente". Si abres tu Hoja de Google, ya vas a ver una
    pestaña nueva "RegistrosApp" con tus datos.
12. Desde tu PC (o cualquier otro celular) puedes abrir la misma app
    (mismo enlace de GitHub Pages), poner el mismo enlace de
    sincronizacion en Ajustes, y tocar "Bajar" para traer todos los
    datos.

Importante: la sincronizacion es manual a proposito (tal como pediste),
para no gastar datos moviles en la calle. Solo sube o baja cuando tu
lo decidas y tengas señal.

---

## Notas finales

- Todos tus datos (vueltas, gastos, cierres) se guardan primero en el
  telefono (memoria del navegador). Aunque nunca sincronices, no se
  pierden — la app funciona completa sin internet.
- Si cambias de telefono, sincroniza ("Subir") desde el telefono viejo
  antes de dejarlo, e instala la app en el nuevo y usa "Bajar".
- Cualquier ajuste que quieras despues (cambiar textos, agregar algo,
  corregir un calculo) se hace editando `index.html` — puedo ayudarte
  a generar la version corregida cuando la necesites, y solo tienes
  que volver a subir ese archivo a GitHub (Parte 1, paso 6-7) para que
  quede actualizada para todos los que la tengan instalada.
