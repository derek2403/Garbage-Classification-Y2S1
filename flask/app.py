from flask import Flask, request, jsonify, render_template  # Make sure to import render_template
from flask_cors import CORS
import numpy as np
import cv2
import tensorflow as tf
from tensorflow.keras.models import load_model
from collections import Counter

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load the model
model = load_model('base_model_1.keras')

labels = {0: "cardboard", 1: "glass", 2: "metal", 3: "paper", 4: "plastic", 5: "trash"}
SIZE = (224, 224)

def load_image(img):
    img = cv2.imdecode(np.frombuffer(img, np.uint8), cv2.IMREAD_COLOR)
    img = cv2.resize(img, SIZE)
    img = np.expand_dims(img, axis=0)
    img = tf.keras.applications.resnet50.preprocess_input(img)
    return img

def classify_image(model, img):
    pred = model.predict(img)[0]
    top_pred = np.argmax(pred)
    return labels[top_pred], max(pred)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/classify', methods=['POST', 'OPTIONS'])
def classify():
    if request.method == 'OPTIONS':
        return '', 204
    if 'images' not in request.files:
        return jsonify({'error': 'No images in request'}), 400
    
    images = request.files.getlist('images')
    predictions = []

    for image in images:
        img = load_image(image.read())
        pred_label, _ = classify_image(model, img)
        predictions.append(pred_label)

    most_common_pred = Counter(predictions).most_common(1)[0][0]
    return jsonify({'prediction': most_common_pred})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)