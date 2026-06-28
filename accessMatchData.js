(async () => {
    try {
        // Automatically extract the token using your method
        const token = JSON.parse(localStorage["vb_sim_auth"])['tokens']['accessToken'];
        
        // Fetch the match simulation data
        const response = await fetch("https://api.worldaces.site/match/ae1ad917-a541-4b46-b2c8-2252bd1ac401", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        console.log("Match Data:", data);
        
        // Bonus: Automatically copy it to your clipboard
        copy(data); 
        console.log("JSON copied to clipboard!");
    } catch (error) {
        console.error("Error fetching match data:", error);
    }
})();