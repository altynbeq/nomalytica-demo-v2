
// get 1C sales data basedon the given time period 

async function fetchSalesData(){
    try{
        const response = await fetch('your-1C-webservice-url-link')

        if(!response.ok){
            console.log("Couldn't get the sales data from 1C");
        }

        const data = response.json();
        console.log(data);
    } catch(error) {
        console.log("Error while fecthing the sales data", error);
    }
}

// fetchSalesData();