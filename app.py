from flask import Flask, render_template, redirect
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc
import datetime as dt
import sqlite3


# Create an instance of Flask
app = Flask(__name__)



@app.route("/")
def home():
    # Use sqlite to establish db connection.
    engine = create_engine("sqlite:///coviddata.sqlite")
    # Declare a Base using `automap_base()`
    Base = automap_base()
    # Use the Base class to reflect the database tables
    Base.prepare(engine, reflect=True)
    # Assign the State class to a variable called `location_db`
    location_db = Base.classes.location
    # Create a session
    session = Session(engine)
    location_count = session.query(location_db).group_by(location_db.state_name).count()
    session.close()
    data_bin = []
    #for row in session.query(location_db, location_db.state_name).limit(5).all():
        #data_bin.append("row")
    return str(location_count)
    # Code here - Default landing.

@app.route("/find")
def find():
    return "Doing Something here."
    # Code here - search by city.


if __name__=="__main__":
    app.run(debug=True)