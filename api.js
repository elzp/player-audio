export const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '71e007d2dbmshf76b914310b4aa0p1d521fjsn68a2d4399d41',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
  },
};

async function getTracksData(number) {
  await fetch(
    'https://deezerdevs-deezer.p.rapidapi.com/search?q=rihanna',
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const modifiedResponce =
        response.data.length > number - 1
          ? response.data.slice(0, number)
          : response;
      // console.log(modifiedResponce);
      result = modifiedResponce;
    })
    .catch((err) => console.error(err));
}

// console.log(getTracksData(5));
