// import React from "react"
// import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"
// import { FiShoppingCart } from "react-icons/fi"

// interface RatingProps {
//   rating: number
//   numReviews: number
// }
// const data = {
//   isNew: true,
//   imageURL:
//     "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
//   name: "Wayfarer Classic",
//   price: 4.5,
//   rating: 4.2,
//   numReviews: 34,
// }

// function Rating({ rating, numReviews }: RatingProps) {
//   const stars = Array(5)
//     .fill("")
//     .map((_, i) => {
//       const roundedRating = Math.round(rating * 2) / 2
//       const starColor = i < roundedRating ? "text-teal-500" : "text-gray-300"
//       const starClass = i === Math.floor(roundedRating) && roundedRating % 1 === 0 ? "ml-1" : ""

//       return <BsStarFill key={i} className={`${starColor} ${starClass}`} />
//     })

//   return (
//     <div className="flex items-center">
//       {stars}
//       <span className="ml-2 text-sm text-gray-600">
//         {numReviews} review{numReviews !== 1 ? "s" : ""}
//       </span>
//     </div>
//   )
// }

// function ProductAddToCart() {
//   return (
//     <div className="flex items-center justify-center w-full p-10">
//       <div className="relative max-w-sm bg-white border rounded-lg shadow-lg">
//         <img src={data?.imageURL} alt={`Picture of ${data.name}`} className="rounded-t-lg" />

//         <div className="p-6">
//           <div className="flex items-center justify-between mt-1">
//             <h6 className="text-2xl font-semibold truncate">{data.name}</h6>
//             <div className="relative">
//               <a href="#" className="flex" title="Add to cart">
//                 <FiShoppingCart className="self-center h-7 w-7" />
//               </a>
//               {/* <div className="absolute top-0 -right-3">
//                                 <div className="p-2 text-xl text-gray-800 bg-white rounded shadow-lg">
//                                     Add to cart
//                                 </div>
//                             </div> */}
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <Rating rating={data.rating} numReviews={data.numReviews} />
//             <div className="text-2xl text-gray-800">
//               <span className="text-lg text-gray-600">£</span>
//               {data.price.toFixed(2)}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductAddToCart
