import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from utils.data_processor import process_csv_data
from utils.analysis import (get_profile_analysis, get_lot_analysis,
                          get_trend_analysis, get_weekly_analysis)

# Page configuration
st.set_page_config(page_title="Truenat Dashboard", layout="wide")

# Load custom CSS
with open('assets/style.css') as f:
    st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

# Additional CSS for mobile app look
st.markdown("""
<style>
.home-button {
    position: fixed;
    top: 70px;
    right: 20px;
    z-index: 999;
    background-color: #6c5ce7;
    color: white;
    padding: 10px 15px;
    border-radius: 50px;
    text-decoration: none;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    font-weight: bold;
}
</style>
""", unsafe_allow_html=True)

# Session state initialization
if 'data' not in st.session_state:
    st.session_state.data = None

def main():
    # Landing page when no data is loaded
    if st.session_state.data is None:
        st.markdown("<div class='landing-container'>", unsafe_allow_html=True)
        st.markdown("<h1 class='main-title'>Truenat Dashboard</h1>", unsafe_allow_html=True)
        st.markdown("<h2 class='app-subtitle'>Data Analysis Tool</h2>", unsafe_allow_html=True)
        
        # App description
        st.markdown("""
        <div class='app-description'>
            <div class='description-card'>
                <h3>📊 Analyze Truenat Diagnostic Data</h3>
                <p>Upload your CSV file to get detailed insights on Profile IDs, Lot Specific Analysis, Trend Analysis, and Weekly Reports.</p>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        # Upload section with styled container
        st.markdown("""
        <div class='upload-section'>
            <div class='upload-icon'>📤</div>
            <h3>Upload Your Data</h3>
            <p>Please upload a CSV or XLSX file with Truenat diagnostic data</p>
        </div>
        """, unsafe_allow_html=True)
        
        uploaded_file = st.file_uploader("", type=['csv', 'xlsx'])
        if uploaded_file:
            try:
                with st.spinner("Processing data..."):
                    data = process_csv_data(uploaded_file)
                    st.session_state.data = data
                    st.rerun()  # Updated from experimental_rerun to rerun
            except ImportError as e:
                if 'openpyxl' in str(e):
                    st.error("Excel file support requires the openpyxl package.")
                    with st.expander("Technical Details"):
                        st.code("pip install openpyxl", language="bash")
                        st.info("The application is being updated to support Excel files. Please try again in a moment.")
                else:
                    st.error(f"Missing dependency: {str(e)}")
                return
            except Exception as e:
                st.error(f"Error processing file: {str(e)}")
                st.info("Please ensure your file has the correct column structure.")
                return
                
        # Feature highlights
        st.markdown("""
        <div class='feature-section'>
            <h3>Key Features</h3>
            <div class='feature-grid'>
                <div class='feature-card'>
                    <div class='feature-icon'>👤</div>
                    <h4>Profile Analysis</h4>
                    <p>Detailed insights on each profile ID's performance</p>
                </div>
                <div class='feature-card'>
                    <div class='feature-icon'>📦</div>
                    <h4>Lot Analysis</h4>
                    <p>Track lot-specific metrics and performance</p>
                </div>
                <div class='feature-card'>
                    <div class='feature-icon'>📈</div>
                    <h4>Trend Analysis</h4>
                    <p>Visualize monthly and weekly trends</p>
                </div>
                <div class='feature-card'>
                    <div class='feature-icon'>📅</div>
                    <h4>Weekly Reports</h4>
                    <p>Lab-specific weekly performance data</p>
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("<p class='designer-credit'>Designed by Subhadeep. S</p>", unsafe_allow_html=True)
        return

    try:
        # Main dashboard after data is loaded
        st.markdown("<h1 class='dashboard-title'>Truenat Dashboard Data Analysis Tool</h1>", unsafe_allow_html=True)

        # Global filter
        profile_ids = sorted(st.session_state.data['Profile_id'].unique())
        selected_profile = st.selectbox("Select Profile ID", ['All'] + list(profile_ids))

        filtered_data = st.session_state.data
        if selected_profile != 'All':
            filtered_data = filtered_data[filtered_data['Profile_id'] == selected_profile]

        # The download button will be added to each tab for section-specific data

        # Add a prominent home button at the top
        if st.button("⬅️ Upload New CSV File", key="top_home_button", type="primary"):
            st.session_state.data = None
            st.rerun()
            
        # Dashboard sections using tabs
        tabs = st.tabs(["Profile ID Analysis", "Lot Specific Analysis", "Trend Analysis", "Weekly Analysis"])

        with tabs[0]:
            try:
                profile_analysis = get_profile_analysis(filtered_data)

                # Add download button for Profile ID section
                st.download_button(
                    label="Download Profile Analysis as CSV",
                    data=profile_analysis['detailed'].to_csv(index=False).encode('utf-8'),
                    file_name="profile_analysis.csv",
                    mime="text/csv"
                )
                
                # Profile ID Summary
                st.subheader("Profile ID Summary")
                summary_cols = st.columns(4)
                with summary_cols[0]:
                    st.metric("Total Runs", profile_analysis['summary']['total_runs'])
                with summary_cols[1]:
                    st.metric("Total Invalids", profile_analysis['summary']['total_invalids'])
                with summary_cols[2]:
                    st.metric("Total Indeterminates", profile_analysis['summary']['total_indeterminates'])
                with summary_cols[3]:
                    st.metric("Overall Invalid/Indeterminate %", 
                            f"{profile_analysis['summary']['invalid_percentage']:.2f}%")

                # Detailed Analysis Table
                st.subheader("Lab-wise Analysis")
                # Ensure column names are correct for display
                st.dataframe(profile_analysis['detailed'], 
                           use_container_width=True,
                           height=400)
            except Exception as e:
                st.error("Error in Profile ID Analysis section. Please check your data.")

        with tabs[1]:
            try:
                lot_analysis = get_lot_analysis(filtered_data)
                
                # Add download button for Lot Analysis section
                st.download_button(
                    label="Download Lot Analysis as CSV",
                    data=lot_analysis.to_csv(index=False).encode('utf-8'),
                    file_name="lot_analysis.csv",
                    mime="text/csv"
                )
                
                st.subheader("Lot Specific Analysis")
                st.dataframe(lot_analysis, 
                           use_container_width=True,
                           height=400)
            except Exception as e:
                st.error("Error in Lot Analysis section. Please check your data.")

        with tabs[2]:
            try:
                monthly_data, weekly_data = get_trend_analysis(filtered_data)
                
                # Add download buttons for trend data
                col1, col2 = st.columns(2)
                with col1:
                    st.download_button(
                        label="Download Monthly Trends",
                        data=monthly_data.to_csv(index=True).encode('utf-8'),
                        file_name="monthly_trend_analysis.csv",
                        mime="text/csv"
                    )
                with col2:
                    st.download_button(
                        label="Download Weekly Trends",
                        data=weekly_data.to_csv(index=True).encode('utf-8'),
                        file_name="weekly_trend_analysis.csv",
                        mime="text/csv"
                    )
                
                # Monthly Trend
                st.subheader("Monthly Trend Analysis")
                fig_monthly = go.Figure()
                fig_monthly.add_trace(go.Scatter(
                    x=monthly_data.index.astype(str),
                    y=monthly_data['Total Tests'],
                    name='Total Tests',
                    mode='lines+markers'
                ))
                fig_monthly.add_trace(go.Scatter(
                    x=monthly_data.index.astype(str),
                    y=monthly_data['Total Invalids'],
                    name='Total Invalids',
                    mode='lines+markers'
                ))
                fig_monthly.update_layout(
                    xaxis_title="Month",
                    yaxis_title="Count",
                    height=400,
                    margin=dict(l=20, r=20, t=40, b=20)
                )
                st.plotly_chart(fig_monthly, use_container_width=True)

                # Weekly Trend
                st.subheader("Weekly Trend Analysis")
                fig_weekly = go.Figure()
                fig_weekly.add_trace(go.Scatter(
                    x=weekly_data.index.astype(str),
                    y=weekly_data['Total Tests'],
                    name='Total Tests',
                    mode='lines+markers'
                ))
                fig_weekly.add_trace(go.Scatter(
                    x=weekly_data.index.astype(str),
                    y=weekly_data['Total Invalids'],
                    name='Total Invalids',
                    mode='lines+markers'
                ))
                fig_weekly.update_layout(
                    xaxis_title="Week",
                    yaxis_title="Count",
                    height=400,
                    margin=dict(l=20, r=20, t=40, b=20)
                )
                st.plotly_chart(fig_weekly, use_container_width=True)
            except Exception as e:
                st.error("Error in Trend Analysis section. Please check your data.")

        with tabs[3]:
            try:
                weekly_analysis = get_weekly_analysis(filtered_data)
                
                # Add download button for Weekly Analysis section
                st.download_button(
                    label="Download Weekly Analysis as CSV",
                    data=weekly_analysis.to_csv(index=False).encode('utf-8'),
                    file_name="weekly_analysis.csv",
                    mime="text/csv"
                )
                
                st.subheader("Weekly Analysis by Lab")
                st.dataframe(weekly_analysis, 
                           use_container_width=True,
                           height=400)
            except Exception as e:
                st.error("Error in Weekly Analysis section. Please check your data.")

    except Exception as e:
        st.error("An unexpected error occurred. Please refresh the page and try again.")
        st.info("If the error persists, please check your data format and try again.")

if __name__ == "__main__":
    main()
