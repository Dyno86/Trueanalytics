import pandas as pd
import numpy as np

def process_csv_data(file):
    """Process uploaded CSV file and perform initial data cleaning"""
    try:
        # Read CSV file
        df = pd.read_csv(file)

        # Ensure we have enough columns
        if len(df.columns) < 11:  # Need at least 11 columns (A through K)
            raise ValueError("CSV file must have at least 11 columns (A through K)")

        # Create a mapping for the required columns based on position
        column_mapping = {
            df.columns[0]: 'Test_date_time',  # Column A
            df.columns[1]: 'Profile_id',      # Column B
            df.columns[3]: 'Test_result',     # Column D
            df.columns[4]: 'Test_status',     # Column E
            df.columns[5]: 'Lab_name',        # Column F
            df.columns[8]: 'Truelab_id',      # Column I (corrected)
            df.columns[9]: 'Lot'              # Column J (corrected)
        }

        print("Original columns:", df.columns.tolist())
        print("Mapping:", column_mapping)

        # Select only the required columns and rename them
        df = df[list(column_mapping.keys())].rename(columns=column_mapping)

        # Clean text columns
        text_columns = ['Lab_name', 'Profile_id', 'Lot', 'Truelab_id']
        for col in text_columns:
            df[col] = df[col].astype(str).fillna('').str.strip()

        # Convert date column
        df['Test_date_time'] = pd.to_datetime(df['Test_date_time'])

        # Add derived columns for analysis
        df['Month'] = df['Test_date_time'].dt.to_period('M')
        df['Week'] = df['Test_date_time'].dt.to_period('W')

        # Remove any rows with all NaN values
        df = df.dropna(how='all')

        if len(df) == 0:
            raise ValueError("No valid data rows found after processing")

        # Print debug information
        print("\nProcessed Data Info:")
        print("Columns after processing:", df.columns.tolist())
        print("Number of rows:", len(df))
        print("Sample row:", df.iloc[0].to_dict() if len(df) > 0 else "No data")
        print("Data types:", df.dtypes.to_dict())

        return df

    except Exception as e:
        print(f"Error details: {str(e)}")
        print(f"Error type: {type(e)}")
        raise ValueError(f"Error processing CSV file: {str(e)}")