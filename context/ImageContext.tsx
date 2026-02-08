
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

interface ImageLinks {
  coupleImage: string;
  giftBoxImageUrl: string;
  roseBouquetUrl: string;
  letterImageUrl: string;
  heartStickerUrl: string;
}

const defaultImages: ImageLinks = {
    coupleImage: "https://i.ibb.co/0yVTG5LV/IMG-20260207-132115-598.jpg",
    giftBoxImageUrl: "https://i.ibb.co/0pDdJCxk/pngtree-adorable-cartoon-present-with-sparkling-eyes-and-blush-png-image-18168051.webp",
    roseBouquetUrl: "https://i.ibb.co/ycs7QL1c/IMG-20260207-115738.png",
    letterImageUrl: "https://i.ibb.co/H8JYzdp/20260207-144920.png",
    heartStickerUrl: "https://i.ibb.co/SX5CtWmh/20260207-030932.png",
};


interface ImageContextType {
  images: ImageLinks;
  loading: boolean;
  error: string | null;
}

const ImageContext = createContext<ImageContextType>({
  images: defaultImages,
  loading: true,
  error: null,
});

export const useImages = () => useContext(ImageContext);

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [images, setImages] = useState<ImageLinks>(defaultImages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const imagesRef = ref(db, 'images');
    const unsubscribe = onValue(imagesRef, (snapshot) => {
      if (snapshot.exists()) {
        setImages(snapshot.val());
      } else {
        // You might want to set the default images in the DB if they don't exist
        console.log("No image data in database, using defaults.");
      }
      setLoading(false);
    }, (err) => {
      console.error("Firebase read failed:", err);
      setError("Failed to load image links from the database.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ImageContext.Provider value={{ images, loading, error }}>
      {children}
    </ImageContext.Provider>
  );
};
