import { useEffect, useState } from "react";

function App() {
    const [fromLang, setFromLang] = useState("en");
    const [toLang, setToLang] = useState("fr");
    const [fromText, setFromText] = useState("");
    const [toText, setToText] = useState("");

    useEffect(() => {
        if (!fromText.trim()) {
            setToText("");
            return;
        }

        const fetchTranslation = async () => {
            try {
                const encodedText = encodeURIComponent(fromText);
                const url = `http://127.0.0.1:8000/translate/?text=${encodedText}&from_lang=${fromLang}&to_lang=${toLang}`;
                
                const response = await fetch(url);
                const data = await response.json();
                if (data.text) setToText(data.text);
            } catch (error) {
                console.error("Translation error:", error);
            }
        };

        // Add a slight delay to avoid making too many requests
        const timeoutId = setTimeout(fetchTranslation, 500);
        
        return () => clearTimeout(timeoutId);
    }, [fromText, fromLang, toLang]);

    return (
        <div className="bg-amber-100 h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="mb-4">
                    <label htmlFor="fromLang" className="block text-gray-700 text-sm font-bold mb-2">From</label>
                    <select
                        onChange={(e) => setFromLang(e.target.value)}
                        value={fromLang}
                        id="fromLang"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="km">Khmer</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="toLang" className="block text-gray-700 text-sm font-bold mb-2">To</label>
                    <select
                        onChange={(e) => setToLang(e.target.value)}
                        value={toLang}
                        id="toLang"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="km">Khmer</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="fromText" className="block text-gray-700 text-sm font-bold mb-2">Text</label>
                    <textarea
                        onChange={(e) => setFromText(e.target.value)}
                        value={fromText}
                        id="fromText"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="toText" className="block text-gray-700 text-sm font-bold mb-2">Translation</label>
                    <textarea
                        value={toText}
                        id="toText"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                        readOnly
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

export default App;
