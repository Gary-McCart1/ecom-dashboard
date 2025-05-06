"use client";
import Image from "next/image";
import React from "react";

interface ImageType {
  url: string;
  id?: number; // optional if used later
}

interface Props {
  image: ImageType;
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
  index: number;
  setToggleSave: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditImage = ({ image, setImages, index, setToggleSave }: Props) => {
  const handleEditImage = (url: string) => {
    setImages((prevImages) =>
      prevImages.map((img, i) => (i === index ? { ...img, url } : img))
    );
    setToggleSave(true)
  };

  const handleDeleteImage = () => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setToggleSave(true)
  };

  return (
    <div>
      <div className="flex mt-2 items-center justify-between">
        {image.url && (
          <Image
            src={image.url}
            width={40}
            height={40}
            className="rounded-sm object-contain mr-3"
            alt="Image"
          />
        )}
        <input
          type="text"
          placeholder="Enter image URL"
          onChange={(e) => handleEditImage(e.target.value)}
          className="bg-white w-full my-2.5 rounded-lg p-2"
        />
        <button
          type="button"
          onClick={handleDeleteImage}
          className="btn btn-error rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditImage;
