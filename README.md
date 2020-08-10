# Project Title: CovidDataExplore

## Project Description
Exploring Covid data, currently focusing on mobility data.  Examining patterns, data munging using Covid_analytics.ipynb. Evaluating transportation rates by type ().
Presentation dashboard notebook is Covid_analytics_dashboard.ipynb.
- Compares different regression types to determine best fit for modeling.
-- implemented linear regression, next will implement polynomial regression.
## Questions
### 1. Given shelter in place orders, is there a difference in population behavior based on state?
### 2. Does type of transport / purpose have an impact on behavioral changes?
### 3. Does population density have impact on infection rate? - Visualization
## Solution / Method
Data from google_mobility/us-mobility.csv and New_York_Times/covid-19-state-level-data.csv. Data from the two csv files were combined into one json file. This will be supplemented by plot comparing cases to transportation trends.
### - Update 8/4/2020 
A visualization of population / infection rate will be added.
## Installing
### Tools Needed
1. Jupyter Notebooks, scipy.stats
2. Node.js

## Javascript dashboard with plots of mobility and Covid-19 case data.
https://rockhound03.github.io/CovidDataExplore/
With this tool one can explore the mobility, case and death data to view the interaction between rise in cases / deaths and how people move around.

## Data Sources
https://www.kaggle.com/roche-data-science-coalition/uncover
## Observations

## Status
ReactJS table created but removed for the plot dashboard. Currently implementing filter and plotting.
