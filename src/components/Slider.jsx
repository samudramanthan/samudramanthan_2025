// import React from "react";
// import ReactImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";

// export default function Slider() {
//   const images = [
//     {
//       original: "https://picsum.photos/id/1018/1000/600/",
//       thumbnail: "https://picsum.photos/id/1018/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1015/1000/600/",
//       thumbnail: "https://picsum.photos/id/1015/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1019/1000/600/",
//       thumbnail: "https://picsum.photos/id/1019/250/150/",
//     },
//   ];

//   return (
//     <>
//       <div className="container-xxl py-5" id="review">
//         <div className="container py-5 px-lg-5">
//           <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
//             <h5 className="text-primary-gradient fw-medium">Samudramanthan'23</h5>
//             <h1 className="mb-5">Glimpse</h1>
//           </div>
//           <ReactImageGallery
//             items={images}
//             autoPlay={true}
//             showPlayButton={false}
//             slideDuration={700}
//             showNav={false}
//           />
//         </div>
//       </div>
//     </>
//   );
// }


import React from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import galleryData from "../data/GalleryData";

export default function Slider() {

  return (
    <>
      <div className="container-xxl py-5" id="review">
        <div className="container py-5 px-lg-5">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="text-primary-gradient fw-medium">Samudramanthan'24</h5>
            <h1 className="mb-5">Glimpses</h1>
          </div>
          <ReactImageGallery
            items={galleryData}
            autoPlay={true}
            showPlayButton={true}
            slideDuration={700}
            showNav={false}
          />
        </div>
      </div>
    </>
  );
}
