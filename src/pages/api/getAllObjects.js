import { connectToDatabase } from './connectToDatabase';

export default async function getAllObjects(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('buildingProject');

    const correo = req.body.correo; // Asegúrate de que el correo se envía en la solicitud

    try {
        // Busca todos los documentos que tienen ese correo
        const documents = await collection.find({ correo: correo }).toArray();

        if (documents.length > 0) {
            // Crea un array para almacenar todos los objetos
            let allObjects = [];

            // Itera sobre cada documento
            for (let document of documents) {
                if (document.ObjetosMatematicos) {
                    // Agrega el objeto ObjetosMatematicos al array allObjects
                    allObjects.push(document.ObjetosMatematicos);
                }
            }

            // Responde al cliente con todos los objetos
            return res.status(200).json({ objetos: allObjects });
        } else {
            // Si no hay documentos, responde con un mensaje de error
            return res.status(404).json({ error: 'No se encontraron documentos' });
        }
    } catch (error) {
        console.error('Error obteniendo los documentos:', error);
        // En lugar de lanzar el error, lo enviamos en la respuesta
        return res.status(500).json({ error: 'Error obteniendo los documentos: ' + error.message });
    }
}

