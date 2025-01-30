# import numpy as np
# import pandas as pd
# import tensorflow as tf
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import SimpleRNN, LSTM, Dense, Dropout
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import MinMaxScaler, LabelEncoder

# # Load the dataset
# file_path = "F:\\Study\\Projects\\FinalYear\\agrogenie\\ML\\Dataset\\soil-nutrients.csv"  # Replace with actual path
# df = pd.read_csv(file_path)

# # Select relevant columns for prediction
# columns_to_use = ["pH", "Temperature", "Rainfall", "Season", "Name", "Yield"]
# df = df[columns_to_use]

# # Encode categorical variables
# label_encoder = LabelEncoder()
# df["Season"] = label_encoder.fit_transform(df["Season"])
# df["Name"] = label_encoder.fit_transform(df["Name"])

# # Normalize the data
# scaler = MinMaxScaler()
# df_scaled = pd.DataFrame(scaler.fit_transform(df), columns=df.columns)

# # Define input (X) and target (y)
# X = df_scaled.drop(columns=["Yield", "Name"])  # Features
# y = df_scaled["Yield"]  # Target variable
# crop_labels = df["Name"]  # Crop names for reference

# # Reshape for LSTM (samples, timesteps, features)
# X = np.array(X).reshape((X.shape[0], 1, X.shape[1]))
# y = np.array(y)

# # Train-test split
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Build the RNN-LSTM Hybrid Model
# model = Sequential([
#     SimpleRNN(64, activation='relu', return_sequences=True, input_shape=(1, X.shape[2])),
#     LSTM(128, activation='relu', return_sequences=False),
#     Dropout(0.2),
#     Dense(64, activation='relu'),
#     Dense(1)  # Output layer (Yield prediction)
# ])

# # Compile the model
# model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# # Train the model
# epochs = 50
# batch_size = 32
# model.fit(X_train, y_train, epochs=epochs, batch_size=batch_size, validation_data=(X_test, y_test))

# # Save the trained model
# model.save("yield_prediction_model.h5")

# # Function to suggest top 3 crops based on user input
# def recommend_crops(pH, temperature, rainfall, season):
#     # Handle unseen season labels
#     if season not in label_encoder.classes_:
#         label_encoder.classes_ = np.append(label_encoder.classes_, season)  # Add unseen season to classes
#         season_encoded = label_encoder.transform([season])[0]  # Encode unseen season
#     else:
#         season_encoded = label_encoder.transform([season])[0]  # Encode seen season
    
#     # Prepare the input data with dummy values for 'Name' and 'Yield'
#     input_data = np.array([[pH, temperature, rainfall, season_encoded, 0, 0]])  # '0' for Name and Yield initially
    
#     # Normalize the input data using the scaler
#     input_data_scaled = scaler.transform(input_data)
    
#     # Print scaled input data to ensure it's correctly normalized
#     print(f"Scaled input data: {input_data_scaled}")
    
#     # Remove the 'Name' and 'Yield' columns (we don't need them for prediction)
#     input_data_scaled = input_data_scaled[:, :-2]  # Remove last 2 columns: 'Name' and 'Yield'
    
#     # Reshape for LSTM input (1 sample, 1 timestep, number of features)
#     input_data_scaled = input_data_scaled.reshape(1, 1, input_data_scaled.shape[1])
    
#     all_crops_yields = []

#     # Iterate over each crop in the dataset to predict its yield
#     for crop_index, crop in enumerate(crop_labels.unique()):
#         # Use the same input but set crop-specific "dummy" values for prediction
#         input_data_for_crop = np.array([[pH, temperature, rainfall, season_encoded, crop_index, 0]])  # Set crop index as 'Name'
#         input_data_for_crop = scaler.transform(input_data_for_crop)
        
#         # Print the scaled input data for each crop
#         print(f"Scaled input for crop {crop}: {input_data_for_crop}")
        
#         input_data_for_crop = input_data_for_crop[:, :-2]  # Remove 'Name' and 'Yield'
#         input_data_for_crop = input_data_for_crop.reshape(1, 1, input_data_for_crop.shape[1])
        
#         # Predict yield for the current crop
#         yield_prediction = model.predict(input_data_for_crop)
#         print(f"Predicted yield for crop {crop}: {yield_prediction[0][0]}")  # Debug output
#         all_crops_yields.append((crop, yield_prediction[0][0]))  # store crop and predicted yield
    
#     # Sort crops by predicted yield and get the top 3
#     top_crops = sorted(all_crops_yields, key=lambda x: x[1], reverse=True)[:3]
    
#     # Print all yields for each crop
#     print("\nAll crop yields (sorted by predicted yield):")
#     for crop, yield_value in all_crops_yields:
#         print(f"{crop}: {yield_value:.2f} tons/hectare")

#     # Map the crop indices back to crop names using inverse transform
#     top_crops_named = [(label_encoder.inverse_transform([crop[0]])[0], crop[1]) for crop in top_crops]
    
#     return top_crops_named

