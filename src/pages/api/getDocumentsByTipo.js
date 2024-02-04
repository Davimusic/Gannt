import { connectToDatabase } from './connectToDatabase';

export default async function getDocumentsByTipo(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection('buildingProject');

  const correo = req.body.correo;
  const nombre = req.body.nombre;

  try {
    // Busca el documento que tiene ese correo
    const document = await collection.findOne({ correo: correo });

    if (document && document.ObjetosMatematicos) {
      // Obtiene todas las claves de ObjetosMatematicos
      const keys = Object.keys(document.ObjetosMatematicos);

      // Si el documento tiene el nombre proporcionado en ObjetosMatematicos
      if (document.ObjetosMatematicos[nombre]) {
        const objeto = document.ObjetosMatematicos[nombre];

        // Responde al cliente con el objeto encontrado y las claves
        return res.status(200).json({ objeto: objeto, keys: keys });
      } else {
        // Si el documento no tiene el nombre proporcionado, responde con un mensaje de error
        return res.status(404).json({ error: 'Documento no contiene el nombre proporcionado en ObjetosMatematicos', keys: keys });
      }
    } else {
      // Si el correo no existe, responde con un mensaje de error
      return res.status(404).json({ error: 'Documento no encontrado' });
    }
  } catch (error) {
    console.error('Error obteniendo el documento:', error);
    // En lugar de lanzar el error, lo enviamos en la respuesta
    return res.status(500).json({ error: 'Error obteniendo el documento: ' + error.message });
  }
}





