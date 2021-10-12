try {
    require ('dotenv'). config();
  } catch (err) {
    console.log('No .env file loaded');
  }
 
  // Database connection URL
  
  exports.databaseUrl = process.env.DATABASE_URL || 'mongodb+srv://admin:9FwTpTBCtvSF0Pap@voiceit.j1qml.mongodb.net/db-voiceit?retryWrites=true&w=majority'
  exports.port = process.env.PORT || '3000';
  exports.bcryptCostFactor = 10;
  
  //JWT signing key
  
  exports.secretKey = process.env.SECRET_KEY || 'changeme';
  
  //Validate that port is a positive integer
  
  if (process.env.PORT) {
    const parsedPort = parseInt(process.env.PORT, 10);
    if (!Number.isInteger(parsedPort)) {
      throw new Error ('Environment variable $PORT must be an integer');
    } else if (parsedPort < 1 || parsedPort > 65535) {
      throw new Error('Environment variable $PORT must be a valid port number');
    }
  }