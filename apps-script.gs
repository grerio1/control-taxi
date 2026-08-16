/**
 * CONTROL TAXI - Backend de sincronizacion con Google Sheets
 * -------------------------------------------------------------
 * Como instalar (una sola vez):
 * 1. Abre o crea la Hoja de Google que quieres usar como respaldo.
 * 2. Menu: Extensiones > Apps Script.
 * 3. Borra el codigo de ejemplo que aparece y pega TODO este archivo.
 * 4. Arriba, dale a "Guardar" (icono de disquete).
 * 5. Dale a "Implementar" > "Nueva implementacion".
 * 6. En "Tipo", elige "Aplicacion web".
 * 7. "Ejecutar como": Yo (tu correo).
 * 8. "Quien tiene acceso": Cualquier usuario.
 * 9. Dale a "Implementar". Google pedira autorizar permisos: aceptalos
 *    (es tu propio script, sobre tu propia hoja).
 * 10. Copia la URL que termina en /exec — esa es la que pegas en
 *     Ajustes > "Enlace de sincronizacion" dentro de la app del taxi.
 *
 * Cada vez que cambies este codigo, debes hacer "Implementar" >
 * "Gestionar implementaciones" > icono de lapiz > "Nueva version".
 */

const SHEET_NAME = "RegistrosApp";

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, 2).setValues([["Fecha", "JSON"]]);
  }
  return sheet;
}

function doGet(e) {
  const sheet = getSheet_();
  const data = sheet.getDataRange().getValues();
  const days = {};
  let config = null;
  for (let i = 1; i < data.length; i++) {
    const key = data[i][0];
    const json = data[i][1];
    if (!key || !json) continue;
    try {
      if (key === "__CONFIG__") {
        config = JSON.parse(json);
      } else {
        days[key] = JSON.parse(json);
      }
    } catch (err) {
      // fila corrupta, se ignora
    }
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true, days: days, config: config }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    const data = sheet.getDataRange().getValues();
    const rowIndexByKey = {};
    for (let i = 1; i < data.length; i++) {
      rowIndexByKey[data[i][0]] = i + 1; // fila real en la hoja (1-indexed)
    }

    function upsert(key, value) {
      const json = JSON.stringify(value);
      if (rowIndexByKey[key]) {
        sheet.getRange(rowIndexByKey[key], 2).setValue(json);
      } else {
        sheet.appendRow([key, json]);
        rowIndexByKey[key] = sheet.getLastRow();
      }
    }

    if (body.type === "upload") {
      if (body.days) {
        Object.keys(body.days).forEach(function (dateKey) {
          upsert(dateKey, body.days[dateKey]);
        });
      }
      if (body.config) {
        upsert("__CONFIG__", body.config);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
