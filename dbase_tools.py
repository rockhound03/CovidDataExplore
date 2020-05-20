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
    # code here


def state_data_sort(state_data):
    # find new cases from total cases.
    cases_state = [case for case in state_data['cases']]
    new_state_case = []
    for day in range(0,len(cases_state)):
    if day == 0:
        new_case.append(cases_state[day])
    elif cases_state[day] > cases_state[day - 1]:
        new_case.append(cases_state[day] - cases_state[day - 1])
    else:
        new_case.append(0)
    
    # 