import { connectToDatabase } from './connectToDatabase';

export default async function createDocument(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection('gannt');

  const correo = req.body.correo;
  const info = req.body.info;
  const nombreProyecto = req.body.nombreProyecto;

  try {
    // Busca si el correo ya existe en la base de datos
    let document = await collection.findOne({ correo: correo });

    if (document) {
      // Actualiza el documento existente
      await collection.updateOne(
        { correo: correo },
        { $set: { [`gannt.${nombreProyecto}`]: info } }
      );

      // Prepara el documento actualizado para devolver al cliente
      document.gannt[nombreProyecto] = info;

      // Responde al cliente con el documento actualizado
      return res.status(200).json(document);
    } else {
      // Si el correo no existe, crea un nuevo documento
      const newDocument = {
        correo: correo,
        gannt: {
          [nombreProyecto]: info,
        },
      };
      const result = await collection.insertOne(newDocument);

      // Responde al cliente con el nuevo documento
      return res.status(200).json(newDocument);
    }
  } catch (error) {
    console.error('Error al guardar el documento en la base de datos:', error);
    return res.status(500).json({ error: 'Error al guardar el documento en la base de datos' });
  }
}












