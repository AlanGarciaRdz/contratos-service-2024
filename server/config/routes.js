let fs = require("fs");
let path = require("path")

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.get("/healthZ", function (req, res) {
    res.status(200).json({
      status: "OK",
      message:
        "API servicios de transporte Recorriendo kilometros último update 26 feb 2024",
    });
  });

  app.get("/clave", function (req, res) {
    const currentDate = new Date();

    // Get the current timestamp (milliseconds since Unix epoch)
    const currentTime = currentDate.getTime();

    // Convert the timestamp to a hexadecimal string
    const hexadecimal = currentTime.toString(16).toUpperCase().slice(-6);

    const year = currentDate.getFullYear() % 100; // Get only the last two digits of the year
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const clave = `${year}${hexadecimal}${month}`
    res.send(clave);
  });

  function ensureDirectoryExists(directory) {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  app.get("/fix", function (req, res) {
    const fs = require("fs");
    const path = require("path");

    const contratosFolder = "./contratos/";
    const contratosFolderD = "./contratos/";

    function parseDateFromString(dateString) {
      const parts = dateString.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JavaScript
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }


    let count= 0

    fs.readdir(contratosFolder, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      files.forEach((file) => {

        const filePath = path.join(contratosFolder, file);
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            console.error("Error reading file:", err);
            res.send("Error reading file:");
            return;
          }

          try {
            const contratoData = JSON.parse(data);
            const fechaContrato = contratoData.fecha_contrato;

            // Extract year and month from fecha_contrato
            let fechaContratoDate = new Date(fechaContrato);

            if (isNaN(fechaContratoDate.getTime())) {
              // Date is not valid, parse it from string
              fechaContratoDate = parseDateFromString(fechaContrato);
            }


            const year = String(fechaContratoDate.getFullYear() % 100); // Extract last two digits of year
            const month = String(fechaContratoDate.getMonth() + 1).padStart(2,"0"); // Months are 0-indexed


           // Construct new filename
           const newFilename = `${year}${file.replace(/\.[^/.]+$/, "")}${month}`;
           const yearFolder = path.join(contratosFolderD, year);
           const monthFolder = path.join(yearFolder, month);
           const newFilePath = path.join(monthFolder, newFilename);

           // Ensure year folder exists
           ensureDirectoryExists(yearFolder);
           // Ensure month folder exists
           ensureDirectoryExists(monthFolder);


            // Rename the file
            fs.rename(filePath, newFilePath, (err) => {
              if (err) {
                console.error("Error renaming file:", err);
                return;
              }
              console.log(`File "${file}" renamed to "${newFilename}"`);
              count = count+ 1
            });
          } catch (parseError) {
            //console.error("Error parsing JSON in file:", file);
            res.error("Error parsing JSON in file:", file)
            return;
          }
        });
      });
    });
        res.send(`complete ${count} files `);
  })

  app.post("/guardar", function (req, res) {
    const contratoFolder = "./contratos/";

    const yearFolder = req.body.nombre_contrato.substring(0, 2);
    const monthFolder = req.body.nombre_contrato.substring(req.body.nombre_contrato.length - 2);

    // Ensure year folder exists
    ensureDirectoryExists(yearFolder);
    // Ensure month folder exists
    ensureDirectoryExists(monthFolder);

    const contratoFileName = path.join(contratoFolder, yearFolder, monthFolder, req.body.nombre_contrato);


    let writer = fs.createWriteStream(contratoFileName);

    response = {
      fecha_contrato: req.body.fecha_contrato,
      nombre_contratante: req.body.nombre_contratante,
      telefono_contratante: req.body.telefono_contratante,
      direccion_contratante: req.body.direccion_contratante,
      cliente_itinerario: req.body.cliente_itinerario,
      telefono_itinerario: req.body.telefono_itinerario,
      destino_itinerario: req.body.destino_itinerario,
      ubicacion_destino_itinerario: req.body.ubicacion_destino_itinerario,
      fechasalida_itinerario: req.body.fechasalida_itinerario,
      presentarse_itinerario: req.body.presentarse_itinerario,
      horasalida_itinerario: req.body.horasalida_itinerario,
      direccionsalida_itinerario: req.body.direccionsalida_itinerario,
      ubicacion_direccion_salida_itinerario:
      req.body.ubicacion_direccion_salida_itinerario,
      entrecalles_itinerario: req.body.entrecalles_itinerario,
      referencias_itinerario: req.body.referencias_itinerario,
      detalles_itinerario: req.body.detalles_itinerario,
      fecharegreso_itinerario: req.body.fecharegreso_itinerario,
      horaregreso_itinerario: req.body.horaregreso_itinerario,
      unidad_unidad: req.body.unidad_unidad,
      capacidad_unidad: req.body.capacidad_unidad,
      ACC_unidad: req.body.ACC_unidad,
      estereo_unidad: req.body.estereo_unidad,
      sanitarios_unidad: req.body.sanitarios_unidad,
      tvdvd_unidad: req.body.tvdvd_unidad,
      microfono_unidad: req.body.microfono_unidad,
      seguro_unidad: req.body.seguro_unidad,
      otros_unidad: req.body.otros_unidad,
      total_pagos: req.body.total_pagos,
      anticipo_pagos: req.body.anticipo_pagos,
      pendiente_pagos: req.body.pendiente_pagos,
    };
    console.log(response)
    writer.write(JSON.stringify(response));

    return res.send(response);
  });

  app.get("/", function (req, res) {
    const contratosFolder = "./contratos";

    // Leer los años dentro del directorio "contratos"
    const years = fs.readdirSync(contratosFolder);

    // Crear una estructura JSON para almacenar los contratos ordenados por año y mes
    const contractsByYear = {};

    years.forEach(year => {
        const yearFolder = path.join(contratosFolder, year);
        const yearStats = fs.statSync(yearFolder);

        // Verificar si el elemento es un directorio
        if (yearStats.isDirectory()) {
            const months = fs.readdirSync(yearFolder);

            // Crear una estructura JSON para almacenar los contratos de cada año ordenados por mes
            const contractsByMonth = {};

            months.forEach(month => {
                const monthFolder = path.join(yearFolder, month);
                const monthStats = fs.statSync(monthFolder);

                // Verificar si el elemento es un directorio
                if (monthStats.isDirectory()) {
                    const contracts = fs.readdirSync(monthFolder);

                    // Almacenar los contratos de cada mes
                    contractsByMonth[month] = contracts;
                }
            });

            // Almacenar los contratos por año
            contractsByYear[year] = contractsByMonth;
        }
    });

    // Enviar la estructura JSON como respuesta
    res.json(contractsByYear);
});

  app.get("/:nombre_contrato", function (req, res) {
    const contratoFolder = "./contratos/";

    const year = req.params.nombre_contrato.substring(0, 2);
    const month = req.params.nombre_contrato.substring(req.params.nombre_contrato.length - 2);
    const contratoFileName = path.join(contratoFolder, year, month, req.params.nombre_contrato);


    fs.readFile(contratoFileName, "utf8", (err, data) => {
      if (err) {
        res
          .status(404)
          .send(`No se encontro  ${contratoFileName}`);
        return;
      }

      const jsonData = JSON.parse(data);
      // Add nombre_contrato to the existing JSON object
      jsonData.nombre_contrato = req.params.nombre_contrato;

      res.send(jsonData);
    });
  });
};
