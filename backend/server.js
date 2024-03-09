import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion } from "mongodb";
import movies from "./api/movies.route.js";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviews.DAO.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/movies', movies)
app.use('*', (req,res) => {
  res.status(404).json({ error: "Not Found"})
})

async function run() {
  dotenv.config()

  const client = new MongoClient(process.env.TUMOVIE_DB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  const port = process.env.PORT || 8000
  try {
    await client.connect();
    await MoviesDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log('Servidor corriendo en el puerto ' + port);
    })
  } catch (e) {
    process.exit(1)
} 
}

run().catch(console.error); 