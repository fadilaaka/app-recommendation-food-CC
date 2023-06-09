import os
import pandas as pd
import numpy as np
from flask import Flask, request
from flask_cors import CORS
from datetime import date
from flask_mysqldb import MySQL
from sklearn.preprocessing import LabelEncoder, LabelBinarizer
from tensorflow import keras

app = Flask(__name__)
CORS(app)
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'nutrimenu'
# app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['MYSQL_HOST'] = '34.101.51.251'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '87654321'
app.config['MYSQL_DB'] = 'nutrimenu'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['MYSQL_UNIX_SOCKET'] = '/cloudsql/aplikasi-rekomendasi-food:asia-southeast2:dev-test-arf'

mysql = MySQL(app)

data = pd.read_csv('./dataset_penggunafull2.csv')
# Encode Categorical Variabels
LabelEncoder = LabelEncoder()
data['Jenis Kelamin'] = LabelEncoder.fit_transform(data['Jenis Kelamin'])
data['Riwayat Penyakit'] = LabelEncoder.fit_transform(data['Riwayat Penyakit'])
data['Riwayat Alergi'] = LabelEncoder.fit_transform(data['Riwayat Alergi'])
data['Faktor Aktivitas'] = LabelEncoder.fit_transform(data['Faktor Aktivitas'])
data['Faktor Stress'] = LabelEncoder.fit_transform(data['Faktor Stress'])

model1 = keras.models.load_model('./breakfast.h5')
model2 = keras.models.load_model('./lunch.h5')
model3 = keras.models.load_model('./dinner.h5')
model4 = keras.models.load_model('./snackpagi.h5')
model5 = keras.models.load_model('./snacksiang.h5')

LabelBinarizer1 = LabelBinarizer()
LabelBinarizer2 = LabelBinarizer()
LabelBinarizer3 = LabelBinarizer()
LabelBinarizer4 = LabelBinarizer()
LabelBinarizer5 = LabelBinarizer()
LabelBinarizer1.fit_transform(data['rekomendasi breakfast'])
LabelBinarizer2.fit_transform(data['rekomendasi lunch'])
LabelBinarizer3.fit_transform(data['rekomendasi dinner'])
LabelBinarizer4.fit_transform(data['rekomendasi snack pagi'])
LabelBinarizer5.fit_transform(data['rekomendasi snack siang'])


def BreakfastRecomendation(new_users):
    RecomendationBreakfast = []

    for NewUser in new_users:
        # Process New User
        NewUser['Jenis Kelamin'] = LabelEncoder.fit_transform(
            [NewUser['Jenis Kelamin']])[0]
        NewUser['Riwayat Penyakit'] = LabelEncoder.fit_transform(
            [NewUser['Riwayat Penyakit']])[0]
        NewUser['Riwayat Alergi'] = LabelEncoder.fit_transform(
            [NewUser['Riwayat Alergi']])[0]
        NewUser['Faktor Aktivitas'] = LabelEncoder.fit_transform(
            [NewUser['Faktor Aktivitas']])[0]
        NewUser['Faktor Stress'] = LabelEncoder.fit_transform(
            [NewUser['Faktor Stress']])[0]
        NewUser['dislike_food'] = LabelEncoder.fit_transform(
            [NewUser['dislike_food']])[0]

        # Remove Column New User
        new_user_features = np.array([
            NewUser['Usia'],
            NewUser['BB'],
            NewUser['TB'],
            NewUser['Jenis Kelamin'],
            NewUser['Riwayat Penyakit'],
            NewUser['Riwayat Alergi'],
            NewUser['Faktor Aktivitas'],
            NewUser['Faktor Stress']
        ])

        # Give Recomendation
        RecomendationBreakfast.append(
            model1.predict(np.array([new_user_features]))[0])

    recommended_foods1 = []
    for RecomendationBreakfast, NewUser in zip(RecomendationBreakfast, new_users):
        recommended_food_index1 = np.argmax(RecomendationBreakfast)
        recommended_food1 = LabelBinarizer1.classes_[recommended_food_index1]

        # Exclude dislike foods
        if recommended_food1 == NewUser['dislike_food']:
            # Regenerate Recomendation
            RecomendationBreakfast[recommended_food_index1] = -np.inf
            SecondHighestIndex1 = np.argmax(RecomendationBreakfast)
            recommended_food1 = LabelBinarizer1.classes_[SecondHighestIndex1]

        recommended_foods1.append(recommended_food1)

    return recommended_foods1


def LunchRecomendation(new_users):
    RecomendationLunch = []

    for NewUser in new_users:
        # Process New User
        NewUser['Jenis Kelamin'] = LabelEncoder.fit_transform(
            [NewUser['Jenis Kelamin']])[0]
        NewUser['Riwayat Penyakit'] = LabelEncoder.fit_transform(
            [NewUser['Riwayat Penyakit']])[0]
        NewUser['Riwayat Alergi'] = LabelEncoder.fit_transform(
            [NewUser['Riwayat Alergi']])[0]
        NewUser['Faktor Aktivitas'] = LabelEncoder.fit_transform(
            [NewUser['Faktor Aktivitas']])[0]
        NewUser['Faktor Stress'] = LabelEncoder.fit_transform(
            [NewUser['Faktor Stress']])[0]
        NewUser['dislike_food'] = LabelEncoder.fit_transform(
            [NewUser['dislike_food']])[0]

        # Remove Column New User
        new_user_features = np.array([
            NewUser['Usia'],
            NewUser['BB'],
            NewUser['TB'],
            NewUser['Jenis Kelamin'],
            NewUser['Riwayat Penyakit'],
            NewUser['Riwayat Alergi'],
            NewUser['Faktor Aktivitas'],
            NewUser['Faktor Stress']
        ])

        # Give Recomendation
        RecomendationLunch.append(model2.predict(
            np.array([new_user_features]))[0])

    recommended_foods2 = []
    for RecomendationLunch, NewUser in zip(RecomendationLunch, new_users):
        recommended_food_index2 = np.argmax(RecomendationLunch)
        recommended_food2 = LabelBinarizer2.classes_[recommended_food_index2]

        # Exclude dislike foods
        if recommended_food2 == NewUser['dislike_food']:
            # Regenerate Recomendation
            RecomendationLunch[recommended_food_index2] = -np.inf
            SecondHighestIndex2 = np.argmax(RecomendationLunch)
            recommended_food2 = LabelBinarizer2.classes_[SecondHighestIndex2]

        recommended_foods2.append(recommended_food2)

    return recommended_foods2


def DinnerRecomendation(new_users):
    RecomendationDinner = []

    for NewUser in new_users:
        # Process New User
        NewUser['Jenis Kelamin'] = LabelEncoder.fit_transform(
            [NewUser['Jenis Kelamin']])[0]
        NewUser['Riwayat Penyakit'] = LabelEncoder.fit_transform(
            [NewUser['Riwayat Penyakit']])[0]
        NewUser['Riwayat Alergi'] = LabelEncoder.fit_transform(
            [NewUser['Riwayat Alergi']])[0]
        NewUser['Faktor Aktivitas'] = LabelEncoder.fit_transform(
            [NewUser['Faktor Aktivitas']])[0]
        NewUser['Faktor Stress'] = LabelEncoder.fit_transform(
            [NewUser['Faktor Stress']])[0]
        NewUser['dislike_food'] = LabelEncoder.fit_transform(
            [NewUser['dislike_food']])[0]

        # Remove Column New User
        new_user_features = np.array([
            NewUser['Usia'],
            NewUser['BB'],
            NewUser['TB'],
            NewUser['Jenis Kelamin'],
            NewUser['Riwayat Penyakit'],
            NewUser['Riwayat Alergi'],
            NewUser['Faktor Aktivitas'],
            NewUser['Faktor Stress']
        ])

        # Give Recomendation
        RecomendationDinner.append(model3.predict(
            np.array([new_user_features]))[0])

    recommended_foods3 = []
    for RecomendationDinner, NewUser in zip(RecomendationDinner, new_users):
        recommended_food_index3 = np.argmax(RecomendationDinner)
        recommended_food3 = LabelBinarizer3.classes_[recommended_food_index3]

        # Exclude dislike foods
        if recommended_food3 == NewUser['dislike_food']:
            # Regenerate Recomendation
            RecomendationDinner[recommended_food_index3] = -np.inf
            SecondHighestIndex3 = np.argmax(RecomendationDinner)
            recommended_food3 = LabelBinarizer3.classes_[SecondHighestIndex3]

        recommended_foods3.append(recommended_food3)

    return recommended_foods3


def RecomendationSnackPagi(new_users):
    RecomendationSnackPagi = []

    for NewUser in new_users:
        # Process New User
        NewUser['Jenis Kelamin'] = LabelEncoder.fit_transform(
            [NewUser['Jenis Kelamin']])[0]
        NewUser['Riwayat Penyakit'] = LabelEncoder.fit_transform(
            [NewUser['Riwayat Penyakit']])[0]
        NewUser['Riwayat Alergi'] = LabelEncoder.fit_transform(
            [NewUser['Riwayat Alergi']])[0]
        NewUser['Faktor Aktivitas'] = LabelEncoder.fit_transform(
            [NewUser['Faktor Aktivitas']])[0]
        NewUser['Faktor Stress'] = LabelEncoder.fit_transform(
            [NewUser['Faktor Stress']])[0]
        NewUser['dislike_food'] = LabelEncoder.fit_transform(
            [NewUser['dislike_food']])[0]

        # Remove Column New User
        new_user_features = np.array([
            NewUser['Usia'],
            NewUser['BB'],
            NewUser['TB'],
            NewUser['Jenis Kelamin'],
            NewUser['Riwayat Penyakit'],
            NewUser['Riwayat Alergi'],
            NewUser['Faktor Aktivitas'],
            NewUser['Faktor Stress']
        ])

        # Give Recomendation
        RecomendationSnackPagi.append(
            model4.predict(np.array([new_user_features]))[0])

    recommended_foods4 = []
    for RecomendationSnackPagi, NewUser in zip(RecomendationSnackPagi, new_users):
        recommended_food_index4 = np.argmax(RecomendationSnackPagi)
        recommended_food4 = LabelBinarizer4.classes_[recommended_food_index4]

        # Exclude dislike foods
        if recommended_food4 == NewUser['dislike_food']:
            # Regenerate Recomendation
            RecomendationSnackPagi[recommended_food_index4] = -np.inf
            SecondHighestIndex4 = np.argmax(RecomendationSnackPagi)
            recommended_food4 = LabelBinarizer4.classes_[SecondHighestIndex4]

        recommended_foods4.append(recommended_food4)

    return recommended_foods4


def RecomendationSnackSiang(new_users):
    RecomendationSnackSiang = []

    for NewUser in new_users:
        # Process New User
        NewUser['Jenis Kelamin'] = LabelEncoder.fit_transform(
            [NewUser['Jenis Kelamin']])[0]
        NewUser['Riwayat Penyakit'] = LabelEncoder.fit_transform(
            [NewUser['Riwayat Penyakit']])[0]
        NewUser['Riwayat Alergi'] = LabelEncoder.fit_transform(
            [NewUser['Riwayat Alergi']])[0]
        NewUser['Faktor Aktivitas'] = LabelEncoder.fit_transform(
            [NewUser['Faktor Aktivitas']])[0]
        NewUser['Faktor Stress'] = LabelEncoder.fit_transform(
            [NewUser['Faktor Stress']])[0]
        NewUser['dislike_food'] = LabelEncoder.fit_transform(
            [NewUser['dislike_food']])[0]

        # Remove Column New User
        new_user_features = np.array([
            NewUser['Usia'],
            NewUser['BB'],
            NewUser['TB'],
            NewUser['Jenis Kelamin'],
            NewUser['Riwayat Penyakit'],
            NewUser['Riwayat Alergi'],
            NewUser['Faktor Aktivitas'],
            NewUser['Faktor Stress']
        ])

        # Give Recomendation
        RecomendationSnackSiang.append(
            model5.predict(np.array([new_user_features]))[0])

    recommended_foods5 = []
    for RecomendationSnackSiang, NewUser in zip(RecomendationSnackSiang, new_users):
        recommended_food_index5 = np.argmax(RecomendationSnackSiang)
        recommended_food5 = LabelBinarizer5.classes_[recommended_food_index5]

        # Exclude dislike foods
        if recommended_food5 == NewUser['dislike_food']:
            # Regenerate Recomendation
            RecomendationSnackSiang[recommended_food_index5] = -np.inf
            SecondHighestIndex5 = np.argmax(RecomendationSnackSiang)
            recommended_food5 = LabelBinarizer5.classes_[SecondHighestIndex5]

        recommended_foods5.append(recommended_food5)

    return recommended_foods5


@app.route('/')
def hello():
    return 'Hello Flask'


@app.route('/foods-recommendation', methods=['GET', 'POST'])
def foods_recommendation():
    if request.method == 'POST':
        usia_user = request.form['usia_user']
        berat_badan = request.form['berat_badan']
        tinggi_badan = request.form['tinggi_badan']
        jenis_kelamin = request.form['jenis_kelamin']
        riwayat_penyakit = request.form['riwayat_penyakit']
        riwayat_alergi = request.form['riwayat_alergi']
        faktor_aktivitas = request.form['faktor_aktivitas']
        faktor_stress = request.form['faktor_stress']
        dislike_food = request.form['dislike_food']
        new_users = [
            {
                'Usia': float(usia_user),
                'BB': float(berat_badan),
                'TB': float(tinggi_badan),
                'Jenis Kelamin': jenis_kelamin,
                'Riwayat Penyakit': riwayat_penyakit,
                'Riwayat Alergi': riwayat_alergi,
                'Faktor Aktivitas': faktor_aktivitas,
                'Faktor Stress': faktor_stress,
                'dislike_food': dislike_food
            }
        ]

        RecommendedBreakfast = BreakfastRecomendation(new_users)
        RecommendedLunch = LunchRecomendation(new_users)
        RecommendedDinner = DinnerRecomendation(new_users)
        RecommendedSnackPagi = RecomendationSnackPagi(new_users)
        RecommendedSnackSiang = RecomendationSnackSiang(new_users)

        cursor = mysql.connection.cursor()
        cursor.execute(
            f"SELECT f.uuid, f.name, f.description, f.image, f.price, f.status, fd.fat, fd.protein, fd.carbohidrat, fd.calories, fr.description AS food_recipe, ft.name AS food_tags FROM Food f LEFT JOIN FoodDetail fd ON f.id = fd.foodId LEFT JOIN FoodRecipe fr ON f.id = fr.foodId LEFT JOIN FoodTagsOnFood ftof ON f.id = ftof.foodId LEFT JOIN FoodTags ft ON ftof.foodTagsId = ft.id WHERE f.name = '{RecommendedBreakfast[0]}'")
        breakfast = cursor.fetchone()

        cursor.execute(
            f"SELECT f.uuid, f.name, f.description, f.image, f.price, f.status, fd.fat, fd.protein, fd.carbohidrat, fd.calories, fr.description AS food_recipe, ft.name AS food_tags FROM Food f LEFT JOIN FoodDetail fd ON f.id = fd.foodId LEFT JOIN FoodRecipe fr ON f.id = fr.foodId LEFT JOIN FoodTagsOnFood ftof ON f.id = ftof.foodId LEFT JOIN FoodTags ft ON ftof.foodTagsId = ft.id WHERE f.name = '{RecommendedLunch[0]}'")
        lunch = cursor.fetchone()

        cursor.execute(
            f"SELECT f.uuid, f.name, f.description, f.image, f.price, f.status, fd.fat, fd.protein, fd.carbohidrat, fd.calories, fr.description AS food_recipe, ft.name AS food_tags FROM Food f LEFT JOIN FoodDetail fd ON f.id = fd.foodId LEFT JOIN FoodRecipe fr ON f.id = fr.foodId LEFT JOIN FoodTagsOnFood ftof ON f.id = ftof.foodId LEFT JOIN FoodTags ft ON ftof.foodTagsId = ft.id WHERE f.name = '{RecommendedDinner[0]}'")
        dinner = cursor.fetchone()

        cursor.execute(
            f"SELECT f.uuid, f.name, f.description, f.image, f.price, f.status, fd.fat, fd.protein, fd.carbohidrat, fd.calories, fr.description AS food_recipe, ft.name AS food_tags FROM Food f LEFT JOIN FoodDetail fd ON f.id = fd.foodId LEFT JOIN FoodRecipe fr ON f.id = fr.foodId LEFT JOIN FoodTagsOnFood ftof ON f.id = ftof.foodId LEFT JOIN FoodTags ft ON ftof.foodTagsId = ft.id WHERE f.name = '{RecommendedSnackPagi[0]}'")
        snackpagi = cursor.fetchone()

        cursor.execute(
            f"SELECT f.uuid, f.name, f.description, f.image, f.price, f.status, fd.fat, fd.protein, fd.carbohidrat, fd.calories, fr.description AS food_recipe, ft.name AS food_tags FROM Food f LEFT JOIN FoodDetail fd ON f.id = fd.foodId LEFT JOIN FoodRecipe fr ON f.id = fr.foodId LEFT JOIN FoodTagsOnFood ftof ON f.id = ftof.foodId LEFT JOIN FoodTags ft ON ftof.foodTagsId = ft.id WHERE f.name = '{RecommendedSnackSiang[0]}'")
        snacksiang = cursor.fetchone()

        # print(user)
        return {"data": [
            {
                "breakfast": breakfast,
            },
            {
                "lunch": lunch,
            },
            {
                "dinner": dinner,
            },
            {
                "snackpagi": snackpagi,
            },
            {
                "snacksiang": snacksiang,
            },
        ]}


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
