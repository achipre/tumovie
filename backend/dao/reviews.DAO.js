import { ObjectId } from "mongodb";

let reviews

export default class ReviewsDAO{
  static async injectDB(client){
    if (reviews) {
      return
    }
    try {
      reviews = await client.db(process.env.MOVIEREVIEWS_NS).collection('reviews')
      
    } catch (error) {
      console.error(`Unable to stablish connection handle in reviewDAO: ${error}`);
    }
  }

  static async addReview(movieId, user, review, date){
    try {
      const reviewDoc = {
        name: user.name,
        user_id,
        date,
        review,
        movie_id: ObjectId
      }

      return await review.insertOne(reviewDoc)
      
    } catch (error) {
      
    }
  }
}