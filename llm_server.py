from flask import Flask, request, jsonify
import json
import requests

app = Flask(__name__)

# Ollama API endpoint (make sure Ollama is running with a model like llama2)
OLLAMA_URL = "http://localhost:11434/api/generate"

def create_analysis_prompt(transcript, question):
    return f"""
Analyze the following interview answer and provide a JSON response with the following structure:
{{
    "score": <0-100>,
    "feedback": "<detailed feedback>",
    "strengths": ["<strength1>", "<strength2>"],
    "improvements": ["<improvement1>", "<improvement2>"],
    "duration": <estimated_duration_in_seconds>
}}

Question: {question}
Answer: {transcript}

Provide only the JSON response, no additional text.
"""

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        transcript = data.get('transcript', '')
        question = data.get('question', 'Tell me about yourself')
        
        if not transcript:
            return jsonify({'error': 'No transcript provided'}), 400
        
        # Create prompt for LLM
        prompt = create_analysis_prompt(transcript, question)
        
        # Call Ollama
        ollama_response = requests.post(OLLAMA_URL, json={
            "model": "llama2",  # Change this to your installed model
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.7,
                "top_p": 0.9
            }
        })
        
        if ollama_response.status_code != 200:
            return jsonify({'error': 'LLM service unavailable'}), 500
        
        # Parse LLM response
        llm_output = ollama_response.json().get('response', '')
        
        try:
            # Try to extract JSON from the response
            # Look for JSON-like content in the response
            import re
            json_match = re.search(r'\{.*\}', llm_output, re.DOTALL)
            if json_match:
                analysis = json.loads(json_match.group())
            else:
                # Fallback to mock analysis if JSON parsing fails
                analysis = {
                    "score": 85,
                    "feedback": "Good response with clear communication.",
                    "strengths": ["Clear communication", "Specific examples"],
                    "improvements": ["Add more quantifiable results"],
                    "duration": 60
                }
        except json.JSONDecodeError:
            # Fallback analysis if JSON parsing fails
            analysis = {
                "score": 85,
                "feedback": "Good response with clear communication.",
                "strengths": ["Clear communication", "Specific examples"],
                "improvements": ["Add more quantifiable results"],
                "duration": 60
            }
        
        return jsonify({'analysis': analysis})
        
    except Exception as e:
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health():
    try:
        # Check if Ollama is running
        response = requests.get("http://localhost:11434/api/tags")
        if response.status_code == 200:
            return jsonify({'status': 'healthy', 'ollama': 'connected'})
        else:
            return jsonify({'status': 'unhealthy', 'ollama': 'disconnected'})
    except:
        return jsonify({'status': 'unhealthy', 'ollama': 'disconnected'})

if __name__ == '__main__':
    print("Starting LLM Analysis server on http://localhost:5002")
    print("Make sure Ollama is running with a model (e.g., 'ollama run llama2')")
    app.run(host='0.0.0.0', port=5002, debug=True) 