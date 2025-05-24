from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import dwani
import google.generativeai as genai

dwani.api_key = os.getenv("DWANI_API_KEY")
dwani.api_base = os.getenv("DWANI_API_BASE_URL")

app = Flask(__name__)
CORS(app)

@app.route("/api/chat", methods=["POST"])
def api_chat():
    prompt = request.json.get("message", "")
    try:
        
        model = genai.GenerativeModel("gemini-1.5-flash")
        chat = model.start_chat()
        gemini_response = chat.send_message(f"{prompt} and in answer dont use special symbols and give simple answer")
        gemini_text = gemini_response.text.strip()

        response = dwani.Chat.create(prompt=prompt, src_lang="eng_Latn", tgt_lang="kan_Knda")
        reply_text = response.get("response", "No response")

        # Generate speech
        audio_bytes = dwani.Audio.speech(input=reply_text, response_format="mp3")
        audio_path = "output.mp3"
        with open(audio_path, "wb") as f:
            f.write(audio_bytes)

        return jsonify({"reply": reply_text, "audioUrl": "http://localhost:3001/api/audio"})
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"}), 500

@app.route("/api/audio", methods=["GET"])
def get_audio():
    return send_file("output.mp3", mimetype="audio/mpeg")

if __name__ == "__main__":
    app.run(port=3001, debug=True)
