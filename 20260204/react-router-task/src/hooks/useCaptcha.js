import { useState } from "react";

export const useCaptcha = () => {
  const [captchaValue, setCaptchaValue] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [captchaText] = useState(generateCaptcha);

  const verifyCaptcha = (userInput) => {
    return userInput === captchaText;
  };

  return { captchaValue, setCaptchaValue, captchaText, verifyCaptcha };
};
