# Translation Service API

This is a simple translation service API built using FastAPI and the `deep-translator` library. It allows you to translate text between different languages using the Google Translator.

## Features
- Translates text from one language to another.
- CORS middleware is enabled to allow communication with frontend applications.
- Supports dynamic language translation (source and target languages can be specified).

## Installation

To run the project, you will need to install the required dependencies. First, clone the repository:

```bash
git clone https://github.com/yourusername/translator.git
cd translator
```

Then, create a virtual environment and install the required packages:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Running the API

You can run the API using Uvicorn:

```bash
uvicorn main:app --reload
```

The application will be available at `http://127.0.0.1:8000`.

## Endpoints

### `GET /translate/`

Translates text from one language to another.

#### Parameters:
- `text` (str): The text to be translated (required).
- `from_lang` (str): The source language code (default is `"en"`).
- `to_lang` (str): The target language code (default is `"es"`).

#### Example Request:

```bash
GET /translate/?text=Hello&from_lang=en&to_lang=es
```

#### Example Response:

```json
{
  "text": "Hola"
}
```

### CORS
The API is configured to allow cross-origin requests from any origin (`allow_origins=["*"]`). In production, you should specify the frontend domain instead of using `"*"`, for security reasons.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
