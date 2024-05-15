const mongoose = require('mongoose');
const { Schema } = mongoose;

// Conexión a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://root:R0mg0drg1995*@docdb-2024-05-13-22-47-50.cfqoauao63dv.us-east-2.docdb.amazonaws.com:27017/FlowApi?tls=true&tlsCAFile=global-bundle.pem&retryWrites=false', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

// Definir el esquema y el modelo
const consumoSchema = new Schema({
  value: Number, // Consumo en litros por minuto
  deviceId: { type: String, default: '00:1A:79:00:00:01' }, // Dirección MAC del dispositivo
  createdAt: Date,
  updatedAt: Date
});

const Consumo = mongoose.model('Flow', consumoSchema);

// Función para generar consumo según la hora del día
const generarConsumo = (hora) => {
  if (hora >= 0 && hora < 6) {
    // Noche: consumo bajo
    return (Math.random() * 5).toFixed(2);
  } else if (hora >= 6 && hora < 12) {
    // Mañana: consumo más alto
    return (Math.random() * (30 - 10) + 10).toFixed(2);
  } else if (hora >= 12 && hora < 18) {
    // Tarde: consumo estable
    return (Math.random() * (25 - 5) + 5).toFixed(2);
  } else {
    // Noche: consumo bajo
    return (Math.random() * 5).toFixed(2);
  }
};

// Función para generar datos
const generarDatos = async () => {
  await connectDB();

  const startDate = new Date('2024-05-01T00:00:00Z');
  const endDate = new Date('2024-05-21T00:00:00Z');
  const deviceId = '00:1A:79:00:00:01';
  const increment = 60 * 60 * 1000; // Incremento de 1 hora en milisegundos

  let currentDate = startDate;

  while (currentDate < endDate) {
    const consumo = parseFloat(generarConsumo(currentDate.getUTCHours()));
    const registro = new Consumo({
      value: consumo,
      deviceId: deviceId,
      createdAt: currentDate,
      updatedAt: currentDate
    });

    await registro.save();

    // Incrementar 1 hora
    currentDate = new Date(currentDate.getTime() + increment);
  }

  console.log('Datos generados con éxito');
  mongoose.connection.close();
};

// Llamar a la función para generar datos
generarDatos();
