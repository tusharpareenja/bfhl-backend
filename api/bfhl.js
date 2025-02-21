const cors = require("cors");

module.exports = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const USER_ID = "Tushar_Pareenja_05052005";
    const EMAIL = "22bcs16825@cuchd.in";
    const ROLL_NUMBER = "22BCS16825";

    if (req.method === "POST") {
        try {
            const { data } = req.body;

            if (!data || !Array.isArray(data)) {
                return res.status(400).json({
                    is_success: false,
                    message: "Invalid input. 'data' must be an array."
                });
            }

            const numbers = data.filter(item => !isNaN(item)).map(String);
            const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

            // Sort and find the highest alphabet (case-insensitive)
            const highestAlphabet = alphabets.length > 0
                ? [alphabets.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()))[0]]
                : [];

            return res.json({
                is_success: true,
                user_id: USER_ID,
                email: EMAIL,
                roll_number: ROLL_NUMBER,
                numbers,
                alphabets,
                highest_alphabet: highestAlphabet
            });

        } catch (error) {
            console.error("Error processing request:", error);
            return res.status(500).json({
                is_success: false,
                message: "Internal server error"
            });
        }
    }

    if (req.method === "GET") {
        return res.json({ operation_code: 1 });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
};
