import pandas as pd
import numpy as np

def get_profile_analysis(df):
    """Generate Profile ID analysis including lab-wise statistics"""
    try:
        def calculate_last_10_invalid_percentage(group):
            last_10 = group.tail(10)
            if len(last_10) == 0:
                return 0.0
            invalid_count = last_10['Test_status'].isin(['Invalid', 'Indeterminate']).sum()
            return (invalid_count / len(last_10) * 100)

        # Calculate overall summary
        total_runs = len(df)
        total_invalids = df['Test_status'].eq('Invalid').sum()
        total_indeterminates = df['Test_status'].eq('Indeterminate').sum()
        invalid_percentage = ((total_invalids + total_indeterminates) / total_runs * 100) if total_runs > 0 else 0.0

        summary = {
            'total_runs': total_runs,
            'total_invalids': total_invalids,
            'total_indeterminates': total_indeterminates,
            'invalid_percentage': round(invalid_percentage, 2)
        }

        # Make sure Truelab_id is properly displayed
        df['Truelab_id'] = df['Truelab_id'].astype(str).fillna('Unknown').str.strip()
        
        # Calculate detailed lab-wise analysis
        lab_analysis = df.groupby(['Lab_name', 'Truelab_id']).agg({
            'Test_status': [
                ('Total Tests', 'count'),
                ('Total Detected', lambda x: (x == 'Detected').sum()),
                ('Total Invalid/Indeterminate', lambda x: x.isin(['Invalid', 'Indeterminate']).sum())
            ]
        })

        # Flatten column names
        lab_analysis.columns = lab_analysis.columns.get_level_values(1)
        lab_analysis = lab_analysis.reset_index()

        # Calculate invalid percentage
        lab_analysis['Invalid/Indeterminate %'] = (
            lab_analysis['Total Invalid/Indeterminate'] / lab_analysis['Total Tests'] * 100
        ).round(2)

        # Calculate last 10 runs invalid percentage
        last_10_invalids = df.groupby(['Lab_name', 'Truelab_id']).apply(calculate_last_10_invalid_percentage)
        last_10_invalids = last_10_invalids.reset_index(name='Last 10 runs Invalid%')

        # Merge with main analysis
        detailed = pd.merge(
            lab_analysis,
            last_10_invalids,
            on=['Lab_name', 'Truelab_id'],
            how='left'
        )

        detailed['Last 10 runs Invalid%'] = detailed['Last 10 runs Invalid%'].round(2)

        # Ensure all numeric columns are properly formatted
        numeric_columns = ['Total Tests', 'Total Detected', 'Total Invalid/Indeterminate',
                         'Invalid/Indeterminate %', 'Last 10 runs Invalid%']
        for col in numeric_columns:
            detailed[col] = pd.to_numeric(detailed[col], errors='coerce').fillna(0)

        return {'summary': summary, 'detailed': detailed}

    except Exception as e:
        print(f"Error in profile analysis: {str(e)}")
        raise ValueError(f"Error in profile analysis: {str(e)}")

def get_lot_analysis(df):
    """Generate Lot-specific analysis"""
    try:
        # Ensure Lot column values are properly formatted
        df['Lot'] = df['Lot'].astype(str).fillna('').str.strip()
        
        # Group by Lot number and calculate metrics
        lot_analysis = df.groupby('Lot').agg({
            'Test_status': [
                ('Total Runs', 'count'),
                ('Total Invalids', lambda x: (x == 'Invalid').sum()),
                ('Total Indeterminates', lambda x: (x == 'Indeterminate').sum())
            ]
        })

        # Flatten column names
        lot_analysis.columns = lot_analysis.columns.get_level_values(1)
        lot_analysis = lot_analysis.reset_index()
        
        # Calculate combined count
        lot_analysis['Total Invalids/Indeterminates'] = lot_analysis['Total Invalids'] + lot_analysis['Total Indeterminates']

        # Calculate percentage
        lot_analysis['Invalid/Indeterminate %'] = (
            lot_analysis['Total Invalids/Indeterminates'] / lot_analysis['Total Runs'] * 100
        ).round(2)
        
        # Convert numeric columns to ensure proper formatting
        numeric_cols = ['Total Runs', 'Total Invalids/Indeterminates', 'Invalid/Indeterminate %']
        for col in numeric_cols:
            lot_analysis[col] = pd.to_numeric(lot_analysis[col], errors='coerce').fillna(0)

        return lot_analysis

    except Exception as e:
        print(f"Error in lot analysis: {str(e)}")
        raise ValueError(f"Error in lot analysis: {str(e)}")

def get_trend_analysis(df):
    """Generate monthly and weekly trend analysis data"""
    try:
        # Monthly trends
        monthly = df.groupby('Month').agg({
            'Test_status': [
                ('Total Tests', 'count'),
                ('Total Invalids', lambda x: x.isin(['Invalid', 'Indeterminate']).sum())
            ]
        })

        # Weekly trends
        weekly = df.groupby('Week').agg({
            'Test_status': [
                ('Total Tests', 'count'),
                ('Total Invalids', lambda x: x.isin(['Invalid', 'Indeterminate']).sum())
            ]
        })

        # Flatten column names
        monthly.columns = monthly.columns.get_level_values(1)
        weekly.columns = weekly.columns.get_level_values(1)

        return monthly, weekly

    except Exception as e:
        raise ValueError(f"Error in trend analysis: {str(e)}")

def get_weekly_analysis(df):
    """Generate weekly analysis by lab"""
    try:
        weekly_lab = df.groupby(['Lab_name', 'Week']).agg({
            'Test_status': [
                ('Total Runs', 'count'),
                ('Total Invalids/Indeterminates', lambda x: x.isin(['Invalid', 'Indeterminate']).sum())
            ]
        })

        # Flatten column names
        weekly_lab.columns = weekly_lab.columns.get_level_values(1)
        weekly_lab = weekly_lab.reset_index()

        # Calculate percentage
        weekly_lab['Invalid/Indeterminate %'] = (
            weekly_lab['Total Invalids/Indeterminates'] / weekly_lab['Total Runs'] * 100
        ).round(2)

        return weekly_lab

    except Exception as e:
        raise ValueError(f"Error in weekly analysis: {str(e)}")