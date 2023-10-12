import { sendMail } from "../../services/mailService";
const handler = async (req, res) => {
    try {
        const { method } = req;
        const { data, emailpage } = req.body;
        const { email_id, first_name, note } = req.body.data;

        switch (method) {
            case "POST": {
                //Do some thing
                await sendMail(
                    data,
                    emailpage
                );
                res.status(200).send("Success");
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