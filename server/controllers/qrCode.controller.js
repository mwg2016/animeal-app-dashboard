const knex = require('../config/db'); 

const getQrcode = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Doctor ID is required" });
    }

    const qrCodeData = await knex("doctors_qr_codes")
      .select("qr_code")
      .where({ doctor_id: id })
      .first(); 

    if (!qrCodeData || !qrCodeData.qr_code) {
      return res.status(404).json({ error: "QR code not found" });
    }

    console.log("Vet QR Code: ", qrCodeData.qr_code);

    return res.status(200).json({
      message: "QR code sent",
      vetQrcode: qrCodeData.qr_code,
    });

  } catch (err) {
    console.error("Error fetching QR code:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {getQrcode};