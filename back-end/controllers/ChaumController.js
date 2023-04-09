const ChaumModel = require("../models/ChaumModel");

// Register a user
function signing(req, res) {
  const { message } = req.body;
  try {
    const signature = ChaumModel.signing(message);
    res.json({ message: "sign complete", signature: signature.toString() });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
}


// Verify the response from the client
function verifying(req, res) {
  const { message, signature } = req.body;

  try {
    if(ChaumModel.verifying(message, signature)){
      res.json({ message: "verification success, the signature match the message"});
      console.log("sucess")
      
    }else{
      console.log("fail")
      res.json({ message: "verification failed, the signature does not match the message"});
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  signing,
  verifying
};
