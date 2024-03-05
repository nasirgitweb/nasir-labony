import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Letter = () => {
  const textBlocksInitial = [
    "আমার প্রিয় লাবনি,",
    "আশা করি, আল্লাহর রহমাতে তুমি ভালো আছো।",
    "আজকে রাতে চাঁদের আলোয় বসে, তোমাকে লিখছি এই চিঠি। কীভাবে লিখবো, কী বলবো, কথাগুলো যেন হারিয়ে যাচ্ছে মনের অতল গহ্বরে।",
    "তোমার চোখের দৃষ্টি, তোমার কথার সুর, তোমার হাসি - সবকিছুই যেন ভাসছে চারপাশে।",
    "তোমার সঙ্গে প্রথম দেখাটা যেন কালের মতো মনে আছে। সেই দিন থেকে, তুমি আমার জীবনের অবিচ্ছেদ্য অংশ হয়ে উঠেছো।",
    "তোমায় ছাড়া এখন আর কোনো কিছুই পূর্ণ মনে হয় না। তুমিই আমার সূর্য, তুমিই আমার চাঁদ, তুমিই আমার জীবনের আলো।",
    "আমাদের এই ভালোবাসা সব বাধা অতিক্রম করতে পারবে— এই বিশ্বাস আমার।",
    "তোমার হাসি আমার দুঃখের কালো মেঘ সরিয়ে দেয়। তোমার কথা আমার ক্লান্ত মনকে শান্তি দেয়।",
    "তোমার সঙ্গে থাকতে পারলেই আমি পৃথিবীর সব সুখ পেয়ে যাওয়া অনুভব করি।",
    "আমি জানি না ভবিষ্যতে কী আছে, কিন্তু এই মুহূর্তে আমি জানি, আমি তোমাকে চাই। তোমার হাত ধরে, তোমার পাশে চলতে চাই জীবনের এই পথ চলতে।",
    "আমি তোমাকে অনেক ভালোবাসি। তোমার জন্য আমার অপেক্ষা চলবে।",
    "এই চিঠিটি তোমার হৃদয় স্পর্শ করুক, তোমাকে আমার ভালবাসার গভীরতা জানাক।",
    "তোমারই,",
    "নির্জন ❤️😊"
    // Add more text blocks as needed
  ];

  const [textBlocks, setTextBlocks] = useState(textBlocksInitial);

  const [typedBlocks, setTypedBlocks] = useState([]);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login page if token is not available
      navigate("/login");
    } else {
      // just check for localStorage JWT token valid or not
      fetch(`https://pg-backend-nine.vercel.app/giftdata`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch messages data");
          }
          return response.json();
        })
        .then((data) => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
          navigate("/login");
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        let currentTextBlock = textBlocks[currentBlockIndex];

        if (currentText.length < currentTextBlock.length) {
          setCurrentText(currentTextBlock.slice(0, currentText.length + 1));
        } else {
          if (currentBlockIndex === textBlocks.length - 1) {
            setIsTyping(false); // Stop typing if it's the last block
          } else {
            setCurrentText(""); // Clear current text for the next block
            setCurrentBlockIndex((prevIndex) => prevIndex + 1); // Move to the next block
          }
          setTypedBlocks([...typedBlocks, currentText]); // Add the typed block to typedBlocks
        }
      }, 100); // Typing speed

      return () => clearTimeout(timeout);
    }
  }, [currentText, currentBlockIndex, isTyping, textBlocks, typedBlocks]);

  return (
    <div className="h-screen flex justify-center bg-black text-white">
      <div className="w-full md:max-w-md lg:max-w-lg m-2 bg-gray-800 p-6 md:p-8 border border-gray-300 rounded-lg shadow-md">
        <div className="text-base md:text-lg lg:text-xl font-serif leading-relaxed text-white my-4">
          <div
            style={{
              minHeight: "30em",
              maxHeight: "60em",
              overflowY: "auto",
              color: "#0EACEE",
              fontSize: "14px",
              lineHeight: "1.5",
              fontFamily: 'Google Sans, "Helvetica Neue", sans-serif',
              fontWeight: 400,
            }}
          >
            {typedBlocks.map((block, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                {block}
              </div>
            ))}
            {isTyping && (
              <div
                style={{
                  marginBottom: "1rem",
                }}
              >
                {currentText}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Letter;
