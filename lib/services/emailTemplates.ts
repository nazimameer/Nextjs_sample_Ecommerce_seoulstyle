export const generateOneTimePasswordEmailTemplate = (
  otp: number,
  date: string,
  year: number
) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Your One-Time Password</title>

  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>

<body style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    ">
  <div style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://i.ibb.co/Q7F3CgKP/sgb.jpg);
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      ">
    <header>
      <table style="width: 100%;">
        <tbody>
          <tr style="height: 0;">
            <td>
              <img src="https://i.ibb.co/CKLcgk6w/litelogo.png" alt="logo" height="30px">
            </td>
            <td style="text-align: right;">
              <span style="font-size: 16px; line-height: 30px; color: #ffffff;">${date}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </header>

    <main>
      <div style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          ">
        <div style="width: 100%; max-width: 489px; margin: 0 auto;">
          <h1 style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              ">
            Greetings!
          </h1>
          <p style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              ">
            Hey, Let’s Get You Logged In!
          </p>
          <p style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              ">
            Thank you for choosing <span style="font-weight: 600; color: #1f1f1f;">Seoul Style</span>. Use the following
            OTP to complete your login process. Please note that the OTP is valid for
            <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
            For your security, do not share this code with anyone.
          </p>
          <p style="
                margin: 0;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 15px;
                color: #000000;
              ">
            ${otp}
          </p>
        </div>
      </div>

      <p style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          ">
        Need help? Ask at
        <a href="mailto:seoulstyleindia@gmail.com"
          style="color: #499fb6; text-decoration: none;">seoulstyleindia@gmail.com</a>
        or visit our
        <span target="_blank" style="color: #499fb6; text-decoration: none;">Help Center</span>
      </p>
    </main>

    <footer style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        ">
      <p style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          ">
        Seoul Style
      </p>
      <p style="margin: 0; margin-top: 16px; color: #434343;">
        Copyright © ${year} Company. All rights reserved.
      </p>
    </footer>
  </div>
</body>

</html>
        `;
};
