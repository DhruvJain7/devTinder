const adminAuth = (req, res, next) => {
  console.log("Authentication is working!");
  const token = "xyz";
  const isAuthAuthorized = token === "xyz";

  if (!isAuthAuthorized) {
    res.status(401).send("Unauthorised request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Authentication is working!");
  const token = "xyz";
  const isAuthAuthorized = token === "xyz";

  if (!isAuthAuthorized) {
    res.status(401).send("Unauthorised request");
  } else {
    next();
  }
};
module.exports = { adminAuth, userAuth };
