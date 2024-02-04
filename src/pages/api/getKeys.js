import { connectToDatabase } from './connectToDatabase';

export default async function getKeys(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('buildingProject');

    const correo = req.body.correo;

    try {
        // Busca si el correo ya existe en la base de datos
        const document = await collection.findOne({ correo: correo });

        if (document && document.ObjetosMatematicos) {
        // Obtiene todas las claves de ObjetosMatematicos
        const keys = Object.keys(document.ObjetosMatematicos);

        // Responde al cliente con las claves
        return res.status(200).json(keys);
        } else {
        // Si el correo no existe, responde con un mensaje de error
        return res.status(404).json({ error: 'Documento no encontrado' });
        }
    } catch (error) {
        console.error('Error obteniendo las claves:', error);
        throw error;
    }
}
