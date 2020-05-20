if __name__ == "__main__":
    pass

import math
import numpy as np
import pandas as pd
import requests
#from config import api_key
import time
from datetime import datetime

def group_states(raw_df, state_list):
    for state in state_list:
        raw_state = raw_df.loc[raw_df['state'] == state]

    # code here


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
    
def state_death_data_sort(state_data)
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
