const emailRouter = require("express").Router();
const nodemailer = require("nodemailer");

emailRouter.post("/send-contact-email", async (req, res) => {
    try {
        let transporter;
        if (process.env.NODE_ENV !== "production") {
            const testAccount = await nodemailer.createTestAccount();

            transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                }
            });
        } else {
            transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "email@gmail.com",
                    pass: "password",
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
        }

        const mailOption = {
            from: req.body.email,
            to: "lqlong2002@gmail.com",
            subject: "Liên hệ từ website",
            text: `Dear Chau,
        Có ai đó đã gửi mail liên hệ cho bạn
        
        Name: ${req.body.name}
        Phone: ${req.body.phone}
        Email: ${req.body.email}
        Subject: ${req.body.subject}
        Message: ${req.body.message}
        
        Chúc bạn có một ngày tốt lành!
        `
        };

        await transporter.sendMail(mailOption);

        res.json(
            {
                status: "success",
                message: "Cảm ơn bạn đã gửi mail liên hệ cho tôi. Tôi sẽ liên hệ cho bạn sớm nhất có thể."
            }
        );
    } catch (err) {
        res.json(
            {
                status: "error",
                message: "Email của bạn không thể được gửi vào lúc này. Xin vui lòng thử lại hoặc liên hệ với admin của trang."
            }
        );
    }
});

module.exports = emailRouter;
