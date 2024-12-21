from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = Flask(__name__)

# Load model and tokenizer
model_name = "google/mt5-small"  # Replace with your fine-tuned model
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_text = data.get('rm', '')
    
    # Tokenize input text
    inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding="max_length", max_length=128)
    
    # Perform prediction
    outputs = model.generate(inputs['input_ids'], attention_mask=inputs['attention_mask'])
    
    # Decode and return the result
    output_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return jsonify({'bn': output_text})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
