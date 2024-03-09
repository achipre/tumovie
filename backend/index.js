// import app from "./server.js";
// import dotenv from 'dotenv'
// import mongodb from "mongodb";
// import MoviesDAO from "./dao/moviesDAO.js";


// async function run() {
//   dotenv.config()

//   const client = new mongodb.MongoClient(process.env.TUMOVIE_DB_URI, {useNewUrlParser: true, useUnifiedTopology:true});

//   const port = process.env.PORT || 8000
//   try {
//     await client.connect();
//     await MoviesDAO.injectDB(client)
//     app.listen(port, () => {
//       console.log('Servidor corriendo en el puerto ' + port);
//     })
//   } catch (e) {
//     process.exit(1)
// } 
// }

// run().catch(console.error); 