var data = [];

async function getData(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    
    for (var i = 0; i < json.length; i++) {
      data.push(json[i]);
    }
    return data;

  } catch (error) {
    console.log("error", error);
  }
}

export default getData;
