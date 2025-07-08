from flask import Flask, request, jsonify
import whisper
import tempfile
import os

app = Flask(__name__)

# Load Whisper model (you can change to "small", "medium", "large" for better accuracy)
print("Loading Whisper model...")
model = whisper.load_model("base")
print("Whisper model loaded successfully!")

@app.route('/transcribe', methods=['POST'])
def transcribe():
    try:
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400
        
        audio = request.files['audio']
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tmp:
            audio.save(tmp.name)
            tmp_path = tmp.name
        
        try:
            # Transcribe the audio
            result = model.transcribe(tmp_path)
            transcript = result['text'].strip()
            
            return jsonify({
                'transcript': transcript,
                'language': result.get('language', 'en'),
                'confidence': result.get('avg_logprob', 0)
            })
        finally:
            # Clean up temporary file
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
                
    except Exception as e:
        return jsonify({'error': f'Transcription failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model': 'whisper-base'})

if __name__ == '__main__':
    print("Starting Whisper server on http://localhost:5001")
    app.run(host='0.0.0.0', port=5001, debug=True) 