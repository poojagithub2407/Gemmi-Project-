import { createContext, useState } from "react";
import run from "../config/genimi";

export const Context = createContext();

const ContextProvider = (props) => {
     const [input, setInput] = useState('');
     const [recentPrompt, setRecentPrompt] = useState('');
     const [previousPrompt, setPreviousPrompt] = useState([]);
     const [showResult, setShowResult] = useState(false);
     const [loading, setLoading] = useState(false);
     const [resultData, setResultData] = useState("");

     const delayPara = (index, nextWord) => {
          setTimeout(() => {
               setResultData(prev => prev + nextWord);
          }, 75 * index);
     };

     const newChat = () => {
          setLoading(false);
          setShowResult(false)
     }

     const onSend = async (prompt) => {
          setResultData("");
          setLoading(true);
          setShowResult(true);

          let finalPrompt = prompt !== undefined ? prompt : input;

          try {
               const response = await run(finalPrompt); // Assuming run returns a string

               // Split response by '**' and format accordingly
               let responseArray = response.split("**");
               let newResponse = ""; // Initialize newResponse

               for (let i = 0; i < responseArray.length; i++) {
                    if (i % 2 === 1) {
                         newResponse += "<b>" + responseArray[i] + "</b>";
                    } else {
                         newResponse += responseArray[i];
                    }
               }

               // Handle new lines with '*' and word splitting for animation
               let formattedResponse = newResponse.split("*").join("</br>");
               let newResponseArray = formattedResponse.split(" ");

               // Use delayPara to show result word by word
               newResponseArray.forEach((nextWord, i) => {
                    delayPara(i, nextWord + " ");
               });

               // Set recent and previous prompts
               setRecentPrompt(finalPrompt);
               setPreviousPrompt(prev => [...prev, finalPrompt]);
               setInput(''); // Clear input field

          } catch (error) {
               console.error("Error occurred while fetching response:", error);
               setResultData("An error occurred. Please try again.");
          } finally {
               setLoading(false);
          }
     };

     const contextValue = {
          previousPrompt,
          setPreviousPrompt,
          onSend,
          setRecentPrompt,
          recentPrompt,
          showResult,
          loading,
          resultData,
          input,
          setInput,
          newChat
     };

     return (
          <Context.Provider value={contextValue}>
               {props.children}
          </Context.Provider>
     );
};

export default ContextProvider;
