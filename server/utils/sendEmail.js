import nodemailer from "nodemailer"

const sendEmail = async ({to, subject, text, html}) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        })

       const mailOptions = {
        from :`Blog App ${process.env.GMAIL_USER}`,
        to,
        subject,
        text
       }

       await transporter.sendMail(mailOptions)
        
    } catch (error) {
        console.error("Error sending email", error)
        throw  error
    }
}

export default sendEmail