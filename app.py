import os
import io
import requests
import pandas as pd
import numpy as np
import logging
import fileapp
import urllib
from flask import Flask, request
from flask_cors import CORS
from PIL import Image
from tensorflow import keras
from google.cloud import storage
from fileobjects import DisplayInfo
from fileobjects import UploadedFile

app = Flask(__name__)
CORS(app)

project_id = 'aplikasi-rekomendasi-food'
bucket_name = 'image-recogfavamn612211314'
bucket_url = 'https://storage.googleapis.com/image-recogfavamn612211314'

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = 'aplikasi-rekomendasi-food-c5d232010e49.json'

csv_path = './calorie bangkit.csv'
dataset = pd.read_csv(csv_path)
foods_sorted = sorted(os.listdir('./images'))

model_best = keras.models.load_model(
    './best_model_101class_101images.hdf5', compile=False)
# model_best = keras.models.load_model('./food_c101_n10099_r64x64x3.h5')


def predict_class(model, images):
    results = []

    for img_path in images:
        img = keras.preprocessing.image.load_img(
            img_path, target_size=(200, 200))
        img = keras.preprocessing.image.img_to_array(img)
        img = np.expand_dims(img, axis=0)
        img = img / 255.

        pred = model.predict(img)
        index = np.argmax(pred)
        pred_value = foods_sorted[index]

        # Retrieve additional information from the dataset based on the predicted food
        food_info = dataset[dataset['Food_Name'] == pred_value]
        calorie = food_info['Calorie'].values[0]
        protein = food_info['Protein'].values[0]
        fat = food_info['Fat'].values[0]
        carbohydrate = food_info['Carbohidrat'].values[0]

        result = f"Calorie: {calorie}, Protein: {protein}, Fat: {fat}, Carbohidrat: {carbohydrate}"
        results.append(result)

    return results[0] if results else None


@app.route('/')
def hello():
    image1 = ['./dodolgarut.jpg']
    image2 = ['./miebakso.jpg']
    image3 = ['./nasigoreng.jpg']
    predict1 = predict_class(model_best, image1)
    predict2 = predict_class(model_best, image2)
    predict3 = predict_class(model_best, image3)
    return {"data": [
        {
            "foto1": predict1
        },
        {
            "foto2": predict2
        },
        {
            "foto3": predict3
        }
    ]}

# @app.route('/check-image')
# def checkimage():
#     response = requests.get("https://storage.googleapis.com/image-recogfavamn612211314/ikan.jpeg", stream=True)
#     response.raise_for_status()
#     with open("temp-image.jpg", "wb") as file:
#         for chunk in response.iter_content(chunk_size=8192):
#             file.write(chunk)
#     image = ['./temp-image.jpg']
#     predict = predict_class(model_best, image)
#     return {"data":
#         {
#             "fotoUrl": f"https://storage.googleapis.com/image-recogfavamn612211314/ikan.jpeg",
#             "predict": predict,
#         },
#     }


@app.route('/upload-image-food', methods=['GET', 'POST'])
def uploadImageFood():
    if request.method == 'POST':
        uploaded_file = request.files.get('file')

        client = storage.Client(project_id)
        bucket = client.get_bucket(bucket_name)
        blob = bucket.blob(uploaded_file.filename)
        content = uploaded_file.content_type
        blob.upload_from_string(uploaded_file.read(), content_type=content)
        
        response = requests.get(f"{bucket_url}/{uploaded_file.filename}", stream=True)
        response.raise_for_status()
        with open("temp-image.jpg", "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        image = [f'./temp-image.jpg']
        predict = predict_class(model_best, image)

        return {"data":
                {
                    "predict": predict,
                    "imageUrl": f"{bucket_url}/{uploaded_file.filename}",
                },
                }




if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