# cont=True
# while cont:
#     # Example user input
#     user_pH = eval(input("Enter the pH value : "))
#     user_temperature = eval(input("Enter the temperature : "))
#     user_rainfall = eval(input("Enter the rainfall : "))
#     user_season = input("Which season : ")
#     top_crops = recommend_crops(user_pH, user_temperature, user_rainfall, user_season)

#     # Display the top 3 recommended crops
#     print("Top 3 Recommended Crops:")
#     for crop, yield_value in top_crops:
#         print(f"{crop}: {yield_value:.2f} tons/hectare")

#     val=input("y to continue n to stop : ")
#     if val=='y':
#         cont=True
#     else:
#         cont=False

# method 2

# import numpy as np
# import pandas as pd
# import tensorflow as tf
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import SimpleRNN, LSTM, Dense, Dropout
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import MinMaxScaler, LabelEncoder
# from tensorflow.keras.callbacks import EarlyStopping

# # Load the dataset
# file_path = "F:\\Study\\Projects\\FinalYear\\agrogenie\\ML\\Dataset\\soil-nutrients.csv"  # Replace with actual path
# df = pd.read_csv(file_path)

# # Select relevant columns for prediction
# columns_to_use = ["pH", "Temperature", "Rainfall", "Season", "Name", "Yield"]
# df = df[columns_to_use]

# # Encode categorical variables
# label_encoder = LabelEncoder()
# df["Season"] = label_encoder.fit_transform(df["Season"])
# df["Name"] = label_encoder.fit_transform(df["Name"])

# # Normalize the data
# scaler = MinMaxScaler()
# df_scaled = pd.DataFrame(scaler.fit_transform(df), columns=df.columns)

# # Define input (X) and target (y)
# X = df_scaled.drop(columns=["Yield", "Name"])  # Features
# y = df_scaled["Yield"]  # Target variable
# crop_labels = df["Name"]  # Crop names for reference

# # Reshape for LSTM (samples, timesteps, features)
# X = np.array(X).reshape((X.shape[0], 1, X.shape[1]))
# y = np.array(y)

# # Train-test split
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Build the RNN-LSTM Hybrid Model
# model = Sequential([
#     SimpleRNN(64, activation='relu', return_sequences=True, input_shape=(1, X.shape[2])),
#     LSTM(128, activation='relu', return_sequences=False),
#     Dropout(0.2),
#     Dense(64, activation='relu'),
#     Dense(1)  # Output layer (Yield prediction)
# ])

# # Compile the model
# model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# # Define early stopping callback to prevent overfitting
# early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

# # Train the model
# epochs = 50
# batch_size = 32
# model.fit(X_train, y_train, epochs=epochs, batch_size=batch_size, validation_data=(X_test, y_test), callbacks=[early_stopping])

# # Save the trained model
# model.save("yield_prediction_model.h5")

# # Function to suggest top 3 crops based on user input
# def recommend_crops(pH, temperature, rainfall, season):
#     # Handle unseen season labels
#     if season not in label_encoder.classes_:
#         label_encoder.classes_ = np.append(label_encoder.classes_, season)  # Add unseen season to classes
#         season_encoded = label_encoder.transform([season])[0]  # Encode unseen season
#     else:
#         season_encoded = label_encoder.transform([season])[0]  # Encode seen season
    
#     # Prepare the input data with dummy values for 'Name' and 'Yield'
#     input_data = np.array([[pH, temperature, rainfall, season_encoded, 0, 0]])  # '0' for Name and Yield initially
    
#     # Normalize the input data using the scaler
#     input_data_scaled = scaler.transform(input_data)
    
#     # Print scaled input data to ensure it's correctly normalized
#     print(f"Scaled input data: {input_data_scaled}")
    
#     # Remove the 'Name' and 'Yield' columns (we don't need them for prediction)
#     input_data_scaled = input_data_scaled[:, :-2]  # Remove last 2 columns: 'Name' and 'Yield'
    
#     # Reshape for LSTM input (1 sample, 1 timestep, number of features)
#     input_data_scaled = input_data_scaled.reshape(1, 1, input_data_scaled.shape[1])
    
#     all_crops_yields = []

#     # Iterate over each crop in the dataset to predict its yield
#     for crop_index, crop in enumerate(crop_labels.unique()):
#         # Use the same input but set crop-specific "dummy" values for prediction
#         input_data_for_crop = np.array([[pH, temperature, rainfall, season_encoded, crop_index, 0]])  # Set crop index as 'Name'
#         input_data_for_crop = scaler.transform(input_data_for_crop)
        
#         # Print the scaled input data for each crop
#         print(f"Scaled input for crop {crop}: {input_data_for_crop}")
        
#         input_data_for_crop = input_data_for_crop[:, :-2]  # Remove 'Name' and 'Yield'
#         input_data_for_crop = input_data_for_crop.reshape(1, 1, input_data_for_crop.shape[1])
        
#         # Predict yield for the current crop
#         yield_prediction = model.predict(input_data_for_crop)
#         print(f"Predicted yield for crop {crop}: {yield_prediction[0][0]}")  # Debug output
#         all_crops_yields.append((crop, yield_prediction[0][0]))  # store crop and predicted yield
    
