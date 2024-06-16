import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      EN: {
        translation: {
          homepage: {
            tilte1: "Pre TOEIC course for beginners",
            tilte2:
              "TOEIC course is exclusively for people who have lost their roots, committed to regaining their English basics after 3 months. Typeform will motivate you to learn English every day.",
            tilte3: "Take Quiz Now",
          },
        },
      },

      VI: {
        translation: {
          homepage: {
            tilte1: "Khóa học chuẩn bị thi TOEIC cho người mới",
            tilte2:
              "Khóa học TOEIC dành riêng cho những người đã bỏ lỡ cơ hội, cam kết khôi phục lại nền tảng tiếng Anh sau 3 tháng. Typeform sẽ thúc đẩy bạn học tiếng Anh mỗi ngày.",
            tilte3: "Bắt đầu làm bài",
          },
        },
      },
    },
  });

export default i18n;
