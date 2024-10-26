import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product

export const addProduct = async (req, res) => {
  try {
    // Destructure body data
    const {
      name,
      price,
      description,
      image,
      category,
      subCategory,
      size,
      bestseller,
    } = req.body;

    // Access images from the uploaded files using multer
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      size: JSON.parse(size),
      image:imagesUrl,
      date:Date.now()
    };

    console.log(productData)

    const product = new productModel(productData);
    await product.save()

    res.json({success:true,message:"Product Added successfully"})

  } catch (error) {
    console.log(error);
    // Correct "mesaage" to "message"
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for list product

export const listProduct = async (req, res) => {};

// function for remove product

export const removeProduct = async (req, res) => {};

// function for single product info

export const singleProduct = async (req, res) => {};
