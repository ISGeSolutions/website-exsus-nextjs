import { sendMail } from "../../services/mailService";
const handler = async (req, res) => {
    try {
        const { method } = req;
        const { data, emailpage } = req.body;
        const { email_id } = req.body.data;
        console.log(res);
        switch (method) {
            case "POST": {
                //Do some thing
                await sendMail(
                    "Exsus Website: Email Integration Testing",
                    email_id,
                    "Test Email",
                    data,
                    emailpage
                );
                res.status(200).send({
                    "message": "Success"
                });
                break;
            }
            case "GET": {
                //Do some thing
                res.status(200).send(req.auth_data);
                break;
            }
            default:
                res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
                res.status(405).end(`Method ${method} Not Allowed`);
                break;
        }
    } catch (err) {

        res.status(400).json({
            error_code: "api_one",
            message: err.message,
        });
    }
};

export default handler;