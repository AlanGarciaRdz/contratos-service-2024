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
    // Generate a random integer between 0 and 4294967295 (2^32 - 1)
    const randomDecimal = Math.floor(Math.random() * 4294967296);

    // Convert the decimal to hexadecimal with a fixed length of 10 characters
    const randomHex = randomDecimal
      .toString(16)
      .toUpperCase()
      .padStart(10, "0");

    res.send(randomHex);
  });

  app.post("/guardar", function (req, res) {
    const contratoFileName = path.join(
      "./contratos",
      `${req.body.nombre_contrato}`
    );
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
    let files = fs.readdirSync("./contratos");
    res.json(files);
  });

  app.get("/:nombre_contrato", function (req, res) {
    const contratoFileName = "./contratos/" + req.params.nombre_contrato;
    fs.readFile(contratoFileName, "utf8", (err, data) => {
      if (err) {
        res
          .status(404)
          .send(`No se encontro contrato ${req.params.nombre_contrato}`);
        return;
      }

      const jsonData = JSON.parse(data);
      // Add nombre_contrato to the existing JSON object
      jsonData.nombre_contrato = req.params.nombre_contrato;

      res.send(jsonData);
    });
  });
};