#     # Sort crops by predicted yield and get the top 3
#     top_crops = sorted(all_crops_yields, key=lambda x: x[1], reverse=True)[:3]
    
#     # Print all yields for each crop
#     print("\nAll crop yields (sorted by predicted yield):")
#     for crop, yield_value in all_crops_yields:
#         print(f"{crop}: {yield_value:.2f} tons/hectare")

#     # Map the crop indices back to crop names using inverse transform
#     top_crops_named = [(label_encoder.inverse_transform([crop[0]])[0], crop[1]) for crop in top_crops]
    
#     return top_crops_named

# cont=True
# while cont:
#     # Example user input
#     user_pH = eval(input("Enter the pH value : "))
#     user_temperature = eval(input("Enter the temperature : "))
#     user_rainfall = eval(input("Enter the rainfall : "))
#     user_season = input("Which season : ")
#     top_crops = recommend_crops(user_pH, user_temperature, user_rainfall, user_season)

#     # Display the top 3 recommended crops
#     print("Top 3 Recommended Crops:")
#     for crop, yield_value in top_crops:
#         print(f"{crop}: {yield_value:.2f} tons/hectare")

#     val=input("y to continue n to stop : ")
#     if val=='y':
#         cont=True
#     else:
#         cont=False


#method 3  final method

import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, LSTM, Dense, Concatenate

# Load dataset
data = pd.read_csv("F:\\Study\\Projects\\AgroGenie\\ML\\Dataset\\soil-nutrients.csv")

# Define constants
time_steps = 5  # Number of past temperature readings used in LSTM
n_seasons = data["Season"].nunique()  # Number of unique seasons
n_crops = data["Name"].nunique()  # Number of unique crops

# Normalize numeric features
scaler = MinMaxScaler()
data[['pH', 'Temperature', 'Rainfall', 'Yield']] = scaler.fit_transform(data[['pH', 'Temperature', 'Rainfall', 'Yield']])

# Encode categorical features
season_encoder = OneHotEncoder(sparse_output=False)
season_encoded = season_encoder.fit_transform(data[['Season']])

crop_encoder = OneHotEncoder(sparse_output=False)
crop_encoded = crop_encoder.fit_transform(data[['Name']])  # One-hot encoding for crops

# Prepare inputs
X_soil_ph = data[['pH']].values
X_rainfall = data[['Rainfall']].values
X_temperature = data[['Temperature']].values
X_season = season_encoded
y_yield = crop_encoded * data[['Yield']].values  # Yield per crop

# Handle time-series input for LSTM
X_temp_series = []
for i in range(len(X_temperature) - time_steps):
    X_temp_series.append(X_temperature[i:i + time_steps])

X_temperature = np.array(X_temp_series).reshape(-1, time_steps, 1)  # Reshape for LSTM

# Trim all inputs to match LSTM input size
valid_samples = X_temperature.shape[0]
X_soil_ph = X_soil_ph[:valid_samples]
X_rainfall = X_rainfall[:valid_samples]
X_season = X_season[:valid_samples]
y_yield = y_yield[:valid_samples]

# Define Input layers
soil_ph_input = Input(shape=(1,), name="pH")
rainfall_input = Input(shape=(1,), name="Rainfall")
temperature_input = Input(shape=(time_steps, 1), name="Temperature")  # Time-series data
season_input = Input(shape=(n_seasons,), name="Season")  # One-hot encoded

# LSTM for temperature
lstm_output = LSTM(64, return_sequences=False)(temperature_input)

# Concatenate all inputs
merged = Concatenate()([soil_ph_input, rainfall_input, lstm_output, season_input])

# Dense layers
x = Dense(128, activation='relu')(merged)
x = Dense(64, activation='relu')(x)
x = Dense(32, activation='relu')(x)

# Output layer (predict yield for all crops)
output = Dense(n_crops, activation='linear')(x)

# Build model
model = Model(inputs=[soil_ph_input, rainfall_input, temperature_input, season_input], outputs=output)
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# Train the model
history = model.fit(
    [X_soil_ph, X_rainfall, X_temperature, X_season],
    y_yield,
    epochs=50,
    batch_size=32,
    validation_split=0.2
)

# Example user input
user_soil_ph = np.array([[6.5]])  # Example pH
user_rainfall = np.array([[800]])  # Example Rainfall
user_temperature = np.random.rand(1, time_steps, 1)  # Random example temperature sequence
user_season = season_encoder.transform([["Summer"]]).reshape(1, -1)  # One-hot encode "Summer"

# Predict yield for all crops
predicted_yields = model.predict([user_soil_ph, user_rainfall, user_temperature, user_season])[0]

# Rank crops by predicted yield
top_3_crop_indices = np.argsort(predicted_yields)[-3:][::-1]
top_3_crops = crop_encoder.categories_[0][top_3_crop_indices]  # Get crop names

print("Top 3 Recommended Crops (by Yield):")
for i, crop in enumerate(top_3_crops):
    print(f"{i+1}. {crop}: {predicted_yields[top_3_crop_indices[i]]:.2f} tons/hectare")


#git commit check
#commit check
