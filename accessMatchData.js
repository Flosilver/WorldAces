(async () => {
    try {
        // 1. Parse the current URL
        const currentUrl = new URL(window.location.href);
        
        // 2. Extract just the match path (e.g., /match/ae1ad917-a541-4b46-b2c8-2252bd1ac401)
        // This regex captures "/match/" followed by the UUID, ignoring anything after it
        const matchPathMatch = currentUrl.pathname.match(/^\/match\/[a-f0-9-]+/i);
        
        if (!matchPathMatch) {
            throw new Error("Could not find a valid match ID in the current URL.");
        }
        
        const cleanPath = matchPathMatch[0];
        
        // 3. Construct the clean API URL
        const apiUrl = `https://api.worldaces.site${cleanPath}`;
        
        console.log(`Cleaned API URL: ${apiUrl}`);

        // 4. Extract the token from localStorage
        const token = JSON.parse(localStorage["vb_sim_auth"])['tokens']['accessToken'];
        
        // 5. Fetch the match simulation data
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
        
        // 6. Automatically copy the resulting JSON to your clipboard
        copy(data); 
        console.log("JSON successfully copied to clipboard!");
    } catch (error) {
        console.error("Error fetching match data:", error);
    }
})();