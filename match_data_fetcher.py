import requests

# 1. Replace this with your actual extracted token string if running outside the browser
# Or automate localStorage extraction via selenium: token = driver.execute_script("return JSON.parse(localStorage['vb_sim_auth'])['tokens']['accessToken'];")
access_token = "YOUR_EXTRACTED_ACCESS_TOKEN_HERE" 

url = "https://api.worldaces.site/match/157f29b2-2923-4bd1-815a-4195937af5be"

headers = {
    "Authorization": f"Bearer {access_token}",
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    match_data = response.json()
    print("Data retrieved successfully!")
    # Do something with match_data
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")
    print(response.text)