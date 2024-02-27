var fs = require("fs");

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
      clave_reservacion: req.body.clave_reservacion,
      fecha_contrato: req.body.fecha_contrato,
      nombre_contratante: req.body.nombre_contratante,
      telefono_contratante: req.body.telefono_contratante,
      direccion_contratante: req.body.direccion_contratante,
      cliente_itinerario: req.body.cliente_itinerario,
      telefono_itinerario: req.body.telefono_itinerario,
      destino_itinerario: req.body.destino_itinerario,
      ubicacion_destino_itinerario: req.body.ubicacion_destino_itinerario,
      fechasalida_itineario: req.body.fechasalida_itineario,
      presentarse_itineario: req.body.presentarse_itineario,
      horasalida_itineario: req.body.horasalida_itineario,
      direccionsalida_itinerario: req.body.direccionsalida_itinerario,
      ubicacion_direccion_salida_itinerario:
        req.body.ubicacion_direccion_salida_itinerario,
      colonia_itineario: req.body.colonia_itineario,
      ciudad_itineario: req.body.ciudad_itineario,
      entrecalles_itinerario: req.body.entrecalles_itinerario,
      referencias_itinerario: req.body.referencias_itinerario,
      detalles_itineario: req.body.detalles_itineario,
      fecharegreso_itinerario: req.body.fecharegreso_itinerario,
      horaregreso_itineario: req.body.horaregreso_itineario,
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
    writer.write(JSON.stringify(response));

    return res.send(response);
  });

  app.get("/", function (req, res) {
    var files = fs.readdirSync("./contratos");
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
      res.send(data.toString());
    });
  });
};
