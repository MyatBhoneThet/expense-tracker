import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click(); 
    }
  };

  return (
    <div className="flex justify-center mb-6 relative">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-17 h-17 flex items-center justify-center bg-gray-300 rounded-full relative">
          <LuUser className="text-5xl text-black" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full shadow-md absolute -bottom-1 -right-1 hover:bg-pink-100"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-primary shadow-md"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full shadow-md absolute -bottom-1 right-0 hover:bg-red-300"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
