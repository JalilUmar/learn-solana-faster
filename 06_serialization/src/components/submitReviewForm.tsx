"use client";

export default function SubmitReviewForm() {
  return (
    <form
      onSubmit={() => console.log("Hello")}
      className="grid justify-center items-center mt-[120px] gap-y-2 font-sans w-[600px] py-[20px] border rounded "
    >
      {/* user will add movie title, review and a rating ranging from 1 to 10 which would be a counter where user can increase or decrease value. The form would be very good lookign maintaing the theme of the application. Also it would look attractive , styled with tailwind css*/}

      <h1 className="text-white text-center text-3xl font-sans font-bold">
        Submit Review
      </h1>
      <span>
        <p className="text-white">Movie Title</p>
        <input
          type="text"
          placeholder="Enter movie title"
          className="w-[500px] text-lg py-1 px-2 rounded"
        />
      </span>
      <span>
        <p className="text-white">Add your review</p>
        <textarea
          placeholder="Review"
          rows={6}
          className="w-[500px] text-lg py-1 px-2 rounded"
        />
      </span>

      <span>
        <p className="text-white">Rating</p>
        <input
          type="number"
          placeholder="Rating"
          min={0}
          max={10}
          className="w-[500px] text-lg py-1 px-2 rounded"
        />
      </span>
      <button
        className="bg-blue-700 p-4 rounded-lg text-white hover:bg-blue-900 transition-all active:scale-95"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
