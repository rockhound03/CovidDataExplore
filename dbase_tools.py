if __name__ == "__main__":
    pass

import math
import numpy as np
import pandas as pd
import requests
#from config import api_key
import time
from datetime import datetime
# Dependencies
# ----------------------------------
# Imports the method used for connecting to DBs
from sqlalchemy import create_engine

# Imports the methods needed to abstract classes into tables
from sqlalchemy.ext.declarative import declarative_base

# Allow us to declare column types
from sqlalchemy import Column, Integer, String, Float 



def state_case_data_sort(state_data):
    # find new cases from total cases.
    cases_state = [case for case in state_data['cases']]
    new_state_case = []
    for day in range(0,len(cases_state)):
        if day == 0:
            new_state_case.append(cases_state[day])
        elif cases_state[day] > cases_state[day - 1]:
            new_state_case.append(cases_state[day] - cases_state[day - 1])
        else:
            new_state_case.append(0)
    return new_state_case

def state_death_data_sort(state_data):
    # find new deaths from total death.
    deaths_state = [case for case in state_data['deaths']]
    new_state_deaths = []
    for day in range(0,len(deaths_state)):
        if day == 0:
            new_state_deaths.append(deaths_state[day])
        elif deaths_state[day] > deaths_state[day - 1]:
            new_state_deaths.append(deaths_state[day] - deaths_state[day - 1])
        else:
            new_state_deaths.append(0)
    
    #state_data['new_cases'] = new_state_case
    #state_data['new_deaths'] = new_state_deaths
    return new_state_deaths
    #return state_data

def group_states(raw_df, state_list):
    all_new_state_deaths = []
    all_new_state_cases = []
    for state in state_list:
        raw_state = raw_df.loc[raw_df['state'] == state]
        new_deaths = state_death_data_sort(raw_state)
        new_cases = state_case_data_sort(raw_state)
        [all_new_state_cases.append(row) for row in new_cases]
        [all_new_state_deaths.append(row) for row in new_deaths]
    raw_df['new_deaths'] = all_new_state_deaths
    raw_df['new_cases'] = all_new_state_cases
    return raw_df

def prep_for_db(master_df):
    Base = declarative_base()
    class State(Base):
        __tablename__ = 'location'
        id = Column(Integer, primary_key=True)
        city_name = Column(String(255))
        date = Column(String(255))
        cases = Column(Integer)
        deaths = Column(Integer)
        new_cases = Column(Integer)
        new_deaths = Column(Integer)

    data_ready = []
    for i,state_day in master_df.iterrows():
        data_ready.append(State(city_name = state_day['state'],date = state_day['date'], cases=state_day['cases'],deaths=state_day['deaths'],
                      new_cases=state_day['new_cases'],new_deaths=state_day['new_deaths']))
    engine = create_engine("sqlite:///coviddata.sqlite")
    conn = engine.connect()
    Base.metadata.create_all(engine)
    from sqlalchemy.orm import Session
    session = Session(bind=engine)
    for date_data in data_ready:
        session.add(date_data)
    session.commit()