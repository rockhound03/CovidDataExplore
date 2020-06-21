# Project Title: CovidDataExplore

## Project Description
Exploring Covid data, currently focusing on mobility data.  Examining patterns, data munging using Covid_analytics.ipynb. Evaluating transportation rates by type ().
Presentation dashboard notebook is Covid_analytics_dashboard.ipynb.
- Compares different regression types to determine best fit for modeling.
-- implemented linear regression, next will implement polynomial regression.
## Questions
### 1. Given shelter in place orders, is there a difference in population behavior based on state?
### 2. Does type of transport / purpose have an impact on behavioral changes?

## Solution / Method
Data from google_mobility/us-mobility.csv and New_York_Times/covid-19-state-level-data.csv. Data from the two csv files were combined into one json file. This data will populate a React table. Table will be filterable by state. This will be supplemented by plot comparing cases to transportation trends.
## Installing
### Tools Needed
1. Jupyter Notebooks, scipy.stats
2. Node.js

## Data Sources
https://www.kaggle.com/roche-data-science-coalition/uncover

## Status
ReactJS table created. Currently implementing filter and plotting.
