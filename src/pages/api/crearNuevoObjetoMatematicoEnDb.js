import { connectToDatabase } from './connectToDatabase';

export default async function crearNuevoObjetoMatematicoEnDb(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('buildingProject');

    const correo = req.body.correo;
    const nombreNuevoObjetoMatematico = req.body.nombreNuevoObjetoMatematico;

    try {
        // Busca si el correo ya existe en la base de datos
        const existingDocument = await collection.findOne({ correo: correo });

        if (existingDocument) {
        // Si el nombre del nuevo objeto no está en ObjetosMatematicos, crea un nuevo objeto
        if (!existingDocument.ObjetosMatematicos[nombreNuevoObjetoMatematico]) {
            existingDocument.ObjetosMatematicos[nombreNuevoObjetoMatematico] = {
            objetos: [{ 'titulo': 'ref1',
            'subtitulo': 'materiales_ref1',
            'descripcion': 'descripcion',
            'UM': 'metro',
            'rendimiento': 16,
            'precio unitario': 850,
            'otro1': 20,
            'otro2': 21,
            'otro3': 22,
            'otro4': 23,
            'otro5': 24,
            'otro6': 25,                                         //176400      305,71              577
            'valor unitario': [['otro2', '*', 'otro1'], ['acumulado', '*', 'acumulado'], ['acumulado', '/', ['otro6', '+', ['otro5', '*', 'otro4']]], ['acumulado', '+', 'precio unitario']],
            'valor dinamico': 1}],
            sumaObjeto: 0
            };
        }

        // Define el documento que deseas guardar
        const newDocument = { 
            correo: correo, 
            ObjetosMatematicos: existingDocument.ObjetosMatematicos
        };

        // Actualiza el documento existente
        const result = await collection.updateOne({ correo: correo }, { $set: newDocument });

        // Responde al cliente con el resultado de la operación
        return res.status(200).json(result);
        } else {
        // Si el correo no existe, responde con un mensaje de error
        return res.status(404).json({ error: 'Documento no encontrado' });
        }
    } catch (error) {
        console.error('Error al guardar el documento en la base de datos:', error);
        throw error;
    }
}
