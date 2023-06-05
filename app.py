from flask import Flask, request
from datetime import date
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'nutrimenu'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

@app.route('/')
def hello():
    return 'Hello Brother'

@app.route('/json-example')
def json_example():
    return 'JSON Object Example'

@app.route('/date')
def get_current_date():
    list_personal = [
        {
            "Name": "Ahmad",
            "Age": 25,
            "Like": True,
            "date": date.today()
        },
        {
            "Name": "Monica",
            "Age": 21,
            "Like": False,
            "date": date.today()
        }
    ]
    return {"data": list_personal}

@app.route('/get-user', methods=['GET'])
def get_user():
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute("""SELECT * FROM user""")
        user = cursor.fetchall()
        print(user)
        return {"data": user}

if __name__ == '__main__':
    # run app in debug mode on port 5001
    app.run(debug=True, port=5001)
