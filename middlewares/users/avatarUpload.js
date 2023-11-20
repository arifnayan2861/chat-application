const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpeg, .jpg or .png format allowed!"
  );
};

module.exports = avatarUpload;
