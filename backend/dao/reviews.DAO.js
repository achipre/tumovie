import {ObjectId} from "mongodb";

let reviews
export class ReviewsDAO {

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
        user_id: user._id,
        date,
        review,
        movie_id: new ObjectId(movieId)
      }
      return await reviews.insertOne(reviewDoc)
    } catch (e) {
      console.error(`unable to post review: ${e}`);
      return {error: e}
    }
  }

  static async updateReview(reviewId, userId, review, date){
    console.log(reviewId, userId, review, date);
    try {
      const updateResponse = await reviews.updateOne(
        {user_id: userId, _id: new ObjectId(reviewId) },
        {$set: {review, date}}
      )
      return updateResponse

    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return {error: e}
      
    }
  }

  static async deleteReview(reviewId, userId){
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId
      })
      return deleteResponse
    } catch (e) {
      console.error(`unable to delete review: ${e}`);
      return {error: e}
      
    }
  }
}