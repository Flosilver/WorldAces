(async () => {
    try {
        // 1. Get the current browser URL
        const currentUrl = window.location.href;
        
        // 2. Transform the URL to point to the API (e.g., worldaces.site -> api.worldaces.site)
        const apiUrl = currentUrl.replace("://", "://api.");
        
        console.log(`Fetching from dynamically generated API URL: ${apiUrl}`);

        // 3. Extract the token from localStorage
        const token = JSON.parse(localStorage["vb_sim_auth"])['tokens']['accessToken'];
        
        // 4. Fetch the match simulation data
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        console.log("Match Data:", data);
        
        // 5. Automatically copy the resulting JSON to your clipboard
        copy(data); 
        console.log("JSON successfully copied to clipboard!");
    } catch (error) {
        console.error("Error fetching match data:", error);
    }
})();