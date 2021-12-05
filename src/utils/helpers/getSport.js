
export const getSport = async (name, jsendRes) => {
    const { data, status, message } = await jsendRes.destructFromApi(`/sports/byName/${name}`, 'GET')

    let sport = {}

    if(status === 'success'){
        sport = data
    }else{
        console.log(message);
    }

    return sport;
}