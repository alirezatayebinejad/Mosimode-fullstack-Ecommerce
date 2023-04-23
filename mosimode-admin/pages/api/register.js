import User from "../../models/user";
import dbConnect from "../../config/dbConnect";

export default async function handler(req, res) {
    console.log("post request-1");
    if (req.method === "POST") {

        console.log("post request0");
        dbConnect();

        console.log("post request1");
        const { name, email, password } = req.body;
        console.log("post request2");
        const user = await User.create({ name, email, password }).catch(err => console.log("err", err));

        console.log("post request3");
        res.status(201).json({ user });
        console.log("post request4");

    }
    else {
        console.log("not a post request");
    }
}