export async function getLeadsBack() {
    const url = "https://bitrix-szfq.onrender.com/api/users/";
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log("NIGAAA", data)
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
