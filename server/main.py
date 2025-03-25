from deep_translator import GoogleTranslator
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend's domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/translate/")
async def translate_text(text: str, from_lang: str = "en", to_lang: str = "es"):
    """Translates the given text from one language to another."""
    try:
        translated = GoogleTranslator(source=from_lang, target=to_lang).translate(text)
        return {"text": translated}
    except Exception as e:
        return {"error": str(e)}
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
