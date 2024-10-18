import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/tu_nombre_de_base_de_datos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;