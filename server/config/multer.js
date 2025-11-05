import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // folder to store images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  },
});




const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", 'image/png']
    if(allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb( new Error ("Only image files are allowed"))
    }
}

const upload = multer({storage, fileFilter})

export default upload